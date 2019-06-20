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

function buildIndex(data = [], src) {
  let html = fse.readFileSync(path.join(__dirname, './index.html'), { encoding: 'utf-8' })
  const complied = _.template(html)
  html = complied({ data })
  fse.writeFileSync(src, html)
}

function createPs(name, ...args) {
  return new Promise((resolve, reject) => {
    const ps = spawn(...args)
    // ps.stdout.on('data', data => console.log(data.toString('utf-8')))
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

class BuildProcess {
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

  installDeps(options) {
    const action = `${this.folderName} install`
    console.log(action + 'ing...')
    return createPs(action, 'yarn', ['install'], { ...this.options, ...options })
  }

  build(options) {
    const action = `${this.folderName} build`
    console.log(action + 'ing...')
    return createPs(action, 'yarn', ['build'], { ...this.options, ...options })
  }

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
// const buildList = templateList.map(item => new BuildProcess(item, env[item].run))

// Promise.all(templateList.map(item => new BuildProcess(item, { env: env[item] }).run()))
//   .then((data) => {
//     buildIndex(data, deployDir('index.html'))
//     console.log('finish')
//   })
//   .catch((e) => {
//     console.trace(e)
//     process.exit(1)
//   })

// parallel build
const templateData = []

const afterBuild = templateList.reduce((p, item) => {
  const ps = new BuildProcess(item, { env: env[item] })
  p = p.then(() => ps.run())
    .then(() => templateData.push(item))
  return p
}, Promise.resolve())

afterBuild
  .then(() => buildIndex(templateData, deployDir('index.html')))
  .catch((e) => {
    if (e) {
      console.trace(e)
      process.exit(1)
    }
  })

// const item = 'nuxt-element-dashboard'
// new BuildProcess(item, { env: env[item] }).run()
