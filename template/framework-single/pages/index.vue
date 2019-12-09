<template>
  <div class="index">
    <v-img :src="$store.state.meta.homePageImg" class="home-img" alt="homeImg" :has-loading="false" />
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {},
}
</script>
<style lang="less">
.index {
  .home-img {
    width: 100%;
  }
}
</style>
