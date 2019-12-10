<template>
  <div class="order-list">
    <data-list ref="dataList" :url="url">
      <ul slot-scope="props">
        <li v-for="(item, index) in props.list" :key="index" class="order">
          <v-img :src="item.productPhoto" />
          <span class="title">{{ item.name }}</span>
          <span>{{ (item.sellCount * item.sellPrice) | price }}</span>
        </li>
      </ul>
    </data-list>
  </div>
</template>
<script>
import DataList from '@femessage/data-list'

export default {
  layout: 'layout-with-footer',
  components: {
    DataList,
  },
  data() {
    return {
      url:
        'https://easy-mock.com/mock/5c63e5758d3685565177d822/optimus-mobile/list',
    }
  },
}
</script>
<style lang="less">
.order-list {
  .order {
    display: flex;
    height: 100px;
    line-height: 100px;
    margin: 0 20px;
    justify-content: space-between;

    img {
      height: 80px;
      margin-right: 20px;
    }
  }
}
</style>
