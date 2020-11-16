import {price, formatDate} from '@/plugins/filters.js'

const date = 0

/**
 * price 函数使用到 Number.prototype.toLocaleString 方法。
 * 这一方法对 zh-Hans-CN 的实现在 node 端需要 full-icu(约53m) 的支持
 * 如果想开启此项测试，需要按以下步骤执行：
 * 1. yarn add -D full-icu
 * 2. 在 package.json 中修改 test 脚本：
 * "test": "cross-env NODE_ICU_DATA=\"./node_modules/full-icu/icudt62l.dat\" jest"
 * 3. yarn test
 *
 * @see https://nodejs.org/api/intl.html#intl_providing_icu_data_at_runtime
 */
describe('price', () => {
  test('normal', () => {
    expect(price(1234)).toBe('￥1,234.00')
    expect(price(123.4)).toBe('￥123.40')
    expect(price(12.34)).toBe('￥12.34')
    expect(price(1.234)).toBe('￥1.23')
  })
  test('cancelFixed = true', () => {
    expect(price(1234, true)).toBe('￥1,234')
  })
  test('no params', () => {
    expect(price()).toBeUndefined()
  })
})

describe('formatDate', () => {
  test('no params', () => {
    expect(formatDate()).toBe('')
  })

  test('default formatter: YYYY-MM-DD', () => {
    expect(formatDate(date)).toBe('1970-01-01')
  })

  test('formatter: YYYY/MM/DD', () => {
    expect(formatDate(date, 'YYYY/MM/DD')).toBe('1970/01/01')
  })

  test('formatter: YYYY,MM,DD', () => {
    expect(formatDate(date, 'YYYY,MM,DD')).toBe('1970,01,01')
  })
})
