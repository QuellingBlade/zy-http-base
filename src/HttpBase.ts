import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { IHttpGlobalConfig } from './HttpGlobalConfig'
import { ZyWebRes } from './ZyWebRes'
import { ServerException } from './ServerException'
import { IHttpOptions } from './HttpOptions'
import { ILoading } from './ILoading'

export class HttpBase {
  serverFullPath: string
  config: IHttpGlobalConfig

  constructor(config: IHttpGlobalConfig) {
    this.config = config
    this.serverFullPath = config.serverPort
      ? `${config.serverBase}:${config.serverPort}/`
      : `${config.serverBase}`
  }

  showError(msg: string, showError: (msg: string) => void) {
    if (showError) {
      showError(msg)
    } else if (showError === undefined && this.config.showError) {
      this.config.showError(msg)
    }
  }

  showLoading(loading: ILoading) {
    if (loading && loading.show) {
      loading.show()
    } else if ((loading === undefined || loading && loading.show === undefined)
      && this.config.loading && this.config.loading.show) {
      this.config.loading.show()
    }
  }

  hideLoading(loading: ILoading) {
    if (loading && loading.hide) {
      loading.hide()
    } else if ((loading === undefined || loading && loading.show === undefined)
      && this.config.loading && this.config.loading.hide) {
      this.config.loading.hide()
    }
  }

  handleError(err, showError: (msg: string) => void) {
    if (err instanceof ServerException) {
      // 服务器返回的逻辑错误
      this.showError(err.payload.msg, showError)
      this.config.handleServerError && this.config.handleServerError(err)
      throw err
    }

    let code = 'UNKNOWN_ERROR'
    let msg = '未知错误'

    if (err.response && err.response.status !== undefined) {
      const status = parseInt(err.response.status / 100 + '', 10)
      switch (status) {
        case 5:
          code = 'SERVER_INTERNAL_ERROR'
          msg = '服务器内部错误'
          break
        case 4:
          code = 'URL_NOT_FOUND'
          msg = 'URL找不到'
          break
      }
    } else {
      if (err.code === 'ECONNABORTED') {
        code = err.code
        msg = '网络超时'
      } else if (err.message === 'Network Error') {
        code = 'NETWORK_ERROR'
        msg = '无网络, 请检查您的网络连接'
      }
    }

    this.showError(msg, showError)

    throw new ServerException({
      code,
      msg
    })
  }

  async httpBase<R, T>(method: string, url: string, data: R, options: IHttpOptions): Promise<T> {
    let httpOptions: AxiosRequestConfig = {
      method,
      url: `${this.serverFullPath}${url}${url.endsWith('/') ? '' : '/'}`,
      timeout: options.timeout || this.config.timeout || 5000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        ...this.config.headers
      },
      params: options.params
    }

    if (method === 'post') {
      httpOptions.data = data
      httpOptions.headers['X-CSRFToken'] = this.config.getToken()
    }

    try {
      this.showLoading(options.loading)
      let res: AxiosResponse<ZyWebRes<T>> = await Axios.request(httpOptions)
      let payload = res.data
      let { code, data } = payload
      if (code !== 'OK') {
        throw new ServerException(payload)
      }
      return data
    } catch (err) {
      this.handleError(err, options.showError)
    } finally {
      this.hideLoading(options.loading)
    }
  }

  get<T>(url: string, options: IHttpOptions = {}): Promise<T> {
    return this.httpBase<null, T>('get', url, null, options)
  }

  post<R, T>(url: string, data: R, options: IHttpOptions = {}): Promise<T> {
    return this.httpBase<R, T>('post', url, data, options)
  }
}
