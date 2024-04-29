<template>
  <hl-button class="m-r-md" @click="open">打开消息提示</hl-button>
</template>

<script lang="ts" setup>
import { HlMessage } from 'hongluan-ui'

const open = () => {
  HlMessage({
    message: '这是一条消息.',
    grouping: true,
    type: 'success',
    duration: 5000,
  })
}
</script>
