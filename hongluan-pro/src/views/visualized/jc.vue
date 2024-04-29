<template>
  <div id="amapContainer"></div>
  <page-header />
  <div class="mask-top"></div>
  <div class="mask-left"></div>
  <div class="mask-right"></div>
  <div class="mask-bottom"></div>
  <hl-group dir="vertical" gap="var(--md)" class="page-left">
    <panel-1 />
    <panel-2 />
  </hl-group>
  <hl-group dir="vertical" gap="var(--md)" class="page-right">
    <panel-15 />
  </hl-group>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import '@amap/amap-jsapi-types'
import PageHeader from './layout/page-header-sm.vue'
import Panel1 from './test/panel-1.vue'
import Panel2 from './test/panel-2.vue'
import Panel3 from './test/panel-3.vue'
import Panel4 from './test/panel-4.vue'
import Panel5 from './test/panel-5.vue'
import Panel6 from './test/panel-6.vue'
import Panel7 from './test/panel-7.vue'
import Panel8 from './test/panel-8.vue'
import Panel9 from './test/panel-9.vue'
import Panel10 from './test/panel-10.vue'
import Panel11 from './test/panel-11.vue'
import Panel12 from './test/panel-12.vue'
import Panel13 from './test/panel-13.vue'
import Panel14 from './test/panel-14.vue'
import Panel15 from './test/panel-15.vue'

export default defineComponent({
  components: {
    PageHeader,
    Panel1,
    Panel2,
    Panel3,
    Panel4,
    Panel5,
    Panel6,
    Panel7,
    Panel8,
    Panel9,
    Panel10,
    Panel11,
    Panel12,
    Panel13,
    Panel14,
    Panel15,
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

.page-left,
.page-right {
  width: calc(var(--xxs) * 114);
}
</style>

