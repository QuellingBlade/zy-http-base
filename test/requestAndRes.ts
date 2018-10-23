import HttpBase from '../src/index'
import { HttpGlobalConfig } from '../src/HttpGlobalConfig'

export interface ILoginReq {
	cellphone: string;
	password: string;
}

export interface testData {
  testData: any
}

export interface ILoginRes extends testData{
	auth_token: string;
}

export interface IDevice {
	name: string;
	id: string;
}

describe('request and response', function() {
  it('normal post request', async function () {
    const networkBase = new HttpBase(new HttpGlobalConfig(
      'http://0.0.0.0',
      '3000',
      [{
        key: 'x-csrftoken',
        get: '1000',
        postOnly: true
      }],
      5000,
      null,
      null,
      null
    ))

    let res = await networkBase.post<ILoginReq, ILoginRes>('user/login/', {
      cellphone: '123423',
      password: 'hello'
    })
    res.auth_token.should.equals('11111-22222-333333')
    res.testData['content-type'].should.equals('application/json')
    res.testData['x-csrftoken'].should.equals('1000')
    let res1 = await networkBase.get<IDevice[]>('devices/')
    res1[0].id.should.equals('4615400127496508412')
  })
})

describe('getToken return promise', function() {
  it('normal post request', async function () {
    const networkBase =  new HttpBase(new HttpGlobalConfig(
      'http://0.0.0.0',
      '3000',
      [{
        key: 'x-csrftoken',
        get: () => {
          return new Promise(resolve => {
            resolve('csrftoken')
          })
        },
      }],
      5000,
      null,
      null,
      null
    ))

    let res = await networkBase.post<ILoginReq, ILoginRes>('user/login/', {
      cellphone: '123423',
      password: 'hello'
    })

    console.log(res)

    res.testData['x-csrftoken'].should.equals('csrftoken')
  })
})
