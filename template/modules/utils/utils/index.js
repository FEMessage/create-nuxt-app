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
      services[scope][key] = serviceModules[scope][key].init(axios)
    })
  })

  return services
}

module.exports = {
  getRouterBase,
  parseServices,
}
