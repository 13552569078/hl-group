<template>
  <hl-row gap="var(--md)">
    <hl-col span="md:col-12">
      <p>默认</p>
      <hl-thumb
        :src="src"
        style="width: 100%; height:200px;"
        fit="cover"
      />
    </hl-col>
    <hl-col span="md:col-12">
      <p>自定义</p>
      <hl-thumb :src="src" style="width: 100%; height:200px;" fit="cover">
        <template #placeholder>
          加载中...
        </template>
      </hl-thumb>
    </hl-col>
  </hl-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const src = ref('https://pimg.39.net/yaopin/zycimg/11hxcu4pth3wu2019.jpg')
</script>
