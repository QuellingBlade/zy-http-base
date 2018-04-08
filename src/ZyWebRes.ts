
export interface IZyWebRes<T> {
  code: string,
  msg: string,
  data?: T
}

export class ZyWebRes<T> implements IZyWebRes<T> {
  code: string;
  msg: string;
  data?: T;

  constructor(data: T, code: string = 'OK', msg: string = '成功') {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }
}
