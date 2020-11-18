const path = require('path')
const validate = require('validate-npm-package-name')
const configs = require('../template.config')
const {getModules} = require('./modules')

module.exports = {
  prompts() {
    if (this.sao.opts.mock) return []
    const {config} = this.sao.opts

    const prompts = [
      {
        skip: () => config.folder,
        prompt: {
          name: 'folder',
          type: 'input',
          message: 'Your project name',
        },
      },
      {
        skip: () => config.template,
        prompt: {
          name: 'template',
          type: 'list',
          choices: configs.map(c => ({
            name: c.template,
            value: c.template,
          })),
          message: 'Choose a template',
        },
      },
      {
        skip: () => 'language' in config,
        prompt: {
          name: 'language',
          type: 'list',
          choices: ['JavaScript', 'TypeScript'].map(v => ({
            name: v,
            value: v,
          })),
          message: 'Programming language',
        },
      },
      {
        skip: () => 'docker' in config,
        prompt: {
          name: 'docker',
          type: 'confirm',
          default: true,
          message: 'Dockerize or not',
        },
      },
      {
        skip: () => 'cypress' in config,
        prompt: {
          name: 'cypress',
          type: 'confirm',
          default: true,
          message: 'Use cypress or not',
        },
      },
    ]

    return prompts.filter(p => !p.skip()).map(p => p.prompt)
  },
  templateData() {
    return this.sao.opts.config
  },
  actions() {
    const {
      sao: {opts},
    } = this
    if (opts.mock) {
      opts.config = opts.mock.answers
    } else {
      Object.assign(opts.config, this.answers)
      const {template} = opts.config
      const c = configs.find(c => c.template === template)
      if (!c) {
        console.error(`template "${template}" is not exist!`)
        // eslint-disable-next-line no-process-exit
        process.exit(1)
      }
      Object.keys(c)
        .filter(k => !(k in opts.config))
        .forEach(k => (opts.config[k] = c[k]))
    }

    const validation = validate(opts.config.folder)
    if (validation.warnings)
      validation.warnings.forEach(warn => {
        console.warn('Warning:', warn)
      })
    if (validation.errors) {
      validation.errors.forEach(err => {
        console.error('Error:', err)
      })
      // eslint-disable-next-line no-process-exit
      process.exit(1)
    }
    opts.outDir = path.resolve(opts.outDir, opts.config.folder)

    return getModules(opts)
  },
  completed() {
    const cd = () => {
      console.log(`\t${this.chalk.cyan('cd')} ${this.outDir}`)
    }

    console.log()
    console.log(this.chalk.bold(' To install dependence:\n'))
    cd()
    console.log(`\t${this.npmClient}`)

    console.log()
    console.log(this.chalk.bold(`  To get started:\n`))
    cd()
    console.log(`\t${this.npmClient} mock\n`)
    console.log(this.chalk.bold(`  To build & start for production:\n`))
    cd()
    console.log(`\t${this.npmClient} build`)

    console.log()
  },
}
