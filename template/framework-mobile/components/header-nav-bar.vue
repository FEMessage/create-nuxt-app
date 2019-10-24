<template>
  <div class="header-nav-bar">
    <van-nav-bar
      left-text="返回"
      left-arrow
      fixed
      @click-left="$router.back()"
    />
  </div>
</template>

<script>
import {NavBar} from 'vant'

export default {
  name: 'HeaderNavBar',
  components: {
    'van-nav-bar': NavBar,
  },
}
</script>

<style lang="less">
.header-nav-bar {
  position: relative;
  z-index: 100;
  height: 100px;

  .van-nav-bar {
    height: 100px;
    line-height: 100px;
  }

  .van-nav-bar__text:active {
    background: transparent;
  }

  .van-nav-bar--fixed {
    position: fixed;
  }
}
</style>
