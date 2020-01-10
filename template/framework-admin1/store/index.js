/*
 * @Author: Han
 * @Date: 2019-12-10 14:24:59
 * @Last Modified by: Han
 * @Last Modified time: 2020-01-08 19:04:15
 * @Description management state about user info & menu data
 */

import cookie from 'js-cookie'
import _template from 'lodash.template'
import meta from '@/const/meta'
import menuCode from '@/const/menu-codes'
import {login, refresh, getMenuByCode, getHCArticles} from '@/services'

const sideMenuCache = new Map()

const cookieConfig = {
  get domain() {
    const {hostname} = location
    // 本地环境
    if (/^(127.0.0.1|localhost)/.test(hostname)) return hostname
    // 线上环境
    const s = hostname.indexOf('.')
    return hostname.slice(s)
  },
  get expires() {
    const twoHours = 2 * 60 * 60 * 1000
    return new Date(Date.now() + twoHours)
  },
}

const createMenuItem = ({name = '', id = '', pathUrl = '/', iconUrl}) => {
  return {
    url: pathUrl,
    id: id,
    name: name,
    icon: iconUrl,
  }
}

export const state = () => ({
  // user info
  userId: '',
  username: '',
  avatar: '',
  // meta info
  meta: meta,

  // auth info
  get token() {
    return cookie.get('token', cookieConfig)
  },

  set token(value) {
    cookie.set('token', value, cookieConfig)
  },
  appId: '',
  tenantId: '',
  thirdId: '',

  // menu data
  headerMenu: [],
  siderMenu: [],
  hcArticles: [],
})

export const getters = {
  mainMenu: state => {
    return state.headerMenu.map(createMenuItem)
  },

  sideMenu: state => {
    return state.siderMenu.map(createMenuItem)
  },

  userInfo: state => {
    return {
      name: state.username,
      avatar: state.avatar,
    }
  },
}

export const mutations = {
  setApplicationId(state, payload) {
    state.appId = payload
  },

  setUserInfo(state, payload = {}) {
    const {params = {}, username, avatar = '', tenantId, token} = payload
    state.username = params.nickname || username
    state.avatar = avatar
    state.tenantId = tenantId
    state.token = token
    state.userId = params.userId
  },

  setHeaderMenu(state, payload) {
    state.headerMenu = payload
  },

  setSideMenu(state, payload) {
    state.siderMenu = payload
  },

  cacheSideMenuById(state, {id, code, menu}) {
    sideMenuCache.set(id + code, menu)
  },

  logout(s, redirect) {
    cookie.remove('token', cookieConfig)
    Object.assign(s, state())
    const loginUri = redirect
      ? `/login?redirect=${encodeURIComponent(redirect)}`
      : '/login'
    this.$router.replace(loginUri)
  },

  setHCArticles(state, payload) {
    state.hcArticles = payload
  },
}

export const actions = {
  async login({commit, dispatch}, {body, redirect = '/'}) {
    try {
      const userInfo = await login(body)
      commit('setUserInfo', userInfo.payload)
      dispatch('getHeaderMenu')
      this.$router.replace(redirect)

      return userInfo
    } catch (error) {
      throw error
    }
  },

  async refresh({commit, dispatch}, payload) {
    const userInfo = await refresh(payload)
    dispatch('getHeaderMenu')
    commit('setUserInfo', userInfo.payload)
  },

  async getHeaderMenu({commit, dispatch}) {
    const getCodeMenu = getMenuByCode(menuCode.MAIN)
    const getHCArticles = dispatch('getHCArticles')
    const [menus, hcArticles] = await Promise.all([getCodeMenu, getHCArticles])
    if (!hcArticles.length) {
      menus.payload = menus.payload.filter(menu => menu.code !== 'help')
    }
    commit('setHeaderMenu', menus.payload)
  },

  async getSideMenu({state, commit}, {code, id = ''}) {
    if (sideMenuCache.has(id + code)) {
      commit('setSideMenu', sideMenuCache.get(id + code))
      return state.sideMenu
    }

    // 清空就侧边栏
    commit('setSideMenu', [])

    const menus = await getMenuByCode(code)

    // 使用模板生成对应 id 的侧边栏
    const menuString = JSON.stringify(menus.payload || [])
    const compiled = _template(menuString)
    const menu = JSON.parse(compiled({id: id}))
    commit('cacheSideMenuById', {id, code, menu})
    commit('setSideMenu', menu)
    return menu
  },

  async getHCArticles({commit}) {
    const hcArticles = (await getHCArticles()).payload
    commit('setHCArticles', hcArticles)
    return hcArticles
  },
}
