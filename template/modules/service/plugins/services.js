/*
 * @Author: Han
 * @Date: 2020-01-14 10:57:11
 * @Last Modified by: 4Ark
 * @Last Modified time: 2020-11-20 16:06:02
 * @Description 将 @/services/index.js 中的 services 注入到 nuxt 上下文中
 * @Example 在 nuxt 的 pages 中以 this.$services[scope][`${api_resource_name}`] 的方式调用对的 CRUD 方法
 * 详情查看 '../services/common/repository.js'
 */

import modules from '~/services'
import {parseServices} from '~/utils'

export default (ctx, inject) => {
  const services = parseServices(modules, ctx.$axios)

  inject('services', services)
}
