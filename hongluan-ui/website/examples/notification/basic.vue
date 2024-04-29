<template>
  <hl-button plain class="m-r-md" @click="open1">
    可自动关闭
  </hl-button>
  <hl-button plain @click="open2">
    不会自动关闭
  </hl-button>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import { HlNotification } from 'hongluan-ui'

const open1 = () => {
  HlNotification({
    title: '标题名称',
    message: h(
      'p',
      { style: 'color: teal' },
      '在引入 Hongluan UI Library 时，可以传入一个全局配置对象。该对象目前支持 size 与 zIndex 字段。size 用于改变组件的默认尺寸，zIndex 设置弹框的初始 z-index（默认值：2000）',
    ),
  })
}

const open2 = () => {
  HlNotification({
    title: '提示',
    message: '这是一条不会自动关闭的消息',
    duration: 0,
  })
}

</script>
