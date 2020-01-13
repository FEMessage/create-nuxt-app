import cookie from 'js-cookie'
import meta from '@/const/meta'

const cookieConfig = {
  get domain() {
    const { hostname } = location
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

const createMenuItem = ({ name = '', id = '', pathUrl = '/', iconUrl }) => {
  return {
    url: pathUrl,
    id: id,
    name: name,
    icon: iconUrl,
  }
}

export const state = () => ({
  userId: '',
  username: '',
  avatar: '',
  meta: meta,
  get token() {
    return cookie.get('token', cookieConfig)
  },
  set token(value) {
    cookie.set('token', value, cookieConfig)
  },
  appId: '',
  tenantId: '',
  thirdId: '',
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

}

export const actions = {

}
