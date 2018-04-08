import { IZyWebRes } from './ZyWebRes'

export interface IServerException<T> {
  payload: IZyWebRes<T>
}

export class ServerException<T> implements IServerException<T> {
  payload: IZyWebRes<T>

  constructor(payload: IZyWebRes<T>) {
    this.payload = payload
  }
}
