import * as Koa from 'koa'
import * as Router from 'koa-router'
import { ZyWebRes } from "../../src/ZyWebRes"
import * as http from "http"

const app = new Koa()
const router = new Router()

router.post('/user/login/', async (ctx) => {
  ctx.body = new ZyWebRes({
    auth_token: '11111-22222-333333',
    testData: ctx.headers
  })
})

router.get('/devices/', async (ctx) => {
  ctx.body = new ZyWebRes([
    {
      id: '4615400127496508412',
      name: '设备1'
    },
    {
      id: '4615400127496508413',
      name: '设备2'
    }
  ])
})

router.get('/timeout/', async (ctx) => {
  ctx.body = await new Promise(resolve => {
    setTimeout(() => {
      resolve(new ZyWebRes('timeout'))
    }, 2000)
  })
})

router.get('/error/', async (ctx) => {
  ctx.body = new ZyWebRes('error', 'ERROR', '失败')
})

app.use(router.routes())
let server: http.Server = app.listen(3000)

export default server
