<template>
  <div class="goods-detail">
    <van-swipe class="swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in goods.thumb" :key="thumb">
        <img :src="thumb" />
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="title">{{ goods.title }}</div>
        <div class="price">{{ goods.price | price }}</div>
      </van-cell>
      <van-cell class="express">
        <van-col span="10">运费：{{ goods.express }}</van-col>
        <van-col span="14">剩余：{{ goods.remain }}</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="cell-group">
      <van-cell value="进入店铺" icon="shop" is-link @click="sorry">
        <template slot="title">
          <span class="van-cell-text">有赞的店</span>
          <van-tag class="tag" type="danger">官方</van-tag>
        </template>
      </van-cell>
      <van-cell title="线下门店" icon="location" is-link @click="sorry" />
    </van-cell-group>

    <van-cell-group class="cell-group">
      <van-cell title="查看商品详情" is-link @click="sorry" />
    </van-cell-group>

    <van-goods-action>
      <van-goods-action-icon icon="chat" @click="sorry">
        客服
      </van-goods-action-icon>
      <van-goods-action-icon icon="cart" @click="onClickCart">
        购物车
      </van-goods-action-icon>
      <van-goods-action-button type="warning" @click="sorry">
        加入购物车
      </van-goods-action-button>
      <van-goods-action-button type="danger" @click="sorry">
        立即购买
      </van-goods-action-button>
    </van-goods-action>
  </div>
</template>

<script>
import {
  Tag,
  Swipe,
  SwipeItem,
  GoodsAction,
  GoodsActionButton,
  GoodsActionIcon
} from 'vant'

export default {
  components: {
    'van-tag': Tag,
    'van-swipe': Swipe,
    'van-swipe-item': SwipeItem,
    'van-goods-action': GoodsAction,
    'van-goods-action-button': GoodsActionButton,
    'van-goods-action-icon': GoodsActionIcon
  },

  data() {
    return {
      goods: {
        title: '美国伽力果（约680g/3个）',
        price: 26.8,
        express: '免运费',
        remain: 19,
        thumb: [
          'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
          'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg'
        ]
      }
    }
  },

  methods: {
    onClickCart() {
      this.$router.push('cart')
    },

    sorry() {
      this.$toast('暂无后续逻辑~')
    }
  }
}
</script>

<style lang="less">
.goods-detail {
  .swipe {
    img {
      width: 100%;
      display: block;
    }
  }

  .title {
    font-size: 16px;
  }

  .price {
    color: #f44;
  }

  .express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }

  .cell-group {
    margin: 15px 0;

    .van-cell__value {
      color: #999;
    }
  }

  .tag {
    margin-left: 5px;
  }
}
</style>
