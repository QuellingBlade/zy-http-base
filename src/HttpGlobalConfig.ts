import { ServerException } from './ServerException'
import { ILoading } from './ILoading'

export type HeaderType = string | (() => string) | (() => Promise<string>)

export interface Header {
  get: HeaderType
  key: string
  postOnly?: boolean
}

export interface IHttpGlobalConfig {
  serverBase: string
  serverPort: string
  headers: Header[]
  timeout: number
  handleServerError: (err: ServerException<any>) => void
  showError: (msg: string) => void
  loading: ILoading
}

export class HttpGlobalConfig implements IHttpGlobalConfig {
  constructor(
    public serverBase: string,
    public serverPort: string,
    public headers: Header[],
    public timeout: number,
    public handleServerError: (err: ServerException<any>) => void,
    public showError: (msg: string) => void,
    public loading: ILoading) { }
}
