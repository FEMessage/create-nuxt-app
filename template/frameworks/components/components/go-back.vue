<template>
  <nuxt-link
    v-if="to"
    :to="to"
  >
    <el-button
      :type="btnType"
      :size="size"
      icon="el-icon-arrow-left"
    >
      {{ btnText }}
    </el-button>
  </nuxt-link>
  <el-button
    v-else
    :type="btnType"
    :size="size"
    @click="defaultBack"
    icon="el-icon-arrow-left"
  >{{ btnText }}</el-button>
</template>

<script>
export default {
  name: 'go-back',

  props: {
    /**
     * @property {enum} ['primary', 'success', 'warning', 'danger', 'info', 'text']
     */
    btnType: {
      type: String,
      default: 'text'
    },

    btnText: {
      type: String,
      default: '返回'
    },

    /**
     * @property {enum} ['medium', 'small', 'mini']
     */
    size: {
      type: String,
      default: 'medium'
    },

    onClick: {
      type: Function
    },

    /**
     * nuxt-link 的 to 属性
     * 当 to 有值时, 将使用 nuxt-link 进行跳转
     * 在router mode 为 hash 的情况下, 在 beforeRouteLeave 中使用 element-ui MessageBox.confirm 进行提示时, 会用得到此参数
     */
    to: {
      type: String,
      default: ''
    }
  },

  methods: {
    defaultBack() {
      if (this.handleBack) {
        this.handleBack()
        return
      }
      this.$router.back()
    }
  }
}
</script>
