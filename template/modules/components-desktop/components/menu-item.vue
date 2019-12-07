<template>
  <div>
    <div v-for="m in menuList" :key="m.id" class="menu-item">
      <el-menu-item v-if="!m.children" :index="m.url">
        <icon-font :icon="m.icon" prefix="iconfont"></icon-font>
        <span slot="title" class="item-title">{{ m.name }}</span>
      </el-menu-item>

      <el-submenu v-else :index="m.id + ''">
        <template slot="title">
          <!--<i class="el-icon-menu"></i>-->
          <v-img
            v-if="checkUrl(m.icon)"
            :src="m.icon"
            :alt="m.name"
            class="menu-item-img"
            width="100"
          />
          <icon-font v-else :icon="m.icon" prefix="iconfont"></icon-font>
          <span class="sub-menu-title">{{ m.name }}</span>
        </template>

        <menu-item :menu-list="m.children"></menu-item>
      </el-submenu>
    </div>
  </div>
</template>

<script>
import Vimg from '@femessage/v-img'

export default {
  name: 'MenuItem',
  components: {
    'v-img': Vimg,
  },
  props: {
    menuList: {
      type: Array,
      default() {
        return []
      },
    },
  },
  methods: {
    checkUrl(urlString) {
      const reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
      return urlString && reg.test(urlString)
    },
  },
}
</script>
<style lang="less">
.menu-item {
  user-select: none;

  .menu-item-img {
    width: 16px;
    margin-right: 3px;
  }
}
</style>
