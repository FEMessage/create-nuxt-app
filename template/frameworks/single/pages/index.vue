<template>
  <div class="index">
    <img :src="$store.state.meta.homePageImg" class="home-img" alt="homeImg" />
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>
<style lang="less">
.index {
  .home-img {
    width: 100%;
  }
}
</style>
