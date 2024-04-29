<template>
  <hl-button plain class="m-r-md" @click="open1">成功</hl-button>
  <hl-button plain class="m-r-md" @click="open2">警告</hl-button>
  <hl-button plain class="m-r-md" @click="open3">消息</hl-button>
  <hl-button plain class="m-r-md" @click="open4">错误</hl-button>
  <hl-button plain @click="open5">自定义</hl-button>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import { HlNotification, HlIcon } from 'hongluan-ui'
import { TwoAirplay } from '@hongluan-ui/icons'

const open1 = () => {
  HlNotification({
    title: '成功',
    message: '这是一条成功的提示消息',
    type: 'success',
    duration: 0,
  })
}

const open2 = () => {
  HlNotification({
    title: '警告',
    message: '这是一条警告的提示消息',
    type: 'warning',
  })
}

const open3 = () => {
  HlNotification.info({
    title: '消息',
    message: '这是一条消息的提示消息',
  })
}

const open4 = () => {
  HlNotification.error({
    title: '错误',
    message: '这是一条错误的提示消息',
  })
}

const open5 = () => {
  HlNotification({
    title: '自定义Icon',
    message: '这是一条自定义的提示消息',
    icon: h(HlIcon, {
      size: 'xl',
    }, {
      default: () => [h(TwoAirplay)],
    }),
  })
}
</script>
