import 'mocha'
import server from './server/index'
import { should } from 'chai'
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import './requestAndRes'
import './timeout'
import './Error'
import './showHideLoading'

chai.use(chaiAsPromised)
should()

after(() => {
  server.close()
})
