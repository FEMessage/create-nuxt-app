/*
 * @Author: 4Ark
 * @Date: 2020-11-25 11:01:23
 * @Last Modified by: 4Ark
 * @Last Modified time: 2020-11-25 11:01:23
 * @Description 将 @/services 第一层 .js|.ts 文件中的所有 service 导出去
 * 一个业务模块的 service 应该单独一个文件
 */
const serviceModules = require.context('./', false, /\.js|.ts$/)

/**
 * 使用文件名作为 scope，然后将该文件的所有导出内容挂在这个 scope 下
 * 就如 basis.js 导出了 login、menus 等，就会变成 servers.basis.login 这样
 * 另外需要注意的是 export default 时 default 会作为 key
 * 关于如何处理该数据可以看 src/plugins/services.js
 */
export default serviceModules
  .keys()
  .filter(key => key !== './index.js') // 排除当前文件
  .reduce((services, path) => {
    // set './app.js' => 'app'
    const moduleName = path.replace(/^\.\/(.*)\.\w+$/, '$1')
    const modules = serviceModules(path)

    services[moduleName] = modules

    return services
  }, {})
