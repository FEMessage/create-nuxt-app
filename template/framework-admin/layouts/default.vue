<template>
  <section class="main-container">
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

    <section class="sub-container">
      <sidebar :menu-list="sideMenu" class="nav"></sidebar>
      <section class="main-content">
        <bread-crumb />
        <section class="sub-content">
          <el-scrollbar wrap-class="scrollbar-wrapper">
            <section class="content">
              <nuxt />
            </section>
            <el-footer :height="FOOTER_HEIGHT">
              <copyright></copyright>
            </el-footer>
          </el-scrollbar>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex'
import {FOOTER_HEIGHT} from '@/assets/export.less'
import LayoutHeader from '@/containers/header.vue'
import Copyright from '@/components/copyright.vue'
import BreadCrumb from '@/components/breadcrumb'
import Sidebar from '@/components/sidebar.vue'

export default {
  components: {
    LayoutHeader,
    BreadCrumb,
    Copyright,
    Sidebar,
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
.main-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  background-color: @--background-color-base;

  .sub-container {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .nav {
      width: @sidebar-width;
      flex-shrink: 0;
    }
  }

  .main-content {
    flex: 1;
    width: calc(100vw - @sidebar-width);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .sub-content {
    height: calc(100vh - @--header-height - @--breadcrumb-height);
    overflow: hidden;
  }

  .content {
    box-sizing: border-box;
    padding: 20px;
    margin: 0 20px;
    min-height: calc(
      100vh - @--header-height - @--breadcrumb-height - @--footer-height
    );
    background-color: @--background-color-white;
  }
}
</style>
