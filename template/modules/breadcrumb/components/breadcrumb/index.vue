<template>
  <el-header class="breadcrumb-header">
    <el-breadcrumb class="bread-crumb">
      <el-breadcrumb-item v-for="(item, index) of breads" :key="index" :to="item.to">{{ item.name }}</el-breadcrumb-item>
    </el-breadcrumb>
  </el-header>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'BreadCrumb',
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
