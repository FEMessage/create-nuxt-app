<template>
  <el-container class="help-center">
    <el-header class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="(breadcrumb, index) in breadcrumbs"
          :key="index + 1"
          >{{ breadcrumb.name }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </el-header>
    <el-scrollbar>
      <el-container v-loading="loading" class="content">
        <el-aside width="320px" class="document-sidebar">
          <el-menu
            :default-active="activeMenu"
            unique-opened
            @select="handSelect"
          >
            <document-menu-list :list="menuList" />
          </el-menu>
        </el-aside>
        <el-main
          v-loading="articleLoading"
          id="documentContent"
          class="document-content"
        >
          <!-- 文章内容 -->
          <div v-if="hasArticle">
            <div class="text-title">{{ articleTitle }}</div>
            <div class="update-instructions">
              <span>更新时间</span>
              <span>{{ updateDate | formatDate }}</span>
              <!--<span>{{ updateUser }}</span>-->
            </div>
          </div>
          <el-col class="details-content">
            <document-content
              v-if="true"
              :menu-class="`content-menu`"
              :offset-top="100"
              :fixed-height="10"
              :content="article"
              target="#documentContent"
              @on-scroll="handleDocumentScroll"
            />
          </el-col>
        </el-main>
      </el-container>
    </el-scrollbar>
  </el-container>
</template>

<script>
import {getHCMenus, getHCArticle} from '@/services'
import DocumentMenuList from '@/containers/document-menu-list/index.vue'
import DocumentContent from '@/containers/document-content'

const HELP = {
  name: '帮助中心',
}

const NO_DATA = '暂无数据'

export default {
  layout: 'blank',
  components: {
    DocumentMenuList,
    DocumentContent,
  },
  data() {
    return {
      loading: false,
      articleLoading: false,
      menuList: [],
      active: [],
      breadcrumbs: [],
      menuMap: new Map(),
      article: '',
      hasArticle: false,
      articleTitle: '',
      updateDate: '',
      updateUser: '',
      scrollY: 0,
    }
  },
  computed: {
    activeMenu() {
      let active = this.active.slice(this.active.length - 1).toString()
      return active
    },
  },
  async created() {
    this.loading = true
    let menuUniqueId = this.$route.query.id
    let resourceId = menuUniqueId && menuUniqueId.split('_')[1]
    try {
      const menuTitleData = await getHCMenus()
      this.menuList = this.addUniqueId(menuTitleData.payload)
      this.menuMap = this.createMenuMap(this.menuList)
      if (!resourceId) {
        const firstMenu = this.getFirstActiveMenu(this.menuList)
        resourceId = firstMenu && firstMenu.id
        menuUniqueId = firstMenu && firstMenu.uniqueId
      }
      this.getArticle(resourceId)
      this.handleOpenMenu(menuUniqueId)
      this.setBreadcrumb(menuUniqueId)
    } finally {
      this.loading = false
    }
  },
  methods: {
    handleOpenMenu(resourceId) {
      if (resourceId) {
        this.active.push(resourceId)
      } else if (this.menuList.length) {
        const [menu] = this.menuList
        this.active = [menu.id]
        menu.children &&
          menu.children.length &&
          this.active.push(menu.children[0].id)
      }
    },
    handSelect(key, keyPath) {
      // console.log(keyPath)
      const breadcrumbs = keyPath.map(key => this.menuMap.get(key))
      this.breadcrumbs = [HELP].concat(breadcrumbs)
      this.$router.replace({
        path: this.$route.path,
        query: {
          id: key,
        },
      })
      this.getArticle(key.split('_')[1])
    },

    getArticle(id) {
      this.articleLoading = true
      getHCArticle(id)
        .then(res => {
          let resData = res.payload
          if (resData == null) {
            this.article = NO_DATA
            this.hasArticle = false
          } else {
            this.hasArticle = true
            this.articleTitle = resData.title
            this.updateDate = +resData.updatedTime
            this.updateUser = resData.updatedBy
            this.article =
              resData.content == null
                ? NO_DATA
                : decodeURIComponent(resData.content)
          }
        })
        .finally(() => {
          this.articleLoading = false
        })
    },
    /**
     * 侧边栏菜单增加uniqueId 规则:type_id
     * 原因是侧边栏分类和文章id在不同的表，会出现id冲突
     */
    addUniqueId(data = []) {
      return data.reduce((sum, item) => {
        const v = {...item}
        v.uniqueId = `${+v.article}_${v.id}`
        if (v.children && v.children.length > 0) {
          v.children = this.addUniqueId(v.children)
        }
        return sum.concat(v)
      }, [])
    },

    createMenuMap(menu, map = new Map()) {
      menu.forEach(item => {
        map.set(item.uniqueId, item)
        item.children &&
          item.children.length &&
          this.createMenuMap(item.children, map)
      })
      return map
    },

    setBreadcrumb(resourceId) {
      let result = []
      let [pre, id] = resourceId.split('_')
      // 通过sourceId获取面包屑路径[uniqueId]
      const getChain = (pre, targetId) => {
        return this.menuMap.get(`${pre}_${targetId}`)
      }
      for (let i = +pre; i >= 0; i--) {
        const data = getChain(i, id)
        id = data.parentId
        result.unshift(data)
      }
      this.breadcrumbs = [HELP].concat(result)
    },
    getFirstActiveMenu(list) {
      const data = list[0]
      if (!data) {
        return {}
      }
      if (data.article) {
        return data
      } else {
        return this.getFirstActiveMenu(data.children)
      }
    },
    handleDocumentScroll(y) {
      this.scrollY = y
    },
  },
}
</script>

<style lang="less">
.help-center {
  height: calc(100vh - @--header-height - @--footer-height - 24px);
  background: @--color-white;

  .breadcrumb {
    border-bottom: solid 1px #e6e6e6;

    .el-breadcrumb {
      position: relative;
      font-size: 16px;
      padding-left: 80px;
      width: 100%;
      height: 56px;
      line-height: 56px;
      background: @--color-white;
      z-index: 1;

      .el-breadcrumb__item {
        .el-breadcrumb__inner {
          color: @--color-black;
        }

        &:last-child {
          .el-breadcrumb__inner {
            color: @--color-primary;
          }
        }

        &:first-child {
          .el-breadcrumb__inner {
            color: @--color-black;
          }
        }
      }
    }
  }

  .el-menu {
    height: 100%;

    .el-submenu .el-menu-item {
      height: 28px;
      line-height: 28px;
    }
  }

  .document-content {
    background-color: @--color-white;
    padding: 0 0 0 48px;

    .text-title {
      font-size: 30px;
      padding: 20px 20px 15px 0;
      font-weight: 600;
      color: @--color-black;
    }

    .update-instructions {
      font-size: 14px;
      color: #999;
      padding-bottom: 15px;

      span {
        margin-right: 5px;
      }
    }

    .details-content {
      padding: 20px 20px 20px 0;

      .set-content {
        word-wrap: break-word;
        word-break: break-all;
      }

      img {
        max-width: 100%;
      }
    }
  }
}
</style>
