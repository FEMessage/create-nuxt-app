<template>
  <div class="cart">
    <van-checkbox-group v-model="checkedGoods" class="card-goods">
      <van-checkbox
        v-for="item in goods"
        :key="item.id"
        :name="item.id"
        class="card-goods__item"
      >
        <van-card
          :title="item.title"
          :desc="item.desc"
          :num="item.num"
          :price="formatPrice(item.price)"
          :thumb="item.thumb"
        />
      </van-checkbox>
    </van-checkbox-group>
    <van-submit-bar
      :price="totalPrice"
      :disabled="!checkedGoods.length"
      :button-text="submitBarText"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import {Checkbox, CheckboxGroup, Card, SubmitBar} from 'vant'

export default {
  layout: 'layout-with-footer',
  components: {
    'van-card': Card,
    'van-checkbox': Checkbox,
    'van-submit-bar': SubmitBar,
    'van-checkbox-group': CheckboxGroup
  },

  data() {
    return {
      checkedGoods: ['1', '2', '3'],
      goods: [
        {
          id: '1',
          title: '进口香蕉',
          desc: '约250g，2根',
          price: 200,
          num: 1,
          thumb:
            'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg'
        },
        {
          id: '2',
          title: '陕西蜜梨',
          desc: '约600g',
          price: 690,
          num: 1,
          thumb:
            'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg'
        },
        {
          id: '3',
          title: '美国伽力果',
          desc: '约680g/3个',
          price: 2680,
          num: 1,
          thumb:
            'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg'
        }
      ]
    }
  },

  computed: {
    submitBarText() {
      const count = this.checkedGoods.length
      return '结算' + (count ? `(${count})` : '')
    },

    totalPrice() {
      return this.goods.reduce(
        (total, item) =>
          total + (this.checkedGoods.indexOf(item.id) !== -1 ? item.price : 0),
        0
      )
    }
  },

  methods: {
    formatPrice(price) {
      return (price / 100).toFixed(2)
    },

    onSubmit() {
      this.$toast('点击结算')
    }
  }
}
</script>

<style lang="less">
.cart {
  .card-goods {
    background-color: #fff;

    &__item {
      position: relative;
      background-color: #fafafa;

      .van-checkbox__label {
        width: 100%;
        height: auto;
        padding: 0 20px 0 30px;
        box-sizing: border-box;
      }

      .van-checkbox__icon {
        top: 50%;
        left: 20px;
        z-index: 1;
        position: absolute;
        margin-top: -20px;
      }

      .van-card__price {
        color: #f44;
      }
    }
  }

  .van-submit-bar {
    bottom: 100px;
  }
}
</style>
