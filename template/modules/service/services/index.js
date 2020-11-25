/*
 * @Author: 4Ark
 * @Date: 2020-11-25 11:01:23
 * @Last Modified by: 4Ark
 * @Last Modified time: 2020-11-25 11:01:23
 * @Description 将 @/services 第一层 .js|.ts 文件中的所有 service 以 key=>value 的形式导出去
 * 详情查看 './basic.js,example.js'
 * 一个业务模块的 service 应该单独一个文件
 */
const serviceModules = require.context('./', false, /\.js|.ts$/)

export default serviceModules
  .keys()
  .filter(key => key !== './index.js') // 排除当前文件
  .reduce((services, path) => {
    const modules = serviceModules(path)

    Object.keys(modules).forEach(key => {
      services[key] = modules[key]
    })

    return services
  }, {})
