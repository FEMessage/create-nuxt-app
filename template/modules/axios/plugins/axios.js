/*
 * @Author: Han
 * @Date: 2019-05-08 15:13:59
 * @Last Modified by: Han
 * @Last Modified time: 2020-02-17 16:46:47
 * @Description 请求拦截，适配 restEasy 后端API服务框架，若数据格式不符合下面的数据格式，则会按照 httpStatusCode 正常触发对应的事件。
 * @Example
 * 适配api返回格式：
 * {
 *   code: Number, // 业务状态码 0: 操作成功;
 *   msg: String,  // 业务操作信息 当 code === 0 时为 "ok"; code !== 0 时为具体的失败信息
 *   payload: Any, // 接口返回数据
 * }
 *
 * 当 code !== 0 同时 httpStatusCode === 200 时，请求会被拦截到 xhr.onerror 事件，即此时的请求操作会被 Promise.catch 捕获。
 * 其余情况都和普通请求行为一致
 */

import Vue from 'vue'

// 如果接口路径包含 skipUrls 中的 string 将会跳过拦截
const skipUrls = ['easy-mock']

// 如果 http methods 匹配将清除请求中的 query，部分后端框架升级后，对 post 和 put 进行了 query 的限制
const methods = []

// 接口状态默认提示文案
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}

export default function({$axios, store, route}) {
  $axios.onRequest(config => {
    let url = config.url
    const method = config.method
    // 因后端框架进行规范改造，故post，put方法query后边不传参数
    const checkoutMethod = methods.some(v => v === method)
    if (skipUrls.some(skipUrl => url.includes(skipUrl))) return

    const state = store.state
    const token = state.token

    // 只传有值的参数
    const paramsList = ['tenantId', 'appId', 'userId'].filter(v => {
      return state[v]
    })

    // post put参数
    const paramsData = paramsList.reduce((cur, pre) => {
      cur[pre] = state[pre]
      return cur
    }, {})

    // query参数
    const queryData = paramsList
      .map(v => {
        return `${v}=${state[v]}`
      })
      .join('&')

    // jwt 验证
    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`
    }

    if (!checkoutMethod) {
      url += url.includes('?') ? '&' : '?'
      url += queryData
    } else if (!Array.isArray(config.data)) {
      config.data = {
        ...config.data,
        ...paramsData,
      }
    }

    config.url = `${url}${
      url.includes('?') ? '&' : '?'
    }_=${new Date().getTime()}`
    return config
  })

  $axios.onResponse(resp => {
    const {data} = resp
    const code = parseInt(data.code)

    // 如果code存在且不等于0，则将响应到error中
    if (code !== 0 && !Number.isNaN(code)) {
      // 如果httpStatusCode = 200, 但是操作失败的请求，将响应转为error
      // 兼容error的数据结构
      return Promise.reject(new Error(resp))
    } else {
      // 不能直接resolve resp.data 因为部分组件是按照axios原本的返回数据结构进行设计的
      return Promise.resolve(resp)
    }
  })

  $axios.onError(error => {
    if (process.client) {
      // axios 数据结构
      const resp = error.response
      const data = resp.data
      const {fullPath} = route

      if (parseInt(resp.status) === 401) {
        Vue.$notify.error({
          title: '提示',
          message: '登陆超时，请重新登录！',
          duration: 2000,
          onClose() {
            store.commit('logout', fullPath)
          },
        })
      } else {
        Vue.$notify.error({
          title: data.code || resp.status,
          message: data.msg || codeMessage[resp.status],
          duration: 2000,
        })
      }
    } else {
      // TODO asyncData 的错误 需要日志监控
      console.error('error', error)
    }

    // 将错误信息继续抛出，业务逻辑可以进行后续的操作
    return Promise.reject(error)
  })
}
