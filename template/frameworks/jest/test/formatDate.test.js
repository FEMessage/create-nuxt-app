import {formatDate} from '@/const/filter.js'

describe('formatDate', () => {
  test('no params', () => {
    expect(formatDate()).toBeFalsy()
  })
})
