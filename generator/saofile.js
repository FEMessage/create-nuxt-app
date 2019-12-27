const path = require('path')
const glob = require('glob')
const validate = require('validate-npm-package-name')
const configs = require('../template.config')
const {mergeJson, sortObj} = require('./utils')

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

    const addBaseFramework = {
      type: 'add',
      files: '**',
      templateDir: resolveDir('framework'),
    }
    // 这些配置文件在模板中是加了'_'前缀的（防止影响到本项目），移到生成的项目后要去掉前缀
    const restoreConfigsName = {
      type: 'move',
      patterns: {
        '_.eslintrc.js': '.eslintrc.js',
        '_.gitignore': '.gitignore',
        '_package.json': 'package.json',
      },
    }

    const addCustomFramework = {
      type: 'add',
      files: '**',
      templateDir: resolveDir(`framework-${opts.config.template}`),
    }
    // 合并基础模板和特定模板的 package.json
    const mergePackageJson = [
      {
        type: 'modify',
        files: 'package.json',
        handler(basePackage) {
          const customPackage = require(path.resolve(
            opts.outDir,
            '_package.json',
          ))
          const result = mergeJson(basePackage, customPackage)
          ;['dependencies', 'devDependencies'].forEach(k => sortObj(result[k]))
          return result
        },
      },
      {
        type: 'remove',
        files: '_package.json',
      },
    ]

    const addModules = Object.keys(opts.config)
      .filter(k => !['folder', 'template'].includes(k))
      .map(k => ({
        type: 'add',
        files: '**',
        templateDir: resolveDir(`modules/${opts.config[k]}`),
      }))
    // 生成的nuxt项目的srcDir配置=src。这里我们把除test以外的文件夹移动到src目录下
    const moveDirsToSrc = {
      type: 'move',
      patterns: {
        ...[addBaseFramework, addCustomFramework, ...addModules]
          .filter(a => a.templateDir)
          .map(a =>
            glob.sync('!(test)/', {
              cwd: a.templateDir,
            }),
          )
          .reduce((dirs1, dirs2) => [...dirs1, ...dirs2])
          .reduce((res, dir) => ({...res, [dir]: `src/${dir}`}), {}),
      },
    }

    return [
      addBaseFramework,
      restoreConfigsName,
      addCustomFramework,
      mergePackageJson,
      addModules,
      moveDirsToSrc,
    ].flat() // https://node.green/#ES2019-features-Array-prototype--flat--flatMap-
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
