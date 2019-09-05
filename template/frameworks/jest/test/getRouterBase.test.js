const {getRouterBase} = require('../src/utils')

describe('测试 utils.getRouterBase 函数', () => {
  test('传入非法的参数，返回根路径', () => {
    expect(getRouterBase()).toBe('/')
    expect(getRouterBase(false)).toBe('/')
    expect(getRouterBase(12345)).toBe('/')
    expect(getRouterBase('abcde')).toBe('/')
    expect(getRouterBase(null)).toBe('/')
    expect(getRouterBase({})).toBe('/')
    expect(getRouterBase(undefined)).toBe('/')
  })

  test('只传入域名，返回根路径', () => {
    expect(getRouterBase('https://bing.com')).toBe('/')
    expect(getRouterBase('https://static.deepexi.top#/hash')).toBe('/')
  })

  test('传入带有路由的域名，返回路由', () => {
    expect(getRouterBase('https://bing.com/aaa')).toBe('/aaa/')
    expect(getRouterBase('https://serverless.deepexi.top/bbb#/hash')).toBe(
      '/bbb/'
    )
  })

  test('传入带有多级路由的域名，返回多级路由', () => {
    expect(getRouterBase('https://static.deepexi.top/aaa/bbb')).toBe('/aaa/bbb/')
    expect(
      getRouterBase('https://static.deepexi.top/serverless-console/aaa/bbb')
    ).toBe('/serverless-console/aaa/bbb/')
  })

  test('传入带有文件名的域名，只返回路由', () => {
    expect(
      getRouterBase(
        'https://serverless.deepexi.top/serverless-console/index.html#/app-list'
      )
    ).toBe('/serverless-console/')

    expect(
      getRouterBase(
        'https://serverless.deepexi.top/serverless-console/aaa/bbb/ccc/index.html#/app-list'
      )
    ).toBe('/serverless-console/aaa/bbb/ccc/')
  })
})
