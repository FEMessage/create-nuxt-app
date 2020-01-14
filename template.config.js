/**
 * 框架的模板配置
 * 对象的 value 对应 template/frameworks 里面的文件夹名
 * 对象的 key 可用来在不同模板间覆盖配置，比如不同模板可能需要不同的 ci 模块
 * folder 属性必须唯一
 * @required 必填项
 * @property {string} folder   生成框架的目录名，最好使用仓库名，因为在ci中也会使用
 * @property {string} template 生成框架的主要模板
 * @options 以下为可选项，可扩展新的属性，同样会生成对应的文件
 * @property {string} ui       default: 'element-ui'  框架使用的 ui
 * @property {string} ci       default: 'travis-ci'   框架使用的 ci
 * @property {string} axios    default: 'axios'       拦截请求 plugins
 * @property {string} meta     default: 'meta'        获取元信息 middleware
 * @property {string} auth     default: 'auth'        路由鉴权 middleware
 * @property {string} release  default: 'release-log' autoRelease rc
 */

const common = {
  ci: 'gitlab-ci',
  axios: 'axios',
  auth: 'auth',
  components: 'components',
  constant: 'constant',
  filters: 'filters',
  meta: 'meta',
  release: 'release-log',
  styles: 'styles',
  'icon-font': 'icon-font',
  test: 'jest',
  utils: 'utils',
  service: 'service',
}

const desktop = {
  ...common,
  ui: 'element-ui',
  breadcrumb: 'breadcrumb',
  stylesDesktop: 'styles-desktop',
  componentsDesktop: 'components-desktop',
}

// nuxt-element-dashboard 框架配置
const single = {
  ...desktop,
  folder: 'nuxt-element-dashboard',
  template: 'single',
}

// nuxt-multiple-spa 框架配置
const multiple = {
  ...desktop,
  folder: 'nuxt-multiple-spa',
  template: 'multiple',
}

// nuxt-admin 框架配置
const admin = {
  ...desktop,
  folder: 'nuxt-admin',
  template: 'admin',
}

// nuxt-mobile 框架配置
const mobile = {
  ...common,
  folder: 'nuxt-vant',
  template: 'mobile',
}

module.exports = [single, multiple, mobile, admin]
