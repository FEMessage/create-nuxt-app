// reference https://github.com/noeldelgado/gemini-scrollbar/blob/master/index.js

import {addResizeListener, removeResizeListener} from './utils/resize-event'
import scrollbarWidth from './utils/scrollbar-width'
import {toObject} from './utils/util'
import Bar from './bar'
import './index.less'

/* istanbul ignore next */
export default {
  name: 'ScrollbarMain',

  components: {Bar},

  props: {
    horizontal: {
      type: Boolean,
      default: false
    }, // 是否显示横向滚动条
    vertical: {
      type: Boolean,
      default: true
    }, // 是否显示竖向滚动条
    wrapStyle: {},
    wrapClass: {},
    viewClass: {},
    viewStyle: {},
    noresize: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      sizeWidth: '0',
      sizeHeight: '0',
      moveX: 0,
      moveY: 0
    }
  },

  computed: {
    wrap() {
      return this.$refs.wrap
    },
    slotsWrap() {
      return this.$refs.slotsWrap
    }
  },

  render(h) {
    let gutter = scrollbarWidth()
    let style = this.wrapStyle

    if (gutter) {
      const gutterWith = `-${gutter}px`
      const gutterStyle = `${
        this.horizontal ? `margin-bottom: ${gutterWith}; ` : ''
      }${this.vertical ? `margin-right: ${gutterWith};` : ''}`

      if (Array.isArray(this.wrapStyle)) {
        style = toObject(this.wrapStyle)
        style.marginRight = style.marginBottom = gutterWith
      } else if (typeof this.wrapStyle === 'string') {
        style += gutterStyle
      } else {
        style = gutterStyle
      }
    }
    const wrap = (
      <div
        ref="wrap"
        style={style}
        onScroll={this.handleScroll}
        class={[
          this.wrapClass,
          'scrollbar__wrap',
          gutter ? '' : 'scrollbar__wrap--hidden-default'
        ]}
      >
        {
          <div
            class={['scrollbar__view', this.viewClass]}
            style={this.viewStyle}
            ref="resize"
          >
            <div ref="slotsWrap">{this.$slots.default}</div>
          </div>
        }
      </div>
    )
    let nodes = [wrap]
    if (this.horizontal) {
      nodes.push(<Bar move={this.moveX} size={this.sizeWidth} />)
    }
    if (this.vertical) {
      nodes.push(<Bar vertical move={this.moveY} size={this.sizeHeight} />)
    }
    return h('div', {class: 'scrollbar'}, nodes)
  },

  methods: {
    handleScroll() {
      const wrap = this.wrap
      const slotsWrap = this.slotsWrap

      this.moveY = (wrap.scrollTop * 100) / wrap.clientHeight
      this.moveX = (wrap.scrollLeft * 100) / wrap.clientWidth

      const bottomDistance =
        slotsWrap.clientHeight - wrap.scrollTop - wrap.clientHeight
      const rightDistance =
        this.$refs.slotsWrap.clientHeight - wrap.scrollLeft - wrap.clientWidth

      this.$emit('onScrollY', bottomDistance)
      this.$emit('onScrollX', rightDistance)
    },

    update() {
      let heightPercentage, widthPercentage
      const wrap = this.wrap
      if (!wrap) return

      heightPercentage = (wrap.clientHeight * 100) / wrap.scrollHeight
      widthPercentage = (wrap.clientWidth * 100) / wrap.scrollWidth

      this.sizeHeight = heightPercentage < 100 ? heightPercentage + '%' : ''
      this.sizeWidth = widthPercentage < 100 ? widthPercentage + '%' : ''
    }
  },

  mounted() {
    this.$nextTick(this.update)
    !this.noresize && addResizeListener(this.$refs.slotsWrap, this.update)
  },

  beforeDestroy() {
    !this.noresize && removeResizeListener(this.$refs.slotsWrap, this.update)
  }
}
