/*
 * @Author: Han
 * @Date: 2020-01-14 11:43:00
 * @Last Modified by: Han
 * @Last Modified time: 2020-02-18 17:36:32
 * @Description 项目接口统一定义入口，定义后可以直接通过 this.$http.login.create 的方式调用接口
 * 所有需要使用的定义都要 export
 */

// import {ExampleRepository} from './repository'
import {Repository} from './repository'
import {VERSION, SECURITY_CLOUD, SECURITY_CLOUD_TENANT} from './serviceList'

export const login = new Repository(`${SECURITY_CLOUD}/${VERSION}/login`)

export const userInfo = new Repository(`${SECURITY_CLOUD}/${VERSION}/token`)

export const menus = new Repository(`${SECURITY_CLOUD_TENANT}/${VERSION}/menus`)

export const subMenus = new Repository(
  `${SECURITY_CLOUD_TENANT}/${VERSION}/sub-menus`,
)

// 重新定义请求方法的例子
// export const example = new ExampleRepository('/example/api')
