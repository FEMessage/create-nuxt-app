#!/usr/bin/env node
const program = require('cac')()
const config = require('../template.config.js')
const { Template } = require('../generator/Template')
const preset = require('../generator/config')

const logError = (err) => {
  console.trace(err)
  process.exit(1)
}

const getTemplateByName = name => config.find(item => item.template === name)

program.option('-t, --template <template>', 'create a preset template')

program.option('-l, --list', 'the list of preset template')

program.option('-a, --all', 'generate all preset template')

program.option('-o, --output <output>', 'the output path of the generator')

program.help()

program.version('1.0.0')

const { options, args } = program.parse()

function init(options, args) {
  let [folderName, targetPath = '.'] = args
  if (folderName) {
    options.folder = folderName
  }
  if (options.output) {
    targetPath = options.output
  }

  // show preset template list
  if (options.list) {
    return config.forEach((item) => {
      console.log(item.template)
    })
  }

  // designation template
  if (options.template) {
    const config = getTemplateByName(options.template)
    if (!config) {
      return console.error(`template "${options.template}" is not exist!`)
    }
    folderName && (config.folder = folderName)
    const template = new Template(config)
    return (template.generate({}, {
      output: targetPath
    }).catch(logError))
  }

  // generate all preset
  if (options.all) {
    return preset.forEach((item) => {
      item.generate({}, {
        output: targetPath
      }).catch(logError)
    })
  }

  new Template().generate({
    folder: folderName,
    outDir: targetPath,
    template: options.template
  }).catch(logError)
}

init(options, args)
