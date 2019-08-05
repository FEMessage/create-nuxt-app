<template>
  <div class="login"></div>
</template>

<script>
export default {
  layout: 'login',
  name: 'login',
  components: {},
  data() {
    return {
      loading: false,
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{required: true, message: '请输入账号', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}]
      }
    }
  },
  methods: {
    login() {
      this.$store
        .dispatch('login', this.form)
        .then(() => {
          this.loading = false
          this.$router.replace('/')
        })
        .catch(e => {
          // TODO 异常处理
          this.loading = false
          console.log(e)
        })
    }
  }
}
</script>
