/*
 * @Author: Han
 * @Date: 2020-01-13 18:08:25
 * @Last Modified by: Han
 * @Last Modified time: 2020-02-18 17:33:53
 * @Description 如果服务很多，可以将服务 API 的公共部分抽离出来
 * @Example /security/api/v1/login, /security/api/v1/token
 * 将 /security/api 抽离后，如果服务路径更改只需要改动此处
 */

export const VERSION = 'v1'

// security 接口服务
export const SECURITY_CLOUD = '/security/api'

// security 租户接口服务
export const SECURITY_CLOUD_TENANT = '/security/tenant/api'
