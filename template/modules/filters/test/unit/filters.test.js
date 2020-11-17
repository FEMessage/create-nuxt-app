import {price, formatDate} from '@/plugins/filters.js'

const date = 0

/**
 * price 函数使用到 Number.prototype.toLocaleString 方法。
 * 这一方法在 Node V12 及以下与浏览器返回值不一致，如 jest 失败建议使用 Node V12 以上
 * @see https://stackoverflow.com/questions/23199909/using-tolocalestring-in-node-js
 */
describe('price', () => {
  test('normal', () => {
    expect(price(1234)).toBe('¥1,234.00')
    expect(price(123.4)).toBe('¥123.40')
    expect(price(12.34)).toBe('¥12.34')
    expect(price(1.234)).toBe('¥1.23')
  })
  test('cancelFixed = true', () => {
    expect(price(1234, true)).toBe('¥1,234')
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
