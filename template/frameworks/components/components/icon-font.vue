<template>
  <i :class="iconClass"></i>
</template>

<script>
// 若引入了其他字体库，可根据该字体库 class 前缀拓展此对象
const ICON_PREFIX = {
  el: 'el-icon-',
  fa: 'fa fa-',
  iconfont: 'iconfont icon-'
}

export default {
  name: 'IconFont',
  props: {
    icon: {
      type: String
    },
    prefix: {
      type: String,
      default: 'el'
    }
  },
  computed: {
    iconClass() {
      return `${ICON_PREFIX[this.prefix]}${this.icon}`
    }
  }
}
</script>
<style></style>