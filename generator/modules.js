const path = require('path')
const glob = require('glob')
const {mergeJson, sortObj} = require('./utils')

const resolveDir = dir => path.resolve(__dirname, '../template', dir)

const getDockerRunScript = () => {
  const scripts = {
    postinstall: 'sh ./.postinstall.sh',
  }

  return {
    scripts,
  }
}

function getDockerModule(opts) {
  if (!opts.config.docker) return []

  return [
    {
      type: 'add',
      files: '**',
      templateDir: resolveDir('docker-cmd'),
    },
  ]
}

function getE2eModule(opts) {
  if (!opts.config.cypress) return []

  const cypressModulePath = resolveDir('modules/cypress')

  return [
    {
      type: 'add',
      files: '**',
      templateDir: resolveDir('modules/cypress'),
    },
    {
      type: 'move',
      patterns: {
        [path.resolve(
          opts.outDir,
          'test/e2e/_.eslintrc.js',
        )]: 'test/e2e/.eslintrc.js',
      },
    },
    {
      type: 'modify',
      files: 'package.json',
      handler(basePackage) {
        const customPackage = require(path.resolve(
          cypressModulePath,
          '_package.json',
        ))

        let result = mergeJson(basePackage, customPackage)

        ;['dependencies', 'devDependencies'].forEach(k => sortObj(result[k]))
        return result
      },
    },
    {
      type: 'remove',
      files: '_package.json',
    },
  ]
}

function getTypeScriptModule(opts) {
  if (opts.config.language !== 'TypeScript') return []
  const typescriptModulePath = resolveDir('modules/typescript')

  return [
    {
      type: 'add',
      files: '**',
      templateDir: resolveDir('modules/typescript'),
    },
    {
      type: 'modify',
      files: 'package.json',
      handler(basePackage) {
        const customPackage = require(path.resolve(
          typescriptModulePath,
          '_package.json',
        ))

        let result = mergeJson(basePackage, customPackage)

        ;['dependencies', 'devDependencies'].forEach(k => sortObj(result[k]))
        return result
      },
    },
    {
      type: 'remove',
      files: ['_package.json', 'jsconfig.json'],
    },
  ]
}

function getModules(opts) {
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
        result['create-nuxt-app'] = require('../package.json').version
        ;['dependencies', 'devDependencies'].forEach(k => sortObj(result[k]))
        return result
      },
    },
    {
      type: 'remove',
      files: '_package.json',
    },
  ]

  const skipModules = ['folder', 'template', 'docker', 'cypress', 'language']

  const addModules = Object.keys(opts.config)
    .filter(k => !skipModules.includes(k))
    .map(k => {
      console.log('k:::', k, opts.config[k])
      return {
        type: 'add',
        files: '**',
        templateDir: resolveDir(`modules/${opts.config[k]}`),
      }
    })

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

  const moveJestEslintrc = {
    type: 'move',
    patterns: {
      [path.resolve(
        opts.outDir,
        'test/unit/_.eslintrc.js',
      )]: 'test/unit/.eslintrc.js',
      '_.babelrc': '.babelrc',
    },
  }

  return [
    addBaseFramework,
    restoreConfigsName,
    addCustomFramework,
    mergePackageJson,
    addModules,
    moveDirsToSrc,
    moveJestEslintrc,
    ...getDockerModule(opts),
    ...getE2eModule(opts),
    ...getTypeScriptModule(opts),
  ].reduce((r, a) => r.concat(a), []) // 和 flat（node >= 11.15.0) 效果一样，性能差点
}

module.exports = {getModules}
