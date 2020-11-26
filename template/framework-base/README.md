# nuxt2 + element dashboard

[![Build Status](https://travis-ci.com/levy9527/nuxt-element-dashboard.svg?branch=master)](https://travis-ci.com/levy9527/nuxt-element-dashboard)[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/levy9527/nuxt-element-dashboard/pulls)[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

## Table of Contents

- **[Feature](#feature)**
- **[快速开始](#快速开始)**
- **[工程结构](#工程结构)**
- **[开发](#开发)**
  - **[新建页面](#新建页面)**
  - **[调用接口](#调用接口)**
  - **[CRUD](#CRUD)**
  - **[设置代理](#设置代理)**
  - **[参考链接](#参考链接)**
- **[环境变量](#环境变量)**
- **[构建](#构建)**
- **[License](#license)**

## Feature

在[Nuxt.js](https://github.com/nuxt/nuxt.js)的基础上，集成以下技术栈：

- UI 库：[element-ui](http://element.eleme.io/#/)
- ajax 库： [axios](https://github.com/axios/axios)
- css 预处理器：[less](http://lesscss.org/)
- 代码格式化：[prettier](https://github.com/prettier/prettier)
- 环境变量: [dotenv](https://www.npmjs.com/package/dotenv)

与此同时，还集成了一下泛用的实践

- [x] 更完善的管理后台布局样式
- [x] 多系统统一的滚动条样式
- [x] 基于项目实践的 XHR 拦截
- [x] 基于 RESTful 最佳实践，提供优雅管理 API 的方案
- [x] 更友好的鉴权，超时重新登录后会重定向到失效时的页面
- [x] 基于 deepexi design 的文字色彩方案
- [x] 内置面包屑方案，支持动态面包屑
- [x] 支持 svg-icon
- [x] 支持 es [optional-chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) 和 [nullish-coalescing-operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)

[⬆ Back to Top](#table-of-contents)

## 快速开始

```bash
# 安装依赖
yarn

# 使用mock接口进行开发
yarn mock

# 使用mock接口进行开发，且不会有登录拦截
yarn mock:nologin

# 使用后端接口进行开发
yarn dev

# 使用webpack进行生产构建
yarn build

# 生成静态站点
yarn generate
```

[⬆ Back to Top](#table-of-contents)

## 工程结构

```sh
├── README.md
├── doc
│   └── dev.md
├── nuxt.config.js         框架配置文件
├── package.json
├── src                    开发目录
│   ├── services           api 资源管理
│   │   ├── common         service 公用的类库、BASE URL 定义等 
│   │   │   ├── api.js         统一管理服务路径和 API version
│   │   │   └── repository.js  RESTful 生成类，可以继承实现满足业务需求
│   │   ├── basic.js       一些基本的 services
│   │   ├── example.js     一个 example 的 service
│   │   └── index.js       统一入口，会导出所有 services
│   ├── assets             资源，包括样式文件与图片
│   │   ├── global.less    全局样式类
│   │   └── var.less       样式变量，支持less变量自动引入，即不用在less中import就能直接使用变量
│   ├── components         业务无关的可复用的组件
│   ├── const              常量文件
│   │   ├── path.js        定义页面跳转路径
│   │   └── cookie-keys.js cookie key管理
│   ├── container          业务有关的vue组件
│   ├── layouts            可复用的页面布局
│   │   ├── default.vue
│   │   └── login.vue
│   ├── middleware         自定义函数，会在每个页面渲染前执行
│   │   └── auth.js        路由鉴权中间件
│   ├── mixins             可复用的“织入”页面的代码片断
│   ├── pages              应用视图 & 路由名称，每个文件都对应一个路由视图，开发者框无需手动维护路由文件
│   │   ├── index.vue
│   │   └── login.vue
│   ├── plugins            应用插件，在Vue.js 初始化前运行，可在这里引入第三方类库
│   │   ├── axios.js       请求拦截
│   │   └── element.js     引入element-ui
│   └── store              Vuex状态管理文件
│       └── index.js
├── static                 静态资源
│   ├── README.md
│   └── favicon.ico
└── yarn.lock
```

[⬆ Back to Top](#table-of-contents)

## 开发

### 新建页面

Nuxt.js 会依据 `pages` 目录中的所有 `*.vue` 文件生成应用的路由配置

在`pages`目录下新建一个名为 `hello.vue` 的页面

```html
<template>
  <h1>Hello world!</h1>
</template>
```

即可在 <http://localhost:3000/hello> 访问到新建的页面

[⬆ Back to Top](#table-of-contents)

### 调用接口

[推荐使用 service 层管理 API：](https://github.com/FEMessage/create-nuxt-app/blob/dev/docs/api.md)

1. 在 `services` 中定义一个 API

在 `src/services` 下新建一个 `example.js`
```js
// 创建了一个 example 的 RESTful API
import {Repository} from './common/repository'
import {VERSION} from './common/api'

export default new Repository(`${VERSION}/example/api`)
```

2. 在 `*.vue`、`store/*.js` 的 `actions` 都可以调用

```js
// 获取资源的服务器路径
this.$services.example.uri()
// 获取所有资源，返回一个列表
this.$services.example.list()
// 获取某个资源的详情
this.$services.example.detail(ID)
// 创建一个资源
this.$services.example.create(payload)
// 更新一个资源
this.$services.example.update(ID, payload)
// 删除一个资源
this.$services.example.delete(ID)
```

3. 如果接口是非标准的 RESTful API 可以参考此[文档](https://github.com/FEMessage/create-nuxt-app/blob/dev/docs/api.md#%E8%BF%9B%E9%98%B6)

也可以继续使用`this.$axios` 调用接口：

- 建议使用`$get $post $[methods]`等方法，respone 中会直接返回请求的 body
- 可以在 `*.vue` 文件中的生命周期钩子函数中调用
- 可以在 `methods` 里调用
- 可以在 `store/*.js` 的 `actions` 里调用

```js
// vue文件
export default {
  mounted() {
    this.$axios.$get(url)
  },
  methods: {
    fetchData() {
      this.$axios.$get(url)
    },
  },
}
```

```js
// store/index.js
export const actions = {
  async fetchData({commit}, {params}) {
    let resp = await this.$axios.$get(url, {params})
    commit('update', resp)
  },
}
```

[⬆ Back to Top](#table-of-contents)

### CRUD

注意方法前有\$

```js
// GET 请求
this.$axios.$get('/users', {params: {key: value})
.then(resp => {
})
.catch(e => {})
```

```js
// POST 请求
this.$axios
  .$post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone',
  })
  .then(resp => {})
  .catch(e => {})
```

```js
// PUT 请求
this.$axios
  .$put('/user/1', {
    firstName: 'Fred',
    lastName: 'Flintstone',
  })
  .then(resp => {})
  .catch(e => {})
```

```js
// DELETE 请求
this.$axios
  .$delete('/user/1')
  .then(resp => {})
  .catch(e => {})
```

```js
// 或
this.$axios({
  method: 'delete',
  url: '/users',
  data: {
    rows: [1, 2],
  },
})
```

[⬆ Back to Top](#table-of-contents)

### 设置代理

开发时，api 使用的都是相对路径，通过代理来解决跨域问题。

在 `nuxt.config.js` 中找到 `config` 变量，修改 `mock` 设置：

```sh
env: {
    mock: {
      '/api': 'http://mock.api.server',
    },
    dev: {
      '/api': 'http://real.api.server',
    }
  }
```

则对于所有以 `/api` 开头的请求：

1. 在 `yarn mock` 模式下，都会变成 `http://mock.api.server/api`

1. 在 `yarn dev` 模式下，都会变成 `http://real.api.server/api`

**注意，每次修改代理设置，都需要重新启动应用才能生效**

[⬆ Back to Top](#table-of-contents)

### 参考链接
- [TypeScript FAQ](https://deepexi.yuque.com/docs/share/ec81b0e7-b1b4-426c-a66c-8c293e7185c2)
- [Composition API Best Practices](https://deepexi.yuque.com/docs/share/54bd68ca-27bb-4db8-8b26-f2dd1de406ff)

[⬆ Back to Top](#table-of-contents)

## 环境变量

使用.env 设置环境变量, 即在项目根目录新建一个.env 文件, 填写环境变量即可。

**注意，该文件不能提交至版本控制系统中。**

.env 文件示例:

```sh
# 左边是变量名(一般大写，下划线分割单词)，右边是变量值
# 注意=号两边不能有空格
TESTING_VAR=just-fot-testing
ANOTHER_VAR=another
```

可以在项目的 vue 文件或 js 文件中读取

```js
mounted() {
  console.log(process.env.TESTING_VAR) // 输出 just-fot-testing
}
```

**自带的环境变量说明**

| 环境变量名  | 说明                                                   | 是否必须 | 默认值 | 示例                      |
| ----------- | ------------------------------------------------------ | -------- | ------ | ------------------------- |
| PUBLIC_PATH | 对应 webpack 的 publicPath，用于指定静态文件访问路径   | 是       |        | http://cdn.deepexi.com    |
| API_SERVER  | axios 的 baseURL，可不传。不传时，使用相对路径发送请求 | 否       |        | https://www.easy-mock.com |
| NO_LOGIN    | 是否登陆拦截，传 1 则不会有登录拦截                    | 否       |        | 1                         |
| APP_ID      | 应用 ID | 否       |        |                           |

[⬆ Back to Top](#table-of-contents)

## 构建

构建会读取根目录下的.env 文件获取环境变量, 默认生成的是 hash 路由模式的 spa, 在`dist`目录输出静态文件

命令如下:

```sh
yarn build
```

## License

[MIT](./LICENSE)

[⬆ Back to Top](#table-of-contents
