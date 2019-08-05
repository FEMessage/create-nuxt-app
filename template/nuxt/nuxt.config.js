require('dotenv').config()
const {env} = process
;['PUBLIC_PATH', 'API_SERVER', 'NO_LOGIN', 'COOKIE_PATH'].forEach(key =>
  console.log('%s\t: %s', key, env[key])
)

const isProd = env.MODE == 'prod'
<%_ if (template !== 'mobile') { _%>
const mockServer =
  'https://easy-mock.com/mock/5c1b3895fe5907404e654045/femessage-mock'
<%_ } _%>

// 不能以斜杠结尾
let apiServer = env.API_SERVER
// 必须以斜杠结尾
let publicPath = env.PUBLIC_PATH<%- `${template === 'mobile' ? " || 'http://cdn.deepexi.com/'" : ''}` %>

const config = {
  aliIconFont: '',
  env: {
    <%_ if (template === 'single') { _%>
    mock: {
      '/deepexi-tenant': mockServer,
      '/deepexi-permission': mockServer
    },
    dev: apiServer ? {
      '/deepexi-tenant': apiServer,
      '/deepexi-permission': apiServer
    } : {}
    <%_ } else if (template === 'multiple') { _%>
    mock: {
      '/deepexi-dashboard': mockServer,
      '/xpaas-enterprise-contact': mockServer,
      '/xpaas-console-api': mockServer
    },
    dev: apiServer ? {
      '/deepexi-dashboard': apiServer,
      '/xpaas-enterprise-contact': apiServer,
      '/xpaas-console-api': apiServer
    } : {}
    <%_ } else if (template === 'mobile') { _%>
    mock: {
      '/security': 'http://yapi.demo.qunar.com/mock/9638'
    },
    dev: {
      '/security': 'http://your.dev.server'
    }
    <%_ } _%>
  }
}

let axios = {
  proxy: true
}

// 如果生产指定apiServer, 则使用绝对路径请求api
if (isProd && apiServer) {
  axios = {
    proxy: false,
    baseURL: apiServer
  }
}

module.exports = {
  srcDir: 'src/',
  mode: 'spa',
  env: {
    NO_LOGIN: env.NO_LOGIN,
    COOKIE_PATH: env.COOKIE_PATH || '/'
  },
  proxy: config.env[env.MODE],
  router: {
    middleware: ['meta', 'auth'],
    mode: 'hash'
  },
  /*
   ** Build configuration
   */
  build: {
    publicPath,
    extractCSS: isProd,
    babel: {
      plugins: [
        [
          <%_ if (template === 'mobile') { _%>
          'import',
          {
            libraryName: 'vant',
            libraryDirectory: 'es',
            style: true
          },
          'vant'
          <%_ } else { _%>
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: '~node_modules/@femessage/theme-deepexi/lib'
          }
          <%_ } _%>
        ]
      ]
    },
    <%_ if (template === 'mobile') { _%>
    postcss: {
      plugins: {
        'postcss-px-to-viewport': {
          viewportWidth: 375
        }
      }
    },
    <%_ } _%>
    /*
     ** Run ESLint on save
     */
    extend(config, {isDev}) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  /*
   ** Headers of the page
   */
  head: {
    title: '',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {'http-equiv': 'x-ua-compatible', content: 'IE=edge, chrome=1'},
      {
        hid: 'description',
        name: 'description',
        content: ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href:
          'https://deepexi.oss-cn-shenzhen.aliyuncs.com/deepexi-services/favicon32x32.png'
      },
      {
        // rel: 'stylesheet',
        // type: 'text/css',
        // href: config.aliIconFont
      }
    ]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#5D81F9'
  },
  /**
   * Share variables, mixins, functions across all style files (no @import needed)
   * @Link https://github.com/nuxt-community/style-resources-module/
   */
  styleResources: {
    less: '~assets/var.less'
  },
  css: [
    {
      src: '~assets/global.less',
      lang: 'less'
    }
  ],
  plugins: [
    {src: '~plugins/axios'},
    <%_ if (template === 'mobile') { _%>
    {src: '~/plugins/vant'},
    {src: '~/plugins/filter'}
    <%_ } else { _%>
    {src: '~plugins/element'},
    {src: '~plugins/icon-font'}
    <%_ } _%>
  ],
  modules: [
    // Doc: https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    ['@nuxtjs/dotenv', {path: './'}]
  ],
  axios
}
