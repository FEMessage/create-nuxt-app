<template>
  <div class="my">
    <v-img
      class="my-poster"
      src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png"
      width="100"
    />
    <van-cell-group class="user-group">
      <van-cell
        icon="records"
        title="全部订单"
        is-link
        @click="$router.push('/order-list')"
      />
    </van-cell-group>

    <van-cell-group>
      <van-cell icon="exchange" title="我的积分" is-link />
      <van-cell icon="gold-coin" title="我的优惠券" is-link />
      <van-cell icon="gift" title="我收到的礼物" is-link />
      <van-cell icon="user-circle-o" title="登录" @click="login" />
    </van-cell-group>
    <van-popup v-model="showLogin" position="bottom">
      <div class="login">
        <div class="title">用户登录</div>
        <van-field
          v-model="phone"
          class="login-input"
          placeholder="请输入手机号"
        ></van-field>
        <van-field
          v-model="password"
          class="login-input"
          type="password"
          placeholder="请输入密码"
        ></van-field>
        <p>
          <van-checkbox v-model="checked" style="justify-content: center;">
            <span class="gray">登录即表示同意</span>
            <span class="blue" @click.stop="showAgreement = true"
              >滴普科技服务协议</span
            >
          </van-checkbox>
        </p>
        <van-button
          :disabled="!checked"
          :loading="isLoading"
          type="primary"
          class="login-btn"
          @click="submit"
          >登 录</van-button
        >
      </div>
    </van-popup>

    <agreement :show="showAgreement" @close="showAgreement = false"></agreement>
  </div>
</template>

<script>
import Agreement from '@/components/agreement'
import {Checkbox} from '@femessage/vant'
import Vimg from '@femessage/v-img'

export default {
  layout: 'layout-with-footer',
  components: {
    'van-checkbox': Checkbox,
    agreement: Agreement,
    'v-img': Vimg,
  },
  data() {
    return {
      showLogin: false,
      phone: '',
      password: '',
      checked: false,
      isLoading: false,
      showAgreement: false,
    }
  },
  methods: {
    login() {
      this.showLogin = true
      this.phone = ''
      this.password = ''
    },
    submit() {
      this.showLogin = false
    },
  },
}
</script>

<style lang="less">
.my {
  &-poster {
    width: 100%;
    display: block;
  }

  &-group {
    margin-bottom: 30px;
  }

  &-links {
    padding: 30px 0;
    font-size: 24px;
    text-align: center;
    background-color: #fff;

    .van-icon {
      display: block;
      font-size: 48px;
    }
  }

  .login {
    padding: 20px;

    .title {
      margin-bottom: 40px;
    }
  }

  .login-btn {
    width: 100%;
    background: #6495fe;
    border: 2px solid #6495fe;
  }
}
</style>
