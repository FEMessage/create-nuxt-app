const {parseServices} = require('@/utils')
import {Repository} from '@/services/common/repository'

const moackAxios = {
  $get() {},
  $post() {},
  $put() {},
  $delete() {},
}

describe('测试 utils.parseServices 函数', () => {
  test('普通处理 scope', () => {
    const serviceModules = {
      basis: {
        login: new Repository('login'),
        menus: new Repository('menus'),
        subMenus: new Repository('subMenus'),
        token: new Repository('token'),
      },
    }
    const expected = {
      basis: {
        login: serviceModules.basis.login.init(moackAxios),
        menus: serviceModules.basis.menus.init(moackAxios),
        subMenus: serviceModules.basis.subMenus.init(moackAxios),
        token: serviceModules.basis.token.init(moackAxios),
      },
    }
    expect(parseServices(serviceModules, moackAxios)).toMatchObject(expected)
  })

  test('正常处理导出 default 时直接挂在 scope', () => {
    const serviceModules = {
      example: {
        default: new Repository('example'),
      },
    }
    const expected = {
      example: serviceModules.example.default.init(moackAxios),
    }
    expect(parseServices(serviceModules, moackAxios)).toMatchObject(expected)
  })

  test('正常处理同时导出 default 和 const', () => {
    const serviceModules = {
      example: {
        default: new Repository('example'),
        other: new Repository('example/other'),
      },
    }
    const expected = {
      example: {
        ...serviceModules.example.default.init(moackAxios),
        other: serviceModules.example.other.init(moackAxios),
      },
    }
    expect(parseServices(serviceModules, moackAxios)).toMatchObject(expected)
  })
})
