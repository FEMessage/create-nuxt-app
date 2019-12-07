<template>
  <div class="index">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <v-img :src="image" class="banner" />
      </van-swipe-item>
    </van-swipe>
    <van-row class="goods">
      <van-cell title="热销商品" icon="fire-o" />
      <van-row>
        <van-col v-for="(good, index) in goods" :key="index" span="12">
          <div class="block" @click="goDetail(good)">
            <v-img :src="good.img" class="good-img" />
            <p class="name">{{ good.name }}</p>
            <p class="price">{{ good.price | price }}</p>
          </div>
        </van-col>
      </van-row>
    </van-row>
  </div>
</template>

<script>
import {Swipe, SwipeItem} from '@femessage/vant'

export default {
  layout: 'layout-with-footer',
  components: {
    'van-swipe': Swipe,
    'van-swipe-item': SwipeItem,
  },
  data() {
    return {
      images: ['https://img.yzcdn.cn/2.jpg', 'https://img.yzcdn.cn/2.jpg'],
      goods: [
        {
          id: '001',
          name: '进口香蕉',
          price: '2',
          img:
            'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg',
        },
        {
          id: '002',
          name: '陕西蜜梨',
          price: '6.9',
          img:
            'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg',
        },
        {
          id: '003',
          name: '美国伽力果',
          price: '26.8',
          img:
            'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg',
        },
        {
          id: '004',
          name: '智利进口车厘子精选',
          price: '388',
          img:
            '//img11.360buyimg.com/n7/jfs/t23839/6/2329458134/547797/e0c3ca7d/5b7cb504Ne746d2e6.jpg',
        },
        {
          id: '005',
          name: '番石榴红心 红心芭乐',
          price: '29.8',
          img:
            '//img12.360buyimg.com/n7/jfs/t26923/229/2278521880/129730/fb691af5/5bfea71aN28106a4b.jpg',
        },
        {
          id: '006',
          name: '云南哀牢山冰糖橙',
          price: '52.9',
          img:
            '//img11.360buyimg.com/n7/jfs/t26266/170/2255460292/191195/143b9753/5bfcfcacNfbb9cfd6.jpg',
        },
      ],
    }
  },
  methods: {
    goDetail(v) {
      this.$router.push({
        path: '/goods-detail',
        query: {
          id: v.id,
        },
      })
    },
  },
}
</script>

<style lang="less">
.index {
  .van-swipe {
    height: 400px;

    .banner {
      max-height: 100%;
      width: 100%;
    }
  }

  .goods {
    .van-row {
      padding: 10px;
    }

    .block {
      margin: 10px;
      box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      font-size: 28px;
    }

    .price {
      color: red;
    }

    .name,
    .price {
      margin: 0;
      margin-left: 20px;
    }

    .good-img {
      max-width: 100%;
    }
  }
}
</style>
