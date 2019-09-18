const path = require('path')
const sao = require('sao')
const getContext = require('./GeneratorContext.js')

const templateList = []

/**
 * 存放 Template 相关配置
 * 并将配置注入到 sao generator
 * @class Template
 * @param {template.config} default: {}
 */
class Template {
  constructor(opts = {}) {
    const { command, npmClient, outDir, logLevel, generator, ...rest } = opts
    this.config = rest
    this.command = command
    this.generator = generator || path.resolve(__dirname, '../generator')
    this.outDir = outDir && path.resolve(`${outDir}`)
    this.npmClient = npmClient || 'yarn'
  }

  generate(saoOptions = {}, cmdOptions = {}) {
    if (cmdOptions.output) {
      this.outDir = path.join(process.cwd(), cmdOptions.output)
    }
    const { generate, ...rest } = this
    this.config.folder = this.config.folder || saoOptions.folder
    const options = Object.assign({}, rest, saoOptions)
    // FYI: sao的配置在文档上并不全，需要深入源码
    return sao({ getContext, ...options }).run()
  }
}

const addTemplate = function (opts) {
  const { folder } = opts
  if (!folder) {
    console.trace(`options command or folder is required!`)
  }
  if (hasRepeated({ folder })) {
    return console.trace(`There was a same "${folder}" template existed`)
  }
  list().push(new Template(opts))
}

const hasRepeated = function ({ folder = '' }) {
  return list().some(template => template.folder === folder)
}

const list = function () {
  return templateList
}

module.exports = {
  addTemplate,
  list,
  Template
}
