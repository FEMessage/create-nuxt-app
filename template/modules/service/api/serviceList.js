/*
 * @Author: Han 
 * @Date: 2020-01-13 18:08:25 
 * @Last Modified by: Han
 * @Last Modified time: 2020-01-13 19:00:37
 * @Description 如果服务很多，可以将服务 API 的公共部分抽离出来
 * @Example /deepexi-cloud/api/v1/login, /deepexi-cloud/api/v1/token
 * 将 /deepexi-cloud/api 抽离后，如果服务路径更改只需要改动此处
 */

export const VERSION = 'v1'

// deepexi-cloud 接口服务
export const DEEPEXI_CLOUD = '/deepexi-cloud/api'

// deepexi-cloud 租户接口服务
export const DEEPEXI_CLOUD_TENANT = '/deepexi-cloud/tenant/api'
