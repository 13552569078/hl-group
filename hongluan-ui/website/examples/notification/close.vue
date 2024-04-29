<template>
  <hl-button plain @click="open">
    隐藏关闭按钮
  </hl-button>
</template>

<script lang="ts" setup>
import { HlNotification } from 'hongluan-ui'

const open = () => {
  HlNotification.success({
    title: 'Info',
    message: '这是一条没有关闭按钮的消息',
    showClose: false,
  })
}

</script>
