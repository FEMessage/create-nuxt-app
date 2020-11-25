# 在 nuxt 中优雅的管理 API

## 背景

在使用 nuxt 开发复杂系统时，往往伴随着海量的 API 接口。如果单纯的使用  [@nuxtjs/axios](#)，那么 API 将与业务代码耦合在一次。最糟糕的状况是每个开发者都在页面中写下面的代码

```javascript
// Page 1 获取一个用户的信息
this.$axios.$get('/security/users/1')

// Page 2 创建一个用户
this.$axios.$post('/security/users', body)
```

对于 RESTful API 同一个资源，需要创建多个字符串来维护，即便可以通过抽离常量来维护，但对于调用者，还必须 import apiUrl，使用对应的 methods 来调用接口。

随着业务规模的扩张，需要一个能统一维护 API 的方案，来降低开发者的使用和维护成本。需要满足这几点：

- 可以直接调用方法，而不是写 this.$axios.$get('string')
- 可以获取一个基本的 RESTful 资源链接，方便 data-table 等组件使用
- 修改接口服务、版本、资源名称时，修改一处即可

## 使用

```javascript
// 创建一个 API 资源，修改文件 src/services/basis.js

// 创建了一个菜单资源的 CRUD 接口方法
+ export const menus = new Repository(`${DEEPEXI_CLOUD_TENANT}/${VERSION}/menus`)

// 获取一个菜单，只要能访问到 nuxt 上下文的地方都可以调用，最常见是 this

// 在 page 中
mounted() {
  // 获取资源的服务器路径
  this.$services.basis.menus.uri()
  // 获取所有菜单资源，返回一个列表
  this.$services.basis.menus.list()
  // 获取某个菜单资源的详情
  this.$services.basis.menus.detail(MENUS_ID)
  // 创建一个菜单资源
  this.$services.basis.menus.create(payload)
  // 更新一个菜单资源
  this.$services.basis.menus.update(MENUS_ID, payload)
  // 删除一个菜单资源
  this.$services.basis.menus.delete(MENUS_ID)
}

// 在 store 中
export const actions = {
  async getMenus(store, payload) {
    const data = await this.$services.basis.menus.detail(payload)
    ...
  }
}
```

## 进阶

有些时候，后端的接口并不是严格遵循 RESTful 的最佳实践，这个时候就需要自己重新实现默认的方法

```javascript
// 在 src/services/repository.js 中增加一个类，继承 Repository
export class ExampleRepository extends Repository {
  constructor(resource, id) {
    super(resource)
    this.id = id
  }

  uri(appId) {
    return `${this.resource}/status/${this.id}?appId=${appId}`
  }

  update($axios) {
    return (appId, payload, ...args) =>
      $axios.$post(`${this.uri(appId)}`, payload, ...args)
  }
}

// 基于 ExampleRepository 创建一个 API
export default new ExampleRepository('/example/api')

// 调用
this.$services.example.default.uri(appId)
this.$services.example.default.detail(id)
this.$services.example.default.list()
this.$services.example.default.create(payload)
this.$services.example.default.update(appId, payload)
this.$services.example.default.delete(id)
```
## 注意

services 会根据文件名作为 scope，将该文件 export 出去的所有值挂在这个 scope 下。

比如 `basic.js`
```js
export const login = new Repository(`${SECURITY_CLOUD}/${VERSION}/login`)

export const userInfo = new Repository(`${SECURITY_CLOUD}/${VERSION}/token`)

export const menus = new Repository(`${SECURITY_CLOUD_TENANT}/${VERSION}/menus`)

export const subMenus = new Repository(
  `${SECURITY_CLOUD_TENANT}/${VERSION}/sub-menus`,
)
```

就会将它们挂在 `this.$services.basic` 下：
```js
this.$services.basic.menus.list()
```

如果文件中只有一个 `export default`，则会直接挂在这个 scope 下。

比如 `example.js`：
```js
export default new Repository(`${VERSION}/example/api`)
```

就会将它直接挂在 `this.$services.example`：
```js
this.$services.example.list()
```

如果文件中既有 `export default` 又有 `export const`，则会将 `default` 作为 `key` 挂在 scope 下。

举个例子，假设 `example.js` 是这样的：
```js
export default new Repository(`${VERSION}/example/api`)

export const other = new Repository(`${VERSION}/example/api/other`)
```

就会将它们挂在 `this.$services.example` 下：
```js
this.$services.example.default.list()
this.$services.example.other.list()
```
