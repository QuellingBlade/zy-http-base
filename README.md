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

