/**
 * Created by levy on 2018/8/15.
 */
// 这里编写全局注册的filter
import Vue from 'vue'

function isNull(o) {
  return o === null || o === void 0
}

// 千分位分隔符表示价格
// 123456 => 123,456
function price(val) {
  if (isNull(val) || isNaN(val)) return
  let USPrice = Number.parseFloat(val).toLocaleString('en-US')

  let lastDot = USPrice.toString().indexOf('.')
  // 完全是整数, 需要添加小数点
  if (lastDot === -1) USPrice += '.00'

  // 返回数据是一位小数，用0补齐为两位小数
  if (USPrice.toString().substring(lastDot + 1).length === 1) USPrice += '0'

  return '¥' + USPrice
}

Vue.filter('price', price)
