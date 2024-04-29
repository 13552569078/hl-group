<template>
  <hl-button class="m-r-md" @click="open1">消息</hl-button>
  <hl-button class="m-r-md" @click="open2">成功</hl-button>
  <hl-button class="m-r-md" @click="open3">警告</hl-button>
  <hl-button @click="open4">错误</hl-button>
</template>

<script lang="ts" setup>
import { HlMessage } from 'hongluan-ui'

const open1 = () => {
  HlMessage({
    showClose: true,
    message: '这是一条消息提示',
    duration: 300000,
  })
}

const open2 = () => {
  HlMessage({
    showClose: true,
    message: '恭喜你，这是一条成功消息',
    type: 'success',
  })
}

const open3 = () => {
  HlMessage({
    showClose: true,
    message: '警告哦，这是一条警告消息',
    type: 'warning',
  })
}

const open4 = () => {
  HlMessage({
    showClose: true,
    message: '错了哦，这是一条错误消息',
    type: 'error',
  })
}

</script>
