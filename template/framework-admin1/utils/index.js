export function getRouterBase(href = '') {
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

  return (
    pathname
      .split('/')
      .filter(p => !/\./g.test(p))
      .join('/') + '/'
  )
}

export const isType = (type = '') => value => {
  type = type.toLowerCase()
  return (
    Object.prototype.toString.call(value).toLowerCase() === `[object ${type}]`
  )
}

export function getNodeParentName(node, dataList) {
  if (!dataList.length) {
    return ''
  }

  const paths = node.idPath.split('/').filter(i => i)

  if (!paths.length) {
    return ''
  }

  let parentName = ''
  let list = dataList

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i]
    const node = list.find(item => {
      if (item.id == path) {
        list = item.children
        return item
      }
    })

    if (node) {
      parentName += `${node.name}/`
    }
  }

  return parentName
}

export const isString = isType('string')
export const isObject = isType('object')
export const isArray = isType('array')
export const isNumber = isType('number')
