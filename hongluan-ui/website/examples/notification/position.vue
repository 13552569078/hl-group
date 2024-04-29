<template>
  <hl-button plain class="m-r-md" @click="open1">
    右上角
  </hl-button>
  <hl-button plain class="m-r-md" @click="open2">
    右下角
  </hl-button>
  <hl-button plain class="m-r-md" @click="open3">
    左下角
  </hl-button>
  <hl-button plain @click="open4">
    左上角
  </hl-button>
</template>

<script lang="ts" setup>
import { HlNotification } from 'hongluan-ui'

const open1 = () => {
  HlNotification({
    title: '自定义位置',
    message: '右上角弹出的消息',
  })
}

const open2 = () => {
  HlNotification({
    title: '自定义位置',
    message: '右下角弹出的消息',
    position: 'bottom-right',
  })
}

const open3 = () => {
  HlNotification({
    title: '自定义位置',
    message: '左下角弹出的消息',
    position: 'bottom-left',
  })
}

const open4 = () => {
  HlNotification({
    title: '自定义位置',
    message: '左上角弹出的消息',
    position: 'top-left',
  })
}

</script>
