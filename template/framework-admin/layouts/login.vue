<template>
  <main v-img="{src: bg}" class="layout-login">
    <div class="login-form">
      <logo class="login-logo" />
      <nuxt></nuxt>
    </div>
    <div class="buttom-wrapper font-s text-center">
      <copyright></copyright>
    </div>
  </main>
</template>

<script>
import Logo from '@/components/logo.vue'
import Copyright from '@/components/copyright.vue'

export default {
  name: 'Login',
  components: {
    Copyright,
    Logo,
  },
  data() {
    return {
      bg: '//deepexi-moby.oss-cn-shenzhen.aliyuncs.com/login-bg.png',
    }
  },
  methods: {},
}
</script>
<style lang="less">
.layout-login {
  position: absolute;
  width: 100%;
  min-height: 100%;
  background-color: #f0f2f5;
  background-repeat: no-repeat;
  background-size: cover;

  &::before {
    content: '';
    display: block;
    width: 100%;
    padding-top: 10%;
  }

  .logo-login {
    width: 260px;
    vertical-align: middle;
  }

  .login-form {
    width: 450px;
    margin: 0 auto 100px;
    padding: 50px 0 20px;
    background: #fff;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);

    .login-logo {
      margin-bottom: 45px;

      svg {
        width: 48px;
        height: 48px;
      }
    }
  }

  .buttom-wrapper {
    width: 100%;
    position: absolute;
    bottom: 41px;

    .buttom-link {
      height: 17px;
      line-height: 17px;
      margin-bottom: 11px;

      a {
        color: rgba(255, 255, 255, 1);
      }

      .service-item {
        margin: 0 24px;
        cursor: pointer;
      }
    }

    .copyright {
      height: 17px;
      line-height: 17px;
      font-size: 12px;
      color: #606266;
    }
  }

  .main {
    width: 300px;
    margin: auto;
  }

  .el-form {
    width: 100%;
    margin: auto;
  }

  .el-button {
    width: 300px;
    margin: auto;
  }
}
</style>
