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
// 也可以通过第二个参数传递
cli.option('-o, --output <output>', 'the output path of the generator')

function run(config, outDir) {
  sao({
    // getContext,
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

// REVIEW: 可以传第二个参数作为outDir，但与-o重复了
;(function main({options, args: [folder, outDir = options.o || '.']}) {
  if (options.l) {
    configs.forEach(item => console.log(item.template))
  } else if (options.a) {
    configs.forEach(c => run(c, outDir))
  } else if (options.t) {
    run({template: options.t, folder}, outDir)
  } else {
    run({folder}, outDir)
  }
})(cli.parse())
