#!/usr/bin/env node
const path = require('path')
const glob = require('glob')
const fse = require('fs-extra')
const _ = require('lodash')
const spawn = require('cross-spawn')
const env = require('./env.json')

const deployDir = (name = '') => path.join(__dirname, '../../dist', name)
const releaseDir = path.join(__dirname, '../../release')

const templateList = glob.sync('*', {
  cwd: releaseDir,
  ignore: '*.zip'
})

/**
 *create the index.html for templates
 *
 * @param {Array} [data=[]] templateList array
 * @param {String} target target path
 */
function buildIndex(data = [], target) {
  let html = fse.readFileSync(path.join(__dirname, './index.html'), { encoding: 'utf-8' })
  const complied = _.template(html)
  html = complied({ data })
  fse.writeFileSync(target, html)
}

/**
 *create a child_process with promise
 *
 * @param {String} name process name for log
 * @param {*} args spawn arguments
 * @returns {Promise}
 */
function createPs(name, ...args) {
  return new Promise((resolve, reject) => {
    const ps = spawn(...args)
    ps.on('error', console.trace)
    ps.on('close', (code) => {
      if (code !== 0) {
        console.log(`${name} build process exited with code ${code}`)
        reject(code)
      }
      resolve(code)
    })
  })
}

/**
 * @class BuildProcess
 */
class BuildProcess {
  /**
   *Creates an instance of BuildProcess, which use to run nuxt build
   * @param {String} templateName framework tempalte name, used to a folder name
   * @param {Object} [options={}] spawn options
   * @memberof BuildProcess
   */
  constructor(templateName, options = {}) {
    const { env = {}, ...opts } = options
    this.folderName = templateName
    this.options = {
      cwd: path.join(releaseDir, templateName),
      env: {
        API_SERVER: 'https://easy-mock.com/mock/5c1b3895fe5907404e654045/femessage-mock',
        ...process.env,
        ...env,
        PUBLIC_PATH: `${process.env.PUBLIC_PATH || ''}/${this.folderName}`
      },
      ...opts
    }
  }

  /**
   *install dependents
   *
   * @param {Object} options
   * @returns {Promise} spawn options
   * @memberof BuildProcess
   */
  installDeps(options) {
    const action = `${this.folderName} install`
    console.log(action + 'ing...')
    return createPs(action, 'yarn', ['install'], { ...this.options, ...options })
  }

  /**
   *build nuxt project
   *
   * @param {Object} options
   * @returns {Promise}
   * @memberof BuildProcess
   */
  build(options) {
    const action = `${this.folderName} build`
    console.log(action + 'ing...')
    return createPs(action, 'yarn', ['build'], { ...this.options, ...options })
  }

  /**
   *move some file, because the assets path is not correct after build success
   *
   * @memberof BuildProcess
   */
  moveToDist() {
    const targetDir = deployDir(this.folderName)
    const sourceDir = path.join(this.options.cwd, 'dist')
    const assetsDir = `${sourceDir}/${this.folderName}`
    // move assets out
    const assetsList = glob.sync('**', {
      cwd: assetsDir,
      nodir: true
    })
    assetsList.forEach(file => fse.moveSync(`${assetsDir}/${file}`, `${sourceDir}/${file}`, { overwrite: true }))
    fse.removeSync(assetsDir)
    // move to dist
    fse.moveSync(sourceDir, targetDir, { overwrite: true })
  }

  /**
   *the total process of build a nuxt project
   *
   * @returns {Promise}
   * @memberof BuildProcess
   */
  run() {
    return this.installDeps()
      .then(() => this.build())
      .then(() => {
        this.moveToDist()
        return this.folderName
      })
      .catch()
  }
}

// Serial build
const templateData = []

const afterBuild = templateList.reduce((p, item) => {
  const ps = new BuildProcess(item, { env: env[item] })
  p = p.then(() => ps.run())
    .then(() => templateData.push(item))
  return p
}, Promise.resolve())

afterBuild
  .then(() => buildIndex(templateData, deployDir('index.html')))
  .catch((err) => {
    if (err) {
      console.trace(err)
      process.exit(1)
    }
  })
