import { ILoading } from './ILoading'

export interface IHttpOptions {
  showError?: (msg: string) => void,
  loading?: ILoading
  timeout?: number,
  params?: any,
}
