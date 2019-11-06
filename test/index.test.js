/* eslint-disable */
import ava from 'ava'
import sao from 'sao'
import configs from '../template.config'
/* eslint-enable */

const getPkgFields = pkg => {
  const blackList = ['name', 'author', 'version', 'description']
  pkg = JSON.parse(pkg)
  blackList.forEach(p => delete pkg[p])
  return pkg
}

const verifyPkg = async (t, answers) => {
  const generator = require('path').resolve(__dirname, '../generator')
  const stream = await sao.mock({generator}, answers)
  const pkg = await stream.readFile('package.json')
  t.snapshot(stream.fileList, 'Generated files')
  t.snapshot(getPkgFields(pkg), 'package.json')
}

// FYI: ava的回调必须返回promise，否则报错
configs.forEach(c => ava(c.template, t => verifyPkg(t, c)))
