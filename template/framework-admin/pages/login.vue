<template>
  <div class="login">
    <!--样式在layout/login-->
    <div class="main">
      <el-form-renderer ref="form" :content="content" status-icon>
        <el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            round
            native-type="submit"
            @click="handleLogin"
            @submit.prevent
            >登录</el-button
          >
        </el-form-item>
      </el-form-renderer>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  layout: 'login',
  name: 'Login',
  head() {
    return {
      title: 'DEEPEXI ADMIN 登录',
    }
  },
  data() {
    return {
      loading: false,
      content: [
        {
          type: 'input',
          id: 'enterpriseId',
          el: {
            placeholder: '租户Id',
          },
          rules: [
            {
              type: 'string',
              trigger: 'blur',
              required: true,
              message: '请输入租户ID',
            },
          ],
        },
        {
          type: 'input',
          id: 'username',
          el: {
            placeholder: '用户名 / 邮箱',
          },
          rules: [
            {
              type: 'string',
              trigger: 'blur',
              required: true,
              message: '请输入账号',
            },
          ],
        },
        {
          type: 'input',
          id: 'password',
          el: {
            placeholder: '密码',
            type: 'password',
            'show-password': true,
          },
          rules: [
            {
              type: 'string',
              trigger: 'blur',
              required: true,
              message: '请输入密码',
            },
          ],
        },
      ],
    }
  },

  computed: {
    form() {
      return this.$refs.form
    },

    redirect() {
      return this.$route.query.redirect
    },
  },

  methods: {
    ...mapActions(['login']),
    handleLogin() {
      this.form.validate(async valid => {
        if (!valid) return

        const data = this.form.getFormValue()

        this.loading = true
        // TODO: login & get header menus
        try {
          await this.login({
            body: {
              channel: 'pc',
              ...data,
            },
            redirect: this.redirect,
          })
        } finally {
          this.loading = false
        }
      })
    },
  },
}
</script>

<style lang="less">
.login {
  .el-input__icon.el-input__validateIcon.el-icon-circle-check {
    color: @--color-success;
  }
}
</style>
