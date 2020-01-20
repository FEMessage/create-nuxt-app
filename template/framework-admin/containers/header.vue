<template>
  <el-header class="layout-header" :height="HEADER_HEIGHT">
    <section class="layout-header-content">
      <el-row type="flex" justify="space-between">
        <!-- 应用 logo 栏 -->
        <el-col :span="4" class="title" @click.native="handleTitle">
          <slot name="title">{{ title }}</slot>
        </el-col>

        <!-- 头部主菜单栏 -->
        <el-col :span="14" class="navigation">
          <div
            v-for="(item, index) in menus"
            :class="{active: isActive(item.url)}"
            :key="index"
            class="navigation-menu"
            @click="handleHeaderMenu(item)"
          >{{ item.name }}</div>
        </el-col>

        <!-- 头部操作栏 -->
        <el-col :span="5" class="action">
          <el-button
            v-for="(item, index) in actions"
            :class="item.icon"
            :key="index"
            class="icon-button"
            circle
            @click="handleActions(item)"
          >
            <icon-font :icon="item.icon" prefix="iconfont"></icon-font>
          </el-button>
          <el-dropdown placement="bottom-end" @command="handleDropdown">
            <span class="dropdown-area">
              <el-avatar
                :size="24"
                :src="
                  userInfo.avater ||
                    '//deepexi.oss-cn-shenzhen.aliyuncs.com/xpaas-console/user-portrait.png'
                "
              ></el-avatar>
              <p class="username">{{ userInfo.name }}</p>
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item, index) in dropdown"
                :key="index"
                :command="index"
              >{{ item.name }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </section>
  </el-header>
</template>

<script>
import {HEADER_HEIGHT} from '@/assets/export.less'

export default {
  name: 'LayoutHeader',

  props: {
    // 当前的路由 path
    value: {
      type: String,
      default: '',
    },
    // 应用名
    title: {
      type: String,
      default: 'DEEPEXI IAM',
    },

    /**
     * 用户信息
     *
     * @property {string} avatar 用户头像
     * @property {string} name 用户名
     */
    userInfo: {
      type: Object,
      default: () => ({
        name: 'admin',
      }),
    },

    /**
     * 主菜单
     *
     * 数组中每个元素的对象属性
     * @property {string} name 按钮文本
     * @property {string} url 路由 path 或者外链
     * @property {boolean} external 是否外链
     */
    menus: {
      type: Array,
      default: () => [],
    },

    /**
     * 下拉菜单
     *
     * 数组中每个元素的对象属性
     * @property {string} name 菜单文本
     * @property {function} click 点击菜单时执行
     */
    dropdown: {
      type: Array,
      default: () => [],
    },

    /**
     * 右侧操作栏
     *
     * 数组中每个元素的对象属性
     * @property {string} icon el-icon
     * @property {function} click 点击时执行
     */
    actions: {
      type: Array,
      default: () => [
        {
          icon: 'icon_edit',
          click() {},
        },
        {
          icon: 'icon_question',
          click() {},
        },
        {
          icon: 'icon_message',
          click() {},
        },
      ],
    },
  },

  data() {
    return {
      HEADER_HEIGHT,
    }
  },

  methods: {
    // 入参为下拉菜单的列表索引
    handleDropdown(index) {
      this.dropdown[index].click && this.dropdown[index].click()
    },

    // 入参为主菜单的 object
    handleHeaderMenu({external, url}) {
      if (external) {
        window.open(url)
      }

      this.$router.push(url)
    },

    handleTitle(event) {
      this.$emit('clickTitle', event)
    },

    handleActions({click}) {
      click && click()
    },

    isActive(url) {
      const path = url.split('/').filter(v => v)
      return this.value.startsWith(`/${path[0]}`)
    },
  },
}
</script>

<style lang="less">
.layout-header {
  width: 100%;
  min-width: @--min-width;
  background-color: @--background-color-header;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  user-select: none;

  .iconfont {
    font-size: 20px;
  }

  .layout-header-content {
    height: 100%;
    margin: 0 auto;

    .el-row {
      height: 100%;
    }

    .el-col {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      height: 100%;
      overflow: hidden;
    }

    .navigation {
      color: @--color-text-secondary;
      justify-content: center;

      .navigation-menu {
        height: 100%;
        margin: 0 16px;
        line-height: @--header-height;
        cursor: pointer;
        position: relative;

        &:hover {
          color: @--color-white;
        }

        &.active {
          color: @--color-white;

          &::after {
            content: '';
            position: absolute;
            bottom: 4px;
            display: block;
            width: 100%;
            height: 2px;
            background-color: @--color-white;
            border-radius: 2px;
          }
        }
      }
    }

    .action {
      justify-content: flex-end;
      color: @--color-text-secondary;

      .icon-button {
        background-color: transparent;
        border: none;
        width: 40px;
        height: 100%;
        color: inherit;
        margin: 0;
        font-size: 16px;

        + .icon-button {
          margin-left: 8px;
        }

        &:hover {
          color: @--color-white;
        }
      }

      .dropdown-area {
        display: flex;
        align-items: center;
        color: @--color-text-secondary;
        margin-left: 16px;
        cursor: pointer;

        &:hover {
          color: @--color-white;
        }
      }

      .username {
        margin-left: 8px;
        width: 50px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }

    .title {
      color: @--color-white;
      font-size: 20px;
      line-height: @--header-height;
      cursor: pointer;
    }
  }
}
</style>
