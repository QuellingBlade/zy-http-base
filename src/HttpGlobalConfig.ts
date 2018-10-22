import { ServerException } from './ServerException'
import { ILoading } from './ILoading'

export interface IHttpGlobalConfig {
  serverBase: string
  serverPort: string
  headers: any
  timeout: number
  handleServerError: (err: ServerException<any>) => void
  getToken: (() => string) | (() => Promise<string>)
  tokenKey?: string
  showError: (msg: string) => void
  loading: ILoading
}

export class HttpGlobalConfig implements IHttpGlobalConfig {
  serverBase: string
  serverPort: string
  headers: any
  timeout: number
  handleServerError: (err: ServerException<any>) => void
  getToken: (() => string) | (() => Promise<string>)
  tokenKey: string
  showError: (msg: string) => void
  loading: ILoading

  constructor(serverBase: string, serverPort: string,
              headers: any, timeout: number,
              handleServerError: (err: ServerException<any>) => void,
              getToken: (() => string) | (() => Promise<string>),
              showError: (msg: string) => void,
              loading: ILoading,
              tokenKey: string = 'X-CSRFToken') {
    this.serverBase = serverBase
    this.serverPort = serverPort
    this.headers = headers
    this.timeout = timeout
    this.handleServerError = handleServerError
    this.getToken = getToken
    this.tokenKey = tokenKey
    this.showError = showError
    this.loading = loading
  }
}
