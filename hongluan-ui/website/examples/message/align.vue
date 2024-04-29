<template>
  <hl-button class="m-r-md" @click="openCenter('left')">居左对齐方式</hl-button>
  <hl-button class="m-r-md" @click="openCenter('center')">居中对齐方式</hl-button>
  <hl-button @click="openCenter('right')">居右对齐方式</hl-button>
</template>

<script lang="ts" setup>
import { HlMessage } from 'hongluan-ui'

const openCenter = align => {
  HlMessage({
    message: `文字对齐方式`,
    textAlign: align,
  })
}

</script>
