import HttpBase from "../src";
import { HttpGlobalConfig } from "../src/HttpGlobalConfig"

describe('error', () => {
  it('global show error', function (done) {
    let tmpMsg = ''

    const networkBase = new HttpBase(new HttpGlobalConfig(
      'http://0.0.0.0',
      '3000',
      null,
      5000,
      null,
      (msg) => { tmpMsg = msg },
      null
    ))

    networkBase.get('error/')
      .catch(e => {
        try {
          tmpMsg.should.equals('失败')
          done()
        } catch (e) {
          done(e)
        }
      })
  })

  it('global not show error', function (done) {
    let tmpMsg = ''

    const networkBase = new HttpBase(new HttpGlobalConfig(
      'http://0.0.0.0',
      '3000',
      null,
      5000,
      null,
      null,
      null
    ))

    networkBase.get('error/')
      .catch(e => {
        try {
          tmpMsg.should.equals('')
          done()
        } catch (e) {
          done(e)
        }
      })
  })

  it('local show error', function (done) {
    let tmpMsg = ''

    const networkBase = new HttpBase(new HttpGlobalConfig(
      'http://0.0.0.0',
      '3000',
      null,
      5000,
      null,
      null,
      null
    ))

    networkBase.get('error/', {
      showError(msg) {
        tmpMsg = msg + 'tmp'
      }
    })
      .catch(e => {
        try {
          tmpMsg.should.equals('失败tmp')
          done()
        } catch (e) {
          done(e)
        }
      })
  })

  it('global show error, local disable', function (done) {
    let tmpMsg = ''

    const networkBase = new HttpBase(new HttpGlobalConfig(
        'http://0.0.0.0',
      '3000',
      null,
      5000,
      null,
      (msg) => { tmpMsg = msg },
      null
    ))

    networkBase.get('error/', {
      showError: null
    })
      .catch(e => {
        try {
          tmpMsg.should.equals('')
          done()
        } catch (e) {
          done(e)
        }
      })
  })
})
