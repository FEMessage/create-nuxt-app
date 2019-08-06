// 这里编写全局注册的filter
import Vue from 'vue'
import dayjs from 'dayjs'

function isNull(o) {
  return o === null || o === void 0
}

// 千分位分隔符表示价格
// 123456 => 123,456
export function price(val, cancelFixed) {
  if (isNull(val) || isNaN(val)) return
  let USPrice = Number.parseFloat(val).toLocaleString()

  let lastDot = USPrice.toString().indexOf('.')
  // 完全是整数, 需要添加小数点
  if (lastDot === -1 && !cancelFixed) USPrice += '.00'

  // 返回数据是一位小数，用0补齐为两位小数
  if (USPrice.toString().substring(lastDot + 1).length === 1 && !cancelFixed)
    USPrice += '0'

  return '¥' + USPrice
}

// 时间戳格式化
export function formatDate(value, format = 'YYYY-MM-DD') {
  if (!value && value !== 0) return ''
  if (!dayjs(value).isValid()) return value
  return dayjs(value).format(format)
}

Vue.filter('price', price)
Vue.filter('formatDate', formatDate)
