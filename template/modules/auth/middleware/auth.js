/*
 * @Author: Han
 * @Date: 2019-05-08 14:32:04
 * @Last Modified by: Han
 * @Last Modified time: 2020-02-17 16:46:31
 * @Description 路由鉴权中间件，实现其他路由守卫功能请新建一个中间件
 *
 * **********************************************************
 * * @Strong 这是一个路由中间件，请不要在 serverMiddleware 中使用 *
 * **********************************************************
 */

import cookie from 'js-cookie'
import cookieKeys from '@/const/cookie-keys'

const LOGIN_PATH = '/login'
// 路由白名单，直接绕过路由守卫
const whiteList = [LOGIN_PATH]

export default async ({store, redirect, $config, route}) => {
  if (process.server) return

  const {NO_LOGIN} = $config
  const {path, fullPath} = route

  // 开发时可以用 NO_LOGIN 跳过路由鉴权
  if (NO_LOGIN > 0) return

  // 鉴权白名单
  if (whiteList.includes(path)) return

  const cookieInfo = {}

  cookieKeys.forEach(key => {
    cookieInfo[key] = cookie.get(key)
  })

  const {token} = cookieInfo

  // 未登录
  if (!token) {
    redirect(`${LOGIN_PATH}?redirect=${encodeURIComponent(fullPath)}`)
    return
  }

  // 已登录但是state因刷新丢失
  if (token && !store.state.userId) {
    try {
      await store.dispatch('refresh', token)
    } catch (e) {
      console.error('auth error: ', e)
    }
  }
}
