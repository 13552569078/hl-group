<template>
  <hl-carousel
    class="hl-carousel-indicator-inside"
    height="400px"
    width="100%"
    indicator-type="custom"
    trigger="click"
    :autoplay="false"
    :initial-index="1"
    @change="change"
    @mouseenter.stop="carouselDisplay = true"
    @mouseleave.stop="carouselDisplay = false"
  >
    <hl-carousel-item v-for="item in imageData" :key="item">
      <hl-thumb
        style="width: 100%; height: 100%"
        :src="item.url"
        fit="cover"
      />
    </hl-carousel-item>
    <template #indicator>
      <hl-group
        full="full-x"
        :class="{'active':carouselDisplay}"
      >
        <hl-carousel-indicator v-for="(item,index) in imageData" :key="item" :index="index">
          <hl-thumb
            style="width: 100px; height: 100px"
            :src="item.url"
            fit="cover"
          />
        </hl-carousel-indicator>
      </hl-group>
    </template>
  </hl-carousel>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const imageData = ref([
  {
    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg6.ddove.com%2Fupload%2F20160620%2F130253841615.jpg&refer=http%3A%2F%2Fimg6.ddove.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615016975&t=fe2adfe3cd3c67dbc5ea1652a98e9cfc',
  },
  {
    url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201306%2F10%2F192621gvktnkenhheenken.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615016975&t=758616c811511445b7c63570a47ecbfb',
  },
  {
    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201404%2F12%2F121109atlt9fz05lr05e5q.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615016975&t=6ce4f8edde1507a463a3df0603accdf8',
  },
])
const carouselDisplay = ref(false)
</script>
