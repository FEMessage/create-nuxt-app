import {Repository} from './common/repository'
import {VERSION, SECURITY_CLOUD, SECURITY_CLOUD_TENANT} from './common/api'

export const login = new Repository(`${SECURITY_CLOUD}/${VERSION}/login`)

export const userInfo = new Repository(`${SECURITY_CLOUD}/${VERSION}/token`)

export const menus = new Repository(`${SECURITY_CLOUD_TENANT}/${VERSION}/menus`)

export const subMenus = new Repository(
  `${SECURITY_CLOUD_TENANT}/${VERSION}/sub-menus`,
)
