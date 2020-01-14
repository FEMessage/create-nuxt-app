import cookie from 'js-cookie'
import meta from '@/const/meta'

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
})

export const getters = {
  sideMenu: state => {
    return state.siderMenu.map(createMenuItem)
  },

  mainMenu: state => {
    return state.headerMenu.map(createMenuItem)
  },

  userInfo: state => {
    return {
      name: state.username,
      avatar: state.avatar,
    }
  },
}

export const mutations = {
  logout(s, redirect) {
    cookie.remove('token', cookieConfig)
    Object.assign(s, state())
    const loginUri = redirect
      ? `/login?redirect=${encodeURIComponent(redirect)}`
      : '/login'
    this.$router.replace(loginUri)
  },

  setHeaderMenu(state, payload) {
    state.headerMenu = payload
  },

  setSiderMenu(state, payload) {
    state.siderMenu = payload
  },

  setUserInfo(state, payload = {}) {
    const {params = {}, username, avatar = '', tenantId, token} = payload
    state.username = params.nickname || username
    state.avatar = avatar
    state.tenantId = tenantId
    state.token = token
    state.userId = params.userId
  },
}

export const actions = {
  async login({commit, dispatch}, {body, redirect = '/'}) {
    try {
      const userInfo = await this.$http.login.create(body)
      commit('setUserInfo', userInfo.payload)
      dispatch('getHeaderMenu')
      dispatch('getSiderMenu')
      this.$router.replace(redirect)

      return userInfo
    } catch (error) {
      throw error
    }
  },

  async refresh({commit, dispatch}, token) {
    const userInfo = await this.$http.userInfo.index({
      params: {
        token,
      },
    })
    dispatch('getHeaderMenu')
    dispatch('getSiderMenu')
    commit('setUserInfo', userInfo.payload)
  },

  async getHeaderMenu({commit}) {
    const menus = await this.$http.menus.index({
      params: {
        appId: process.env.APP_ID,
        code: 'main',
      },
    })
    commit('setHeaderMenu', menus.payload)
  },

  async getSiderMenu({commit}) {
    const menus = await this.$http.menus.index({
      params: {
        appId: process.env.APP_ID,
        code: 'account-enterprise',
      },
    })
    commit('setSiderMenu', menus.payload)
  }
}
