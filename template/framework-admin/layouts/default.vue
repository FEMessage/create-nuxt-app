<!-- README: 为了不在多个编写获取 header 信息的逻辑，姑将 layout 使用 v-if 区分 -->
<template>
  <section class="main-container">
    <!-- header -->
    <layout-header
      :value="$route.path"
      :menus="mainMenu"
      :user-info="userInfo"
      :dropdown="dropDownList"
      @clickTitle="$router.push('/?skip=1')"
    >
      <template slot="title">
        <svg-icon icon-class="logo" style="margin-right: 5px;"></svg-icon>DEEPEXI ADMIN
      </template>
    </layout-header>

    <!-- default layout -->
    <section v-if="isDefaut" class="sub-container">
      <!-- side nav -->
      <sidebar :menu-list="sideMenu" class="nav"></sidebar>
      <section class="main-content">
        <bread-crumb />
        <section class="sub-content">
          <el-scrollbar wrap-class="scrollbar-wrapper">
            <section class="content">
              <nuxt />
            </section>
            <!-- footer -->
            <el-footer :height="FOOTER_HEIGHT">
              <copyright></copyright>
            </el-footer>
          </el-scrollbar>
        </section>
      </section>
    </section>

    <!-- blank layout -->
    <section v-if="isBlank" class="sub-content no-breadcrumb">
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <section class="blank-content">
          <section class="content">
            <nuxt />
          </section>
        </section>

        <!-- footer -->
        <el-footer :height="FOOTER_HEIGHT">
          <copyright></copyright>
        </el-footer>
      </el-scrollbar>
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

  props: {
    type: {
      type: String,
      default: 'default',
    },
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
    isBlank() {
      return this.type === 'blank'
    },

    isDefaut() {
      return this.type === 'default'
    },
  },

  methods: {
    ...mapMutations(['logout']),
  },
}
</script>

<style lang="less">
#__nuxt {
  .main-container {
    width: 100%;
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
      overflow: hidden;
      min-height: calc(100vh - @--header-height - @--breadcrumb-height);

      & .el-scrollbar__thumb {
        background-color: rgba(0, 0, 0, 0.4) !important;

        &:hover {
          background-color: rgba(0, 0, 0, 0.65) !important;
        }
      }
    }

    .no-breadcrumb {
      height: calc(100vh - @--header-height);
    }

    .scrollbar-wrapper {
      overflow-x: hidden !important;
    }

    .content {
      box-sizing: border-box;
      min-height: calc(
        100vh - @--header-height - @--footer-height - @--breadcrumb-height
      );
      padding: 0 20px;
      border-radius: 8px;
      background-color: @--background-color-white;
    }

    .blank-content {
      background-image: linear-gradient(
        to bottom,
        @--background-color-header,
        @--background-color-header 160px,
        transparent 160px,
        transparent 100%
      );
      box-sizing: border-box;
      min-height: calc(100vh - @--header-height - @--footer-height);
      overflow-x: hidden;

      .content {
        box-sizing: border-box;
        border-radius: 0;
        margin: 0;
        padding: 0;
        background-color: transparent;
      }
    }
  }
}
</style>
