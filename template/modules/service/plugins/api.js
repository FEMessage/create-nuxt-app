/*
 * @Author: Han 
 * @Date: 2020-01-14 10:57:11 
 * @Last Modified by: Han
 * @Last Modified time: 2020-01-14 11:38:06
 * @Description 将 @/api/index.js 中的 api 注入到 nuxt 上下文中
 * @Example 在 nuxt 的 pages 中以 this.$http[`${api_resource_name}`] 的方式调用对的 CRUD 方法
 * 详情查看 '../api/repository.js'
 */
import * as api from '@/api'

export default (ctx, inject) => {
  const http = {}
  Object.keys(api).forEach(key => {
    http[key] = api[key].init(ctx.$axios)
  })
  inject('http', http)
}
