const spawn = require('cross-spawn')
const config = require('../template.config')

module.exports = function (BaseGeneratorContext) {
  return class GeneratorContext extends BaseGeneratorContext {
    get template() {
      if (this.sao.opts.mock) {
        return this.sao.opts.mock.answers
      }
      const { answers = {} } = this
      const template = config.find(t => t.template === answers.template)
      if (template) {
        delete template.folder
        Object.assign(this.sao.opts.config, template)
      }
      return Object.assign(this.sao.opts.config, answers)
    }

    get outDir() {
      const answers = this.answers || {}
      const config = this.sao.opts.config || {}
      const folder = answers.folder || config.folder || this.template.folder

      return `${this.sao.opts.outDir}/${folder}/src`
    }

    get outFolder() {
      return this.template.folder
    }

    gitInit() {
      const outDir = this.sao.opts.outDir
      const ps = spawn.sync('git', ['init'], {
        stdio: 'ignore',
        cwd: outDir
      })
      if (ps.status === 0) {
        console.log('Initialized empty Git repository')
      } else {
        console.error(`git init failed in ${outDir}`)
      }
    }
  }
}
