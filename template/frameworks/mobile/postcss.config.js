/**
 * nuxt3 将不支持 postcss.config.js。详情参考 yarn dev 时的 WARN 信息
 */
module.exports = ({file}) => {
  // 设计稿宽度
  let vwUnit = 750
  /**
   * 使vant组件代码自适应viewport。引入其他第三方样式库时可参考此方式处理
   * @see https://github.com/youzan/vant/issues/1181
   */
  if (file && file.dirname && /node_modules\/vant/.test(file.dirname)) {
    vwUnit = 375
  }
  return {
    plugins: [
      // 默认小于等于1px的值不会被转换。建议使用vant提供的hairline样式
      require('postcss-px-to-viewport')({
        viewportWidth: vwUnit
        // exclude: /node_modules\/vant/ // 如果不想转换vant等第三方组件，则开启exclude选项
        // selectorBlackList: ['van-'] // 这样子也可以不转换vant组件样式，但项目内覆盖vant样式的代码也不会被转换
      }),
      /**
       * nuxt 默认配置
       * @see https://nuxtjs.org/api/configuration-build/#postcss
       */
      require('postcss-import'),
      require('postcss-url'),
      /**
       * 如果要使用 browserslist，推荐写在 package.json 里而不是 autoprefixer 里
       * @see https://github.com/postcss/autoprefixer#options
       */
      require('postcss-preset-env')({stage: 2, autoprefixer: {}}),
      require('cssnano')({ preset: 'default' }) // disabled in dev mode
    ]
  }
}
