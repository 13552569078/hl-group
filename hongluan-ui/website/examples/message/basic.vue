<template>
  <hl-button class="m-r-md" @click="open">打开消息提示</hl-button>
  <hl-button @click="openVn">VNode</hl-button>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import { HlMessage } from 'hongluan-ui'

const open = () => {
  HlMessage('只是一条消息提示')
}
const openVn = () => {
  HlMessage({
    message: h('p', null, [
      h('span', null, '内容可以是 '),
      h('i', { style: 'color: teal' }, 'VNode'),
    ]),
  })
}

</script>
