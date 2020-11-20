<template>
  <div class="login">
    <!--样式在layout/login-->
    <div class="main">
      <el-form-renderer ref="form" :content="formContent" status-icon>
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

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  Ref,
  ref,
} from '@nuxtjs/composition-api'
import {ElFormRendererType, FormContent} from '@femessage/el-form-renderer'

export default defineComponent({
  layout: 'login',
  name: 'Login',

  setup() {
    const formContent = useFormContent()
    const {loading, handleLogin} = useLogin()

    return {
      formContent,
      loading,
      handleLogin,
    }
  },

  head() {
    return {
      title: 'DEEPEXI ADMIN 登录',
    }
  },
})

function useFormContent(): Ref<FormContent> {
  return ref([
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
  ])
}

function useLogin() {
  const ctx = getCurrentInstance()!

  const loading = ref(false)
  const {redirect} = ctx.$route.query

  const handleLogin = () => {
    const form = ctx.$refs.form as ElFormRendererType

    form.validate(async valid => {
      if (!valid) return

      const data = form.getFormValue()

      loading.value = true

      // TODO: login & get header menus
      try {
        await ctx.$store.dispatch('login', {
          body: {
            channel: 'pc',
            ...data,
          },
          redirect,
        })
      } finally {
        loading.value = false
      }
    })
  }

  return {
    loading,
    handleLogin,
  }
}
</script>

<style lang="less">
.login {
  .el-input__icon.el-input__validateIcon.el-icon-circle-check {
    color: @--color-success;
  }
}
</style>

