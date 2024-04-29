<template>
  <hl-button plain @click="open">
    偏移的消息
  </hl-button>
</template>

<script lang="ts" setup>
import { HlNotification } from 'hongluan-ui'

const open = () => {
  HlNotification({
    title: '偏移',
    message: '这是一条带有偏移的提示消息',
    offset: 100,
  })
}
</script>
