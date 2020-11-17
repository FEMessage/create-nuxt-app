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
    .filter((p) => !/\./g.test(p))
    .join('/')

  return routeBase.endsWith('/') ? routeBase : routeBase + '/'
}

module.exports = {
  getRouterBase,
}
