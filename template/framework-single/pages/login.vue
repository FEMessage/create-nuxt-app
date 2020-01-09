<template>
  <div class="login">
    <!--样式在layout/login-->
    <div class="main">
      <el-form
        ref="loginForm"
        :model="form"
        :rules="rules"
        status-icon
        class=""
      >
        <el-form-item label="" prop="username">
          <el-input v-model.trim="form.username" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input
            v-model.trim="form.password"
            placeholder="密码"
            type="password"
            auto-complete="off"
            @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            size="medium"
            @click="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <!--<div style="text-align: right">-->
      <!--<nuxt-link to="/register">未有账号，直接注册</nuxt-link>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
export default {
  layout: 'login',
  name: 'Login',
  components: {},
  data() {
    return {
      loading: false,
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [{required: true, message: '请输入账号', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
      },
    }
  },

  computed: {
    redirect() {
      return this.$route.query.redirect || '/' 
    }
  },

  methods: {
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true

          this.$store
            .dispatch('login', this.form)
            .then(() => {
              this.loading = false
              this.$router.replace(this.redirect)
            })
            .catch(e => {
              // TODO 异常处理
              this.loading = false
              console.error(e)
            })
        } else {
          return false
        }
      })
    },
  },
}
</script>
