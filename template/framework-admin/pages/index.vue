<template>
  <section class="index">
    <nuxt-child></nuxt-child>
  </section>
</template>

<script>
export default {
  name: 'Index',
  layout: 'blank'
}
</script>

<style lang="less">
.index {
  position: relative;
  max-width: (@--min-width - 48px);
  height: calc(
    100vh - @--header-height - @--breadcrumb-height - @--footer-height
  );
}
</style>
