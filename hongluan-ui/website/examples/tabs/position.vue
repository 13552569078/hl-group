<template>
  <hl-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
    <hl-radio label="top">top</hl-radio>
    <hl-radio label="right">right</hl-radio>
    <hl-radio label="bottom">bottom</hl-radio>
    <hl-radio label="left">left</hl-radio>
  </hl-radio-group>

  <hl-tabs :tab-position="tabPosition" type="button" style="height: 200px;">
    <hl-tab-pane label="谷歌浏览器">谷歌浏览器</hl-tab-pane>
    <hl-tab-pane label="火狐浏览器">火狐浏览器</hl-tab-pane>
    <hl-tab-pane label="欧朋浏览器">欧朋浏览器</hl-tab-pane>
  </hl-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tabPosition = ref('top')
</script>
