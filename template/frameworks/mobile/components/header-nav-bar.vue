<template>
  <div class="header-nav-bar">
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
  </div>
</template>

<script>
import {NavBar} from 'vant'

export default {
  name: 'header-nav-bar',
  components: {
    'van-nav-bar': NavBar
  }
}
</script>

<style lang="less">
.header-nav-bar {
  position: relative;
  z-index: 100;
  height: 50px;

  .van-nav-bar {
    height: 50px;
    line-height: 50px;
  }

  .van-nav-bar__text:active {
    background: transparent;
  }

  .van-nav-bar--fixed {
    position: fixed;
  }
}
</style>
