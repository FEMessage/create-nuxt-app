<template>
  <el-header class="breadcrumb-header" :height="BREADCRUMB_HEIGHT">
    <el-breadcrumb class="bread-crumb">
      <el-breadcrumb-item
        v-for="(item, index) of breads"
        :key="index"
        :to="item.to"
        >{{ item.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </el-header>
</template>

<script>
import {mapGetters} from 'vuex'
import {BREADCRUMB_HEIGHT} from '@/assets/export.less'

export default {
  name: 'BreadCrumb',
  data() {
    return {
      BREADCRUMB_HEIGHT,
    }
  },
  computed: {
    ...mapGetters('bread', ['breads']),
  },
  watch: {
    '$route.fullPath': {
      handler() {
        this.$store.dispatch('bread/generateBreadcrumb', this.$route)
      },
      immediate: true,
    },
  },
}
</script>

<style>
.breadcrumb-header {
  display: flex;
  align-items: center;
}
</style>
