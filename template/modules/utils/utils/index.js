const RepositoryInterface = {
  URI: 'uri',
  CREATE: 'create',
  LIST: 'list',
  DETAIL: 'detail',
  UPDATE: 'update',
  DELETE: 'delete',
}

function getRouterBase(href = '') {
  if (!href || typeof href !== 'string') {
    return '/'
  }

  if (!href.startsWith('http')) {
    return '/'
  }

  const {pathname} = new URL(href)
  if (pathname === '/') {
    return '/'
  }

  const routeBase = pathname
    .split('/')
    .filter(p => !/\./g.test(p))
    .join('/')

  return routeBase.endsWith('/') ? routeBase : routeBase + '/'
}

function parseServices(serviceModules, axios) {
  const services = {}
  Object.keys(serviceModules).forEach(scope => {
    services[scope] = {}

    Object.keys(serviceModules[scope]).forEach(key => {
      // 将 export default 直接挂在 scope 下
      if (key === 'default') {
        services[scope] = serviceModules[scope].default.init(axios)
      }

      if (Object.values(RepositoryInterface).includes(key)) {
        throw new Error(
          `Service 名字「${scope}.${key}」与 Repository 接口名字冲突`,
        )
      }

      services[scope][key] = serviceModules[scope][key].init(axios)
    })
  })

  return services
}

module.exports = {
  getRouterBase,
  parseServices,
}
