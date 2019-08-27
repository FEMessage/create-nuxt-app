<template>
  <div class="layout-with-footer">
    <nuxt></nuxt>
    <div class="fixed-box">
      <van-tabbar v-model="active" fixed>
        <van-tabbar-item
          v-for="(item, i) in footerTab"
          :key="i"
          :icon="item.icon"
          @click="$router.push(item.url)"
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
    'van-tabbar-item': TabbarItem,
  },
  data() {
    return {
      active: 0,
      footerTab: [
        {
          title: '首页',
          url: '/',
          icon: 'home-o',
        },
        {
          title: '购物车',
          url: '/cart',
          icon: 'shopping-cart-o',
        },
        {
          title: '全部订单',
          url: '/order-list',
          icon: 'records',
        },
        {
          title: '我的',
          url: '/my',
          icon: 'user-o',
        },
      ],
    }
  },
  watch: {
    $route: {
      handler({path}) {
        this.active = this.footerTab.findIndex(e => e.url === path)
      },
      immediate: true,
    },
  },
}
</script>
