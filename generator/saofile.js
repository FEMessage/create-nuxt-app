const { resolve, join } = require('path')
const glob = require('glob')
const validate = require('validate-npm-package-name')
const config = require('../template.config')

const rootDir = __dirname
const resolveTml = (dir = '') => resolve(rootDir, '../template', dir)

module.exports = {
  prompts() {
    const prompt = []
    const { template } = this.template
    if (!this.outFolder) {
      prompt.push({
        name: 'folder',
        type: 'input',
        message: 'Your project name'
      })
    }
    if (!template) {
      const templates = config.map(item => ({
        name: item.template,
        value: item.template
      }))
      prompt.push({
        name: 'template',
        type: 'list',
        choices: templates,
        message: 'Choose a template'
      })

      prompt.push({
        name: 'ci',
        choices: [{
          name: 'gitlab-ci',
          value: 'gitlab-ci'
        },
        {
          name: 'travis-ci',
          value: 'travis-ci'
        }],
        type: 'list',
        message: 'Choose a CI'
      })
    }
    return prompt
  },
  templateData() {
    return {
      folder: this.outFolder,
      ...this.template
    }
  },
  /**
   * 注意，outDir指向目标目录的src文件夹，具体看GeneratorContext.js
   */
  actions() {
    const { folder } = this.answers
    const validation = validate(folder || this.outFolder)
    validation.warnings && validation.warnings.forEach((warn) => {
      console.warn('Warning:', warn)
    })
    validation.errors && validation.errors.forEach((err) => {
      console.error('Error:', err)
    })
    validation.errors && validation.errors.length && process.exit(1)

    // console.log(`> Generating Nuxt.js project in ${path.resolve(options.folder)}`)
    // add the basic folder
    const actions = [{
      type: 'add',
      files: '**',
      templateDir: resolveTml('nuxt')
    }]

    // add rc files
    actions.push({
      type: 'add',
      files: '*',
      templateDir: resolveTml()
    })

    /**
     * 定义见 template.config.js
     * 这里只用到values；key是为了方便覆盖配置用的
     */
    Object.values(this.template).forEach((value) => {
      actions.push({
        type: 'add',
        files: '**',
        templateDir: resolveTml(`frameworks/${value}`)
      })
    })

    // 将 src 中的配置文件移动到根目录
    const files = {}
    for (const action of actions) {
      const options = { cwd: join(action.templateDir), dot: true, nodir: true }
      for (const file of glob.sync(`*`, options)) {
        files[file] = `../${file}`
      }
    }

    actions.push({
      type: 'move',
      patterns: files
    })

    actions.push({
      type: 'move',
      patterns: {
        '../_.gitignore': '../.gitignore',
        '../_package.json': '../package.json',
        '../_.eslintrc.js': '../.eslintrc.js',
        'test': '../test'
      }
    })

    return actions
  },
  completed() {
    const { folder } = this.answers
    const isNewFolder = this.outDir !== process.cwd()
    const cd = () => {
      if (isNewFolder) {
        console.log(`\t${this.chalk.cyan('cd')} ${folder || this.outFolder}`)
      }
    }

    console.log()
    console.log(this.chalk.bold(`  To get started:\n`))
    cd()
    console.log(`\t${this.npmClient} mock\n`)
    console.log(this.chalk.bold(`  To build & start for production:\n`))
    cd()
    console.log(`\t${this.npmClient} build`)

    // if (this.answers.test !== 'none') {
    //   console.log(this.chalk.bold(`\n  To test:\n`))
    //   cd()
    //   console.log(`\t${PM} run test`)
    // }
    console.log()
  }
}
