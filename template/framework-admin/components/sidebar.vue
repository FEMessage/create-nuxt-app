<template>
  <div
    :class="{hideSidebar: collapse}"
    class="sidebar-container scroller-vertical"
  >
    <el-menu
      :collapse="collapse"
      :default-active="$route.path"
      :collapse-transition="false"
      :background-color="MENU_BG_COLOR"
      :text-color="MENU_TEXT_COLOR"
      :active-text-color="MENU_ACTIVE_TEXT_COLOR"
      router
      class="aside-menu"
    >
      <el-scrollbar>
        <menu-item :menu-list="menuList"></menu-item>
      </el-scrollbar>
    </el-menu>
    <div class="fix-btn-wrap">
      <div class="collapse-btn" @click="collapse = !collapse">
        <img
          class="btn-icon"
          src="//deepexi.oss-cn-shenzhen.aliyuncs.com/deepexi-services/%E5%B7%A6%E4%BE%A7%E8%8F%9C%E5%8D%95/expand.svg"
          alt="toggle-sidebar-btn"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  MENU_BG_COLOR,
  MENU_TEXT_COLOR,
  MENU_ACTIVE_TEXT_COLOR,
} from '@/assets/export.less'
import MenuItem from '@/components/menu-item.vue'

export default {
  components: {
    MenuItem,
  },

  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      collapse: false,
      MENU_BG_COLOR,
      MENU_TEXT_COLOR,
      MENU_ACTIVE_TEXT_COLOR,
    }
  },
}
</script>

<style lang="less">
.sidebar-container {
  transition: width 0.28s;
  height: calc(100vh - @--header-height);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .el-menu {
    box-sizing: border-box;
    padding-top: 12px;
    flex: 1;
    border: none;
    height: calc(100vh - @--footer-height - @--header-height);
    width: 100% !important;

    .el-menu-item {
      &:hover {
        color: @menu-active-text-color !important;
        background-color: transparent !important;
      }

      &.is-active {
        background-color: @--color-primary !important;
      }
    }

    [class*='icon'] {
      font-size: 14px;
      margin-right: 5px;
    }
  }

  .fix-btn-wrap {
    height: @--footer-height;

    .collapse-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: @--footer-height;
      width: 100%;
      background: @--background-color-header;
      cursor: pointer;
    }

    .btn-icon {
      transform: rotate(180deg);
      font-size: 16px;
      width: 16px;
    }
  }

  // 折叠
  &.hideSidebar {
    width: 64px !important;

    .logo {
      padding-left: 13px;
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
