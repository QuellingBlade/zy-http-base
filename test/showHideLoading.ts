import HttpBase from "../src";
import { HttpGlobalConfig } from "../src/HttpGlobalConfig";

const logForShow = 'loading show'
const logForHide = 'loading hide'

describe('loading', () => {
  it('global loading', async function () {
    let loadingShowMdg = ''
    let loadingHideMdg = ''

    const networkBase = new HttpBase(new HttpGlobalConfig(
      'http://0.0.0.0',
      '3000',
      null,
      5000,
      null,
      () => { return '1000' },
      null,
      {
        show() {
          console.log(logForShow)
          loadingShowMdg = logForShow
        },
        hide() {
          console.log(logForHide)
          loadingHideMdg = logForHide
        }
      },
    ))

    await networkBase.get('devices/')

    loadingShowMdg.should.equals(logForShow)
    loadingHideMdg.should.equals(logForHide)
  })

  it('global loading in error', function (done) {
    let loadingShowMdg = ''
    let loadingHideMdg = ''

    const networkBase = new HttpBase(new HttpGlobalConfig(
      'http://0.0.0.0',
      '3000',
      null,
      5000,
      null,
      () => { return '1000' },
      null,
      {
        show() {
          console.log(logForShow)
          loadingShowMdg = logForShow
        },
        hide() {
          console.log(logForHide)
          loadingHideMdg = logForHide
        }
      },
    ))

    networkBase.get('error/')
      .catch(e => {
        console.log(e)
        loadingShowMdg.should.equals(logForShow)
        loadingHideMdg.should.equals(logForHide)
        done()
      })
  })

  it('no global loading, but local loading', async function () {
    let loadingShowMdg = ''
    let loadingHideMdg = ''

    const networkBase = new HttpBase(new HttpGlobalConfig(
      'http://0.0.0.0',
      '3000',
      null,
      5000,
      null,
      () => { return '1000' },
      null,
      null
    ))

    await networkBase.get('devices/', {
      loading: {
        show() {
          console.log(logForShow)
          loadingShowMdg = logForShow
        },
        hide() {
          console.log(logForHide)
          loadingHideMdg = logForHide
        }
      }
    })

    loadingShowMdg.should.equals(logForShow)
    loadingHideMdg.should.equals(logForHide)
  })

  it('no global loading, local loading in error', function (done) {
    let loadingShowMdg = ''
    let loadingHideMdg = ''

    const networkBase = new HttpBase(new HttpGlobalConfig(
      'http://0.0.0.0',
      '3000',
      null,
      5000,
      null,
      () => { return '1000' },
      null,
      null
    ))

    networkBase.get('error/', {
      loading: {
        show() {
          console.log(logForShow)
          loadingShowMdg = logForShow
        },
        hide() {
          console.log(logForHide)
          loadingHideMdg = logForHide
        }
      }
    })
      .catch(e => {
        console.log(e)
        loadingShowMdg.should.equals(logForShow)
        loadingHideMdg.should.equals(logForHide)
        done()
      })
  })

  it('global loading, and local loading', async function () {
    let loadingShowMdg = ''
    let loadingHideMdg = ''

    const networkBase = new HttpBase(new HttpGlobalConfig(
      'http://0.0.0.0',
      '3000',
      null,
      5000,
      null,
      () => { return '1000' },
      null,
      {
        show() {
          loadingShowMdg = '1000'
        },
        hide() {
          loadingShowMdg = '2000'
        }
      }
    ))

    await networkBase.get('devices/', {
      loading: {
        show() {
          console.log(logForShow)
          loadingShowMdg += logForShow
        },
        hide() {
          console.log(logForHide)
          loadingHideMdg += logForHide
        }
      }
    })

    loadingShowMdg.should.equals(logForShow)
    loadingHideMdg.should.equals(logForHide)
  })

  it('no global loading, local loading in error', function (done) {
    let loadingShowMdg = ''
    let loadingHideMdg = ''

    const networkBase = new HttpBase(new HttpGlobalConfig(
      'http://0.0.0.0',
      '3000',
      null,
      5000,
      null,
      () => { return '1000' },
      null,
      {
        show() {
          console.log(logForShow)
          loadingShowMdg += logForShow
        },
        hide() {
          console.log(logForHide)
          loadingHideMdg += logForHide
        }
      }
    ))

    networkBase.get('error/', {
      loading: {
        show() {
          console.log(logForShow)
          loadingShowMdg = logForShow
        },
        hide() {
          console.log(logForHide)
          loadingHideMdg = logForHide
        }
      }
    })
      .catch(e => {
        console.log(e)
        loadingShowMdg.should.equals(logForShow)
        loadingHideMdg.should.equals(logForHide)
        done()
      })
  })

  it('global loading, local loading disable', function (done) {
    let loadingShowMdg = ''
    let loadingHideMdg = ''

    const networkBase = new HttpBase(new HttpGlobalConfig(
      'http://0.0.0.0',
      '3000',
      null,
      5000,
      null,
      () => { return '1000' },
      null,
      {
        show() {
          console.log(logForShow)
          loadingShowMdg += logForShow
        },
        hide() {
          console.log(logForHide)
          loadingHideMdg += logForHide
        }
      }
    ))

    networkBase.get('error/', {
      loading: null
    })
      .catch(e => {
        console.log(e)
        loadingShowMdg.should.equals('')
        loadingHideMdg.should.equals('')
        done()
      })
  })
})
