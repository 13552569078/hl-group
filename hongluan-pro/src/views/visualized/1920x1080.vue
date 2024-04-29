<template>
  <div id="amapContainer"></div>
  <page-header />
  <page-menu />
  <div class="mask-top"></div>
  <div class="mask-left"></div>
  <div class="mask-right"></div>
  <div class="mask-bottom"></div>
  <div class="page-left"></div>
  <div class="page-right"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import '@amap/amap-jsapi-types'
import PageHeader from './layout/page-header-sm.vue'
import PageMenu from './layout/page-menu-odd.vue'

export default defineComponent({
  components: {
    PageHeader,
    PageMenu,
  },
  setup() {
    onMounted(() => {
      AMapLoader.load({
        key: '40e1658ef47a5beb470456db202e5643', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      })
        .then((AMap) => {
          new AMap.Map('amapContainer', {
            zoom: 12,
            mapStyle: 'amap://styles/darkblue', //设置地图的显示样式
          })
        })
        .catch((e) => {
          console.log(e)
        })
    })
  },
})
</script>
<style lang="scss" scoped>
#amapContainer {
  width: 100vw;
  height: 100vh;
  position: fixed;
}
</style>

