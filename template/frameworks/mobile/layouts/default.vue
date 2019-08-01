<template>
  <div class="wrapper">
    <header-nav-bar></header-nav-bar>
    <nuxt></nuxt>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import HeaderNavBar from '@/components/header-nav-bar'

export default {
  components: {
    'header-nav-bar': HeaderNavBar
  },
  data() {
    return {}
  },
  methods: {},
  computed: {}
}
</script>

<style lang="less">
.wrapper {
  text-align: center;
}
</style>
