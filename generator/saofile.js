const path = require('path')
const glob = require('glob')
const validate = require('validate-npm-package-name')
const configs = require('../template.config')

module.exports = {
  prompts() {
    if (this.sao.opts.mock) return []
    const {config} = this.sao.opts
    return [
      ...(config.folder
        ? []
        : [
            {
              name: 'folder',
              type: 'input',
              message: 'Your project name',
            },
          ]),
      ...(config.template
        ? []
        : [
            {
              name: 'template',
              type: 'list',
              choices: configs.map(c => ({
                name: c.template,
                value: c.template,
              })),
              message: 'Choose a template',
            },
          ]),
    ]
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

    const resolveDir = dir => path.resolve(__dirname, '../template', dir)

    const setUpFramework = [
      {
        type: 'add',
        files: '**',
        templateDir: resolveDir('framework'),
      },
      {
        type: 'add',
        files: '**',
        templateDir: resolveDir(`framework-${opts.config.template}`),
      },
    ]
    const addModules = Object.keys(opts.config)
      .filter(k => !['folder', 'template'].includes(k))
      .map(k => ({
        type: 'add',
        files: '**',
        templateDir: resolveDir(`modules/${opts.config[k]}`),
      }))
    // 这些配置文件在模板中是加了'_'前缀的（防止影响到本项目），移到生成的项目后要去掉前缀
    const restoreConfigsName = {
      type: 'move',
      patterns: {
        '_.eslintrc.js': '.eslintrc.js',
        '_.gitignore': '.gitignore',
        '_package.json': 'package.json',
      },
    }
    // 生成的nuxt项目的srcDir配置=src。这里我们把除test以外的文件夹移动到src目录下
    const moveDirsToSrc = {
      type: 'move',
      patterns: {
        ...[...setUpFramework, ...addModules]
          .map(({templateDir}) =>
            glob.sync('!(test)/', {
              cwd: templateDir,
            }),
          )
          .reduce((dirs1, dirs2) => [...dirs1, ...dirs2])
          .reduce((res, dir) => ({...res, [dir]: `src/${dir}`}), {}),
      },
    }

    return [...setUpFramework, ...addModules, restoreConfigsName, moveDirsToSrc]
  },
  completed() {
    const cd = () => {
      console.log(`\t${this.chalk.cyan('cd')} ${this.outDir}`)
    }

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
