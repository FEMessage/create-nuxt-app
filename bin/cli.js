#!/usr/bin/env node
const cli = require('cac')()
const path = require('path')
const sao = require('sao')
const configs = require('../template.config')

cli.version(require('../package.json').version)
cli.help()

cli.option('-l, --list', 'the list of preset template') // 优先级 1
cli.option('-a, --all', 'generate all preset template') // 优先级 2
cli.option('-t, --template <template>', 'create a preset template')
cli.option('-d, --docker', 'use docker build')
cli.option('-o, --output <output>', 'the output path of the generator')

function run(config, outDir) {
  // 构造参数可以在saofile.js中通过this.sao.opts获取
  sao({
    npmClient: 'yarn',
    generator: path.resolve(__dirname, '../generator'),
    outDir,
    config,
  })
    .run()
    .catch(err => {
      console.trace(err)
      throw err
    })
}

;(function main({options, args: [folder]}) {
  if (options.v || options.h) return

  const outDir = options.o || '.'
  if (options.l) {
    configs.forEach(item => console.log(item.template))
  } else if (options.a) {
    configs.forEach(c =>
      run(
        {...c, docker: 'd' in options, cypress: false, language: 'JavaScript'},
        outDir,
      ),
    )
  } else {
    const config = {
      ...(folder ? {folder} : {}),
      ...(options.t ? {template: options.t} : {}),
    }
    if ('d' in options) {
      config.docker = true
    }
    run(config, outDir)
  }
})(cli.parse())
