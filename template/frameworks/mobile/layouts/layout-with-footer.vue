<template>
  <div class="layout-with-footer">
    <nuxt></nuxt>
    <div class="fixed-box">
      <van-tabbar fixed v-model="active">
        <van-tabbar-item
          v-for="(item, i) in footerTab"
          :key="i"
          @click="$router.push(item.url)"
          :icon="item.icon"
        >
          {{ item.title }}
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
import {Tabbar, TabbarItem} from 'vant'
export default {
  components: {
    'van-tabbar': Tabbar,
    'van-tabbar-item': TabbarItem
  },
  data() {
    return {
      active: 0,
      footerTab: [
        {
          title: '首页',
          url: '/',
          icon: 'home-o'
        },
        {
          title: '购物车',
          url: '/cart',
          icon: 'shopping-cart-o'
        },
        {
          title: '我的',
          url: '/my',
          icon: 'user-o'
        }
      ]
    }
  }
}
</script>
