<template>
  <section class="index">
    <section class="left">
      <nuxt-child></nuxt-child>
    </section>
    <section class="right">
      <v-img
        :has-loading="false"
        class="top"
        width="300"
        src="//deepexi.oss-cn-shenzhen.aliyuncs.com/deepexi-services/iam/img_index_banner%402x.png"
      />
      <section v-if="hcArticles.length" class="bottom container">
        <div class="title">
          <h3 style="font-size: 16px;">开发文档</h3>
          <router-link :to="helpPath" style="font-size: 12px;"
            >查看更多 →</router-link
          >
        </div>
        <ul class="doc-list">
          <li
            v-for="a in hcArticles"
            :key="a.id"
            class="doc-item"
            @click="$router.push(`${helpPath}/?id=1_${a.id}`)"
          >
            <icon-font prefix="iconfont" icon="icon_version"></icon-font>
            <span>{{ a.title }}</span>
          </li>
        </ul>
      </section>
    </section>
  </section>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'Index',
  layout: 'blank',

  computed: {
    ...mapState(['hcArticles', 'headerMenu']),
    helpPath() {
      const helpUrlData = this.headerMenu.find(menu => menu.code === 'help')
      if (helpUrlData) {
        return helpUrlData.pathUrl
      }
      return '/help'
    },
  },
  async created() {
    this.getHCArticles()
  },
  methods: {
    ...mapActions(['getHCArticles']),
  },
}
</script>
<style lang="less">
.index {
  max-width: (@--min-width - 48px);
  height: calc(100vh - @--header-height - @--footer-height - 24px);
  margin: 24px auto 0;
  display: flex;
  justify-content: space-between;
  position: relative;

  .left,
  .right {
    height: 100%;
  }

  .left {
    flex: 1 0 880px;
    margin-right: 16px;
  }

  .right {
    flex: 1 0 320px;

    .top {
      width: 100%;
      margin-bottom: 16px;
    }

    .bottom {
      width: 100%;
      height: 268px;

      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }
    }
  }

  .doc-list {
    height: 100%;
    list-style: none;
    font-size: 12px;
    color: @--color-text-regular;
    overflow: hidden;

    .doc-item > * {
      vertical-align: middle;
      line-height: 2.4;
    }

    .doc-item {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }

    .iconfont {
      font-size: 14px;
      color: @--color-text-placeholder;
    }
  }

  .container {
    background-color: @--color-white;
    border-radius: 8px;
    box-shadow: 0 0 15px 0 rgba(45, 48, 59, 0.03);
    box-sizing: border-box;
    padding: 20px;
    overflow: hidden;
  }
}
</style>
