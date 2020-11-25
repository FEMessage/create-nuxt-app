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

    const keys = Object.keys(serviceModules[scope])

    // 如果只导出了一个 default，则直接挂在 scope 下
    if (serviceModules[scope].default && keys.length === 1) {
      services[scope] = serviceModules[scope].default.init(axios)
    } else {
      Object.keys(serviceModules[scope]).forEach(key => {
        services[scope][key] = serviceModules[scope][key].init(axios)
      })
    }
  })

  return services
}

module.exports = {
  getRouterBase,
  parseServices,
}
