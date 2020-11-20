// 这里编写全局注册的filter
import Vue from 'vue'
import dayjs from 'dayjs'

function isNull(o) {
  return o === null || o === undefined
}

// 千分位分隔符表示价格
// 123456 => 123,456
export function price(val, cancelFixed) {
  if (isNull(val) || isNaN(val)) return
  return parseFloat(val).toLocaleString('zh-Hans-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: cancelFixed ? 0 : 2,
  })
}

// 时间戳格式化
export function formatDate(value, format = 'YYYY-MM-DD') {
  if (!value && value !== 0) return ''
  if (!dayjs(value).isValid()) return value
  return dayjs(value).format(format)
}

Vue.filter('price', price)
Vue.filter('formatDate', formatDate)
