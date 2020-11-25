const {parseServices} = require('@/utils')
import {Repository} from '@/services/common/repository'

const mockAxios = {
  $get() {},
  $post() {},
  $put() {},
  $delete() {},
}

describe('测试 utils.parseServices 函数', () => {
  test('普通处理 scope', () => {
    const serviceModules = {
      basic: {
        login: new Repository('login'),
        menus: new Repository('menus'),
        subMenus: new Repository('subMenus'),
        token: new Repository('token'),
      },
    }
    const expected = {
      basic: {
        login: serviceModules.basic.login.init(mockAxios),
        menus: serviceModules.basic.menus.init(mockAxios),
        subMenus: serviceModules.basic.subMenus.init(mockAxios),
        token: serviceModules.basic.token.init(mockAxios),
      },
    }
    expect(parseServices(serviceModules, mockAxios)).toMatchObject(expected)
  })

  test('正常处理导出 default 时直接挂在 scope', () => {
    const serviceModules = {
      basic: {
        login: new Repository('login'),
        menus: new Repository('menus'),
        subMenus: new Repository('subMenus'),
        token: new Repository('token'),
      },
      example: {
        default: new Repository('example'),
      },
    }
    const expected = {
      basic: {
        login: serviceModules.basic.login.init(mockAxios),
        menus: serviceModules.basic.menus.init(mockAxios),
        subMenus: serviceModules.basic.subMenus.init(mockAxios),
        token: serviceModules.basic.token.init(mockAxios),
      },
      example: serviceModules.example.default.init(mockAxios),
    }
    expect(parseServices(serviceModules, mockAxios)).toMatchObject(expected)
  })

  test('正常处理同时导出 default 和 const', () => {
    const serviceModules = {
      basic: {
        login: new Repository('login'),
        menus: new Repository('menus'),
        subMenus: new Repository('subMenus'),
        token: new Repository('token'),
      },
      example: {
        default: new Repository('example'),
        other: new Repository('example/other'),
      },
    }
    const expected = {
      basic: {
        login: serviceModules.basic.login.init(mockAxios),
        menus: serviceModules.basic.menus.init(mockAxios),
        subMenus: serviceModules.basic.subMenus.init(mockAxios),
        token: serviceModules.basic.token.init(mockAxios),
      },
      example: {
        default: serviceModules.example.default.init(mockAxios),
        other: serviceModules.example.other.init(mockAxios),
      },
    }
    expect(parseServices(serviceModules, mockAxios)).toMatchObject(expected)
  })
})
