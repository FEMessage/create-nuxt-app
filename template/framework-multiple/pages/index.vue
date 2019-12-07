<template>
  <div class="index">
    <v-img :src="$store.state.meta.homePageImg" class="home-img" alt="homeImg" width="100" />
  </div>
</template>

<style lang="less">
.index {
  .home-img {
    // width: 100%;
    display: block;
    max-width: 100%;
    max-height: calc(100vh - 120px);
    margin: 0 auto;
  }
}
</style>
