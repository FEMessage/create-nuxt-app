<template>
  <i :class="`${iconClass} ${icon}`"></i>
</template>

<script>
export default {
  name: 'IconFont',
  props: {
    icon: {
      type: String
    }
  },
  computed: {
    iconClass() {
      return this.icon.startsWith('fa') ? 'fa' : 'iconfont'
    }
  }
}
</script>
<style></style>