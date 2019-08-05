/**
 * nuxt3 将不支持 postcss.config.js。详情参考 yarn dev 时的 WARN 信息
 */
module.exports = ({ file }) => {
  let vwUnit
  /**
   * 使vant组件代码自适应viewport
   * @see https://github.com/youzan/vant/issues/1181
   */
  if (file && file.dirname && /node_modules\/vant/.test(file.dirname)) {
    vwUnit = 375
  } else {
    vwUnit = 750
  }
  return {
    plugins: [
      // 默认小于等于1px的值不会被转换。建议使用vant提供的hairline样式
      require('postcss-px-to-viewport')({
        viewportWidth: vwUnit,
        // exclude: /node_modules\/vant/ // 如果不想转换vant等第三方组件，则开启exclude选项
        // selectorBlackList: ['van-'] // 这样子也可以不转换vant组件样式，但项目内覆盖vant样式的代码也不会被转换
      })
    ]
  }
}
