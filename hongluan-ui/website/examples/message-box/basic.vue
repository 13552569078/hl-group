<template>
  <hl-button type="link" @click="open">点击打开 Message Box</hl-button>
</template>

<script lang="ts" setup>
import { HlMessageBox, HlMessage } from 'hongluan-ui'

const open = () => {
  HlMessageBox.alert('这是一段内容', '标题名称', {
    confirmButtonText: '确定',
    callback: action => {
      HlMessage({
        type: 'info',
        message: `action: ${action}`,
      })
    },
  })
}
</script>
