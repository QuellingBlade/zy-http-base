# zy-http-base

[![Build Status](https://travis-ci.org/njleonzhang/zy-http-base.svg?branch=master)](https://travis-ci.org/njleonzhang/zy-http-base)

封装处理符合以下格式的http请求：

```
export interface IZyWebRes<T> {
  code: string,
  msg: string,
  data?: T
}
```

## usage

```
import HttpBase from 'zy-http-base'
```

```
export interface IHttpGlobalConfig {
    serverBase: string;
    serverPort: string;
    headers: any;
    timeout: number;
    handleServerError: (err: ServerException<any>) => void;
    getToken: () => string;
    showError: (msg: string) => void;
    loading: ILoading;
}

export declare class HttpGlobalConfig implements IHttpGlobalConfig {
    serverBase: string;
    serverPort: string;
    headers: any;
    timeout: number;
    handleServerError: (err: ServerException<any>) => void;
    getToken: () => string;
    showError: (msg: string) => void;
    loading: ILoading;
    constructor(serverBase: string, serverPort: string, headers: any, timeout: number, handleServerError: (err: ServerException<any>) => void, getToken: () => string, showError: (msg: string) => void, loading: ILoading);
}

export interface IHttpOptions {
    showError?: (msg: string) => void;
    loading?: ILoading;
    timeout?: number;
    params?: any;
}

export default class HttpBase {
    get<T>(url: string, options?: IHttpOptions): Promise<T>;
    post<R, T>(url: string, data: R, options?: IHttpOptions): Promise<T>;
}
```
