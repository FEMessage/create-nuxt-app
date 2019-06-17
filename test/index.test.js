// import path from 'path'
import test from 'ava'
import sao from 'sao'
import getContext from '../generator/GeneratorContext'
import configs from '../generator/config'

// const generator = path.join(__dirname, '..')

const getPkgFields = (pkg) => {
  pkg = JSON.parse(pkg)
  delete pkg.name
  delete pkg.author
  delete pkg.version
  delete pkg.description
  return pkg
}

const verifyPkg = async (t, generator, answers) => {
  const stream = await sao.mock({ getContext, generator }, answers)

  const pkg = await stream.readFile(`${answers.folder}/package.json`)
  t.snapshot(stream.fileList, 'Generated files')
  t.snapshot(getPkgFields(pkg), `package.json`)
}

configs.forEach((item) => {
  const { config, generator } = item

  test(config.template, async (t) => {
    await verifyPkg(t, generator, config)
  })
})
