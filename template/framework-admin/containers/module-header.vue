<template>
  <header class="module-header">
    <div class="logo-wrapper">
      <v-img :has-loading="false" :src="image" width="144"></v-img>
    </div>
    <div class="header-info">
      <h3 class="title">{{ title }}</h3>
      <p class="desc">{{ desc }}</p>
    </div>
    <el-row class="header-search" type="flex">
      <el-col :span="6" class="count">
        <slot name="count"></slot>
      </el-col>
      <el-col :span="18" class="form">
        <slot name="form"></slot>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },

    desc: {
      type: String,
      default: '',
    },

    image: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="less">
@margin-gap: 150px;

.module-header {
  width: 100%;
  height: 168px;
  margin-bottom: 24px;
  overflow: hidden;
  color: @--color-white;

  .logo-wrapper {
    width: 144px;
    height: 100%;
    margin-right: -100%;
    float: left;
    display: flex;
    align-items: center;
  }

  .header-info {
    box-sizing: border-box;
    padding: 0 @margin-gap 0 0;
    width: 100%;
    height: 120px;
    margin-left: @margin-gap;
    float: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 1.8;

    .desc {
      width: 100%;
      color: @--color-text-placeholder;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
    }
  }

  .header-search {
    box-sizing: border-box;
    padding: 0 @margin-gap 0 0;
    height: 48px;
    width: 100%;
    margin-left: @margin-gap;
    float: left;

    .count {
      color: @--color-text-primary;
      font-size: 12px;
      line-height: 48px;
      font-weight: bold;
    }

    .form {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .el-form-item {
        margin: 0;

        & + .el-form-item {
          margin-left: 10px;
        }

        .el-input__inner {
          border-radius: 36px;
        }
      }
    }
  }
}
</style>
