<template>
  <hl-button type="link" @click="open">点击打开 Message Box</hl-button>
</template>

<script lang="ts" setup>
import { HlMessageBox, HlMessage } from 'hongluan-ui'

const open = () => {
  HlMessageBox.confirm(
    '检测到未保存的内容，是否在离开页面前保存修改？',
    '确认信息',
    {
      distinguishCancelAndClose: true,
      confirmButtonText: '保存',
      cancelButtonText: '放弃修改',
    },
  )
    .then(() => {
      HlMessage({
        type: 'info',
        message: '保存修改',
      })
    })
    .catch(action => {
      HlMessage({
        type: 'info',
        message:
          action === 'cancel' ? '放弃保存并离开页面' : '停留在当前页面',
      })
    })
}
</script>
