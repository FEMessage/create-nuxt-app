<template>
  <div :class="{hideSidebar: setting.collapse}" class="sidebar-container">
    <el-menu
      v-loading="!permission.menuReady"
      :collapse="setting.collapse"
      :default-active="$route.path"
      :collapse-transition="false"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      router
      class="aside-menu"
    >
      <div class="system-name">
        {{ appName }}
      </div>
      <scrollbar :noresize="false" wrap-class="scrollbar-wrapper">
        <menu-item :menu-list="permission.menuList"></menu-item>
      </scrollbar>

      <div class="fix-btn-wrap">
        <div class="collapse-btn" @click="toggleCollapse">
          <icon-font
            prefix="iconfont"
            icon="expand"
            class="btn-icon"
          ></icon-font>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import MenuItem from '@/components/menu-item.vue'
import variables from '~/assets/export.less'
import Scrollbar from '@/components/scrollbar/index.js'

export default {
  name: 'Sidebar',
  components: {
    MenuItem,
    Scrollbar,
  },
  data() {
    return {
      variables,
    }
  },
  computed: {
    ...mapState(['permission', 'setting']),
    appName() {
      return this.permission.spaName
    },
  },
  methods: {
    toggleCollapse() {
      this.$store.commit('update', {
        setting: {collapse: !this.setting.collapse},
      })
    },
  },
}
</script>

<style lang="less">
@title-bg: rgba(242, 244, 249, 1);
@menu-height: 50px;

.sidebar-container {
  transition: width 0.28s;
  width: @sideBarMaxWidth !important;
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 60px;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  box-shadow: 1px 0 6px rgba(0, 21, 41, 0.35);

  //reset element-ui css
  .horizontal-collapse-transition {
    transition:
      0s width ease-in-out,
 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    height: calc(100vh - 60px - 100px);
    overflow-x: hidden !important;
    margin-bottom: 0 !important;

    .el-scrollbar__view {
      height: 100%;
    }
  }

  .el-scrollbar__bar.is-vertical {
    right: 0;
  }

  .is-horizontal {
    display: none;
  }

  .system-name {
    background-color: @title-bg;
    opacity: 1;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    color: rgba(45, 48, 59, 1);
  }

  .el-menu {
    border: none;
    height: 100%;
    width: 100% !important;

    .item-title {
      position: relative;

      &::before {
        content: '';
        display: inline-block;
        position: absolute;
        top: 50%;
        left: -12px;
        transform: translateY(-50%);
        bottom: 0;
        width: 5px;
        height: 5px;
        background: rgba(171, 172, 176, 1);
        border-radius: 1px;
      }
    }

    .el-menu-item {
      &.is-active {
        .item-title {
          &::before {
            width: 5px;
            height: 16px;
            background-color: @primary-color;
            border-radius: 15px;
          }
        }
      }
    }

    [class*='icon'] {
      font-size: 14px;
      margin-right: 5px;
    }
  }

  .fix-btn-wrap {
    height: 50px;

    .collapse-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      width: 100%;
      background: rgba(240, 242, 245, 1);
      cursor: pointer;
    }

    .btn-icon {
      transform: rotate(180deg);
      font-size: 16px;
    }
  }

  // 折叠
  &.hideSidebar {
    width: @sideBarMinWidth !important;

    .system-name {
      display: none;
      opacity: 0;
      transition: opacity 0.28s ease-in-out !important;
    }

    .scrollbar-wrapper {
      height: calc(100vh - 60px - 50px);
    }

    .el-submenu__title {
      text-align: center;
    }

    // 有子菜单
    .sub-menu-title,
    .el-submenu__icon-arrow {
      display: none;
    }

    [class*='icon'] {
      font-size: 16px;
      margin: 0;
    }

    .fix-btn-wrap {
      .btn-icon {
        transform: rotate(0deg);
      }
    }
  }

  // when menu collapsed
  .menu--vertical {
    // the scroll bar appears when the subMenu is too long
    > .menu--popup {
      max-height: 100vh;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 20px;
      }
    }
  }
}
</style>
