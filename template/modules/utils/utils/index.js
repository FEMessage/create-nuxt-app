function getRouterBase(href = '') {
  if (!href || typeof href !== 'string') {
    return '/'
  }

  if (!href.startsWith('http')) {
    return '/'
  }

  const { pathname } = new URL(href)
  if (pathname === '/') {
    return '/'
  }

  return (
    pathname
      .split('/')
      .filter(p => !/\./g.test(p))
      .join('/') + '/'
  )
}

module.exports = {
  getRouterBase
}
