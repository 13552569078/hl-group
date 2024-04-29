<template>
  <hl-tabs v-model="activeName" type="line" @tab-click="handleClick">
    <hl-tab-pane label="谷歌浏览器" name="first">谷歌浏览器</hl-tab-pane>
    <hl-tab-pane label="火狐浏览器" name="second">火狐浏览器</hl-tab-pane>
    <hl-tab-pane label="欧朋浏览器" name="third">欧朋浏览器</hl-tab-pane>
  </hl-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeName = ref('first')
const handleClick = (tab, event) => {
  console.log(tab, event)
}

</script>
