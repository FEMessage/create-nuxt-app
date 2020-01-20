<template>
  <section class="module-layout">
    <section class="module-container">
      <slot></slot>
    </section>
  </section>
</template>

<style lang="less">
.module-layout {
  position: relative;
  width: 100%;
  background-image: linear-gradient(
    to bottom,
    @--background-color-header,
    @--background-color-header 120px,
    @--color-white 120px,
    @--color-white 168px,
    transparent 168px,
    transparent 100%
  );

  .module-container {
    width: (@--min-width - 48px);
    margin: 0 auto;

    .el-pagination {
      float: right;
      margin-top: 10px;

      .btn-prev,
      .btn-next,
      .el-pager > li {
        background-color: transparent;
      }

      .el-pager > li.active {
        background-color: @--color-primary;
        color: @--color-white;
        border-radius: 4px;
      }
    }
  }
}
</style>
