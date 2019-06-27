import {formatDate} from '@/const/filter.js'

const date = 0

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
