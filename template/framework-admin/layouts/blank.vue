<template>
  <section class="blank scroller-vertical">
    <layout-header
      :value="$route.path"
      :menus="mainMenu"
      :user-info="userInfo"
      :dropdown="dropDownList"
      @clickTitle="$router.push('/')"
    >
      <template slot="title">
        <svg-icon icon-class="logo" style="margin-right: 5px;"></svg-icon
        >DEEPEXI ADMIN
      </template>
    </layout-header>

    <el-scrollbar wrap-class="scrollbar-wrapper">
      <section class="sub-content">
        <section class="content">
          <nuxt />
        </section>
        <el-footer :height="FOOTER_HEIGHT">
          <copyright></copyright>
        </el-footer>
      </section>
    </el-scrollbar>
  </section>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex'
import {FOOTER_HEIGHT} from '@/assets/export.less'
import LayoutHeader from '@/containers/header.vue'
import Copyright from '@/components/copyright.vue'

export default {
  components: {
    LayoutHeader,
    Copyright,
  },

  data() {
    return {
      FOOTER_HEIGHT,
      dropDownList: [
        {
          name: '退出',
          click: () => {
            this.logout()
          },
        },
      ],
    }
  },

  computed: {
    ...mapState(['currentMenuId']),
    ...mapGetters(['mainMenu', 'userInfo', 'sideMenu']),
  },

  methods: {
    ...mapMutations(['logout']),
  },
}
</script>

<style lang="less" scoped>
.blank {
  height: 100vh;
  overflow: hidden;
  background-color: @--background-color-base;

  .sub-content {
    overflow-y: auto;
    height: calc(100vh - @--header-height);
  }

  .content {
    padding: 20px;
    min-height: calc(100vh - @--header-height - @--footer-height);
    background-color: transparent;
  }
}
</style>
