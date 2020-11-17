const sao = require('sao')

const getPkgFields = pkg => {
  const blackList = [
    'name',
    'author',
    'version',
    'description',
    'create-nuxt-app',
  ]
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

module.exports = {
  verifyPkg,
}
