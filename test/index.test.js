/* eslint-disable */
import ava from 'ava'
import configs from '../template.config'
/* eslint-enable */

const {verifyPkg} = require('../utils/test')

// FYI: ava的回调必须返回promise，否则报错
configs.forEach(c => {
  const answers = {
    ...c,
    docker: false,
  }
  return ava(c.template, t => verifyPkg(t, answers))
})
