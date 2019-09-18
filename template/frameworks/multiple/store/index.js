import cookie from 'js-cookie'
import cookieKeys from '@/const/cookie-keys'
import {adminUser} from '@/const/api.js'
import meta from '@/const/meta.js'
import {getXpaasTag} from '@/const/api.js'
import {userMenuTree} from '@/const/api.js'
import {loginByUsername} from '@/const/api.js'

const cookiePath = process.env.COOKIE_PATH

const isObject = value =>
  Object.prototype.toString.call(value) === '[object Object]'

export const state = () => ({
  userId: '',
  token: '',
  tenantId: '',
  username: '',
  user: {},

  meta: {},

  permission: {
    thirdId: '',
    menuList: [],
    menuReady: false,
    spaName: meta.spaName,
  },

  setting: {
    collapse: false, // 是否收缩侧边栏
  },
})

export const mutations = {
  userMenuTreeReady(state, payload) {
    state.permission.menuReady = payload
  },
  login(state, payload) {
    cookieKeys.forEach(key => {
      state[key] = payload[key]
      cookie.set(key, payload[key], {
        path: cookiePath,
      })
    })
  },
  logout(state) {
    cookieKeys.forEach(key => {
      state[key] = ''
      cookie.remove(key, {
        path: cookiePath,
      })
    })
    // 清空state，跳转到login页的逻辑交给路由守卫
    location.reload()
  },
  update(state, payload) {
    Object.keys(payload).forEach(k => {
      if (isObject(payload[k])) {
        state[k] = Object.assign(state[k], payload[k])
      } else {
        state[k] = payload[k]
      }
    })
  },
}

export const actions = {
  // 用户名账号登录
  async loginByUsername({commit, dispatch}, userInfo) {
    try {
      const res = await this.$axios.$post(loginByUsername, userInfo)

      const data = res.payload

      commit('login', data)

      commit('update', {user: data})
      dispatch('fetchThirdId', {tenantId: data.tenantId})
      return data
    } catch (err) {
      return err
    }
  },

  // 获取头部列表的thirdId
  async fetchThirdId({commit, dispatch, state}, {tenantId}) {
    let {payload} = await this.$axios.$get(
      `${adminUser}${tenantId ? `?tenantId=${tenantId}` : ''}`,
    )
    const {thirdId} = payload || {}

    commit('update', {
      permission: {thirdId},
    })

    try {
      const headMenu = await dispatch('fetchHeadMenu', {thirdId})

      // 根据当前的项目名称来请求左侧菜单
      for (let item of headMenu) {
        if (item.name === state.permission.spaName) {
          dispatch('fetchUserMenuTree', {appId: item.id})
          break
        }
      }
    } catch (e) {
      console.error('fetchHeadMenu error: ', e)
    }
  },
  // 根据thirdId获取头部导航栏列表
  async fetchHeadMenu({commit, dispatch}, {thirdId}) {
    let headMenuListRes = await this.$axios.$get(getXpaasTag(thirdId))
    const payload = headMenuListRes.payload || []
    commit('update', {
      permission: {headMenuList: payload},
    })
    return payload
  },
  // 根据appId获取左侧菜单, 并设置当前的mainHead值
  async fetchUserMenuTree({commit}, {appId}) {
    let userMenuTreeRes = await this.$axios.$get(userMenuTree(appId))
    const payload = userMenuTreeRes.payload || []
    // 获取路由对应的页面名
    commit('update', {
      permission: {menuList: payload},
    })
    commit('userMenuTreeReady', true)
  },
}
