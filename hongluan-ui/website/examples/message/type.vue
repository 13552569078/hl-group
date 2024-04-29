<template>
  <hl-button class="m-r-md" @click="open1">成功</hl-button>
  <hl-button class="m-r-md" @click="open2">警告</hl-button>
  <hl-button class="m-r-md" @click="open3">消息</hl-button>
  <hl-button class="m-r-md" @click="open4">错误</hl-button>
  <hl-button @click="open5">自定义icon</hl-button>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import { HlMessage, HlIcon } from 'hongluan-ui'
import { TwoAirplay } from '@hongluan-ui/icons'

const open1 = () => {
  HlMessage({
    type: 'success',
    duration: 5000,
    showClose: true,
    message: '恭喜你，这是一条成功消息',
  })
}
const open2 = () => {
  HlMessage.warning({
    message: '警告哦，这是一条警告消息',
  })
}
const open3 = () => {
  HlMessage('这是一条消息提示')
}
const open4 = () => {
  HlMessage.error('错了哦，这是一条错误消息')
}
const open5 = () => {
  HlMessage({
    duration: 5000,
    icon: h(HlIcon, {
      size: 'xl',
    }, {
      default: () => [h(TwoAirplay)],
    }),
    message: '自定义，这是一条自定义消息',
  })
}

</script>
