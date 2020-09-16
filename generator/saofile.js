const path = require('path')
const glob = require('glob')
const validate = require('validate-npm-package-name')
const configs = require('../template.config')
const {mergeJson, sortObj} = require('./utils')

const resolveDockerPath = dir =>
  path.resolve(__dirname, '../node_modules/@femessage/dockerize-cli', dir)

// TODO 给dockerize-cli提pr，将该方法export出来
const getDockerRunScript = () => {
  const PUBLIC_PATH = '__PLACEHOLDER_PUBLIC_PATH'
  const API_SERVER = '__PLACEHOLDER_API_SERVER'
  const dockerizePkg = require('@femessage/dockerize-cli/package.json')
  // 这里为了兼容 nuxt 跟 vue-cli 有些变量是在 webpack config 执行之前就已经使用了，目前只发现这2个，如果项目中不一样可以自行改动。
  const scripts = {
    'build:replace': 'yarn build:placeholder && yarn replace',
    'build:placeholder': 'yarn build:set-env && yarn build',
    'build:image': 'sh ./build.sh | ./build.sh',
    'build:set-env': `cross-env BUILD_TYPE=image PUBLIC_PATH=${PUBLIC_PATH} API_SERVER=${API_SERVER}`,
    replace: `npx dockerize-cli replace dist ${PUBLIC_PATH}`,
  }

  const devDependencies = {
    '@femessage/dockerize-cli': `^${dockerizePkg.version}`,
    'cross-env': 'latest',
  }
  return {
    scripts,
    devDependencies,
  }
}

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
      ...('docker' in config
        ? []
        : [
            {
              name: 'docker',
              type: 'list',
              choices: [true, false].map(b => ({
                name: b ? 'Use' : "Don't use",
                value: b,
              })),
              message: 'Use dockerize-cli or not',
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
      templateDir: resolveDir('framework-base'),
    }
    // 这些配置文件在模板中是加了'_'前缀的（防止影响到本项目），移到生成的项目后要去掉前缀
    // 同时也防止这些文件无法发布至 npm
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
          let result = mergeJson(basePackage, {
            ...customPackage,
            name: opts.config.folder,
          })
          if (opts.config.docker) {
            result = mergeJson(result, getDockerRunScript())
          }
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

    let addDockerFile = []
    if (opts.config.docker) {
      addDockerFile = [
        {
          type: 'add',
          files: '**',
          templateDir: resolveDockerPath('templates/docker'),
        },
      ]
    }

    return [
      addBaseFramework,
      restoreConfigsName,
      addCustomFramework,
      mergePackageJson,
      addModules,
      moveDirsToSrc,
      addDockerFile,
    ].reduce((r, a) => r.concat(a), []) // 和 flat（node >= 11.15.0) 效果一样，性能差点
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
