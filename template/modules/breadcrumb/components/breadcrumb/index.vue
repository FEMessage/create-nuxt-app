<template>
  <el-breadcrumb class="bread-crumb">
    <el-breadcrumb-item
      v-for="(item, index) of breadcrumb"
      :key="index"
      :to="item.to"
      >{{ item.name }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'BreadCrumb',
  computed: {
    ...mapGetters('breadcrumb', ['list']),
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
