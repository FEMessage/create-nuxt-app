function getRouterBase(href = '') {
  if (!href || typeof href !== 'string') {
    return '/'
  }

  if (!href.startsWith('http')) {
    return '/'
  }

  return (
    new URL(href).pathname
      .split('/')
      .filter(p => !/\./g.test(p))
      .join('/') + '/'
  )
}

module.exports = {
  getRouterBase
}
