import HttpBase from "../src"
import { HttpGlobalConfig } from "../src/HttpGlobalConfig"

describe('test timeout', async function () {
  it('global timeout error', function (done) {
    this.timeout(5000)

    const networkBase = new HttpBase(new HttpGlobalConfig(
      'http://0.0.0.0',
      '3000',
      null,
      1000,
      null,
      null,
      null,
    ))

    networkBase.get('timeout/')
      .catch(e => {
        try {
          e.payload.code.should.equals('ECONNABORTED')
          done()
        } catch (e) {
          done(e)
        }
      })
  })
})
