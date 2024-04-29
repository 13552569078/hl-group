<template>
  <hl-button type="link" @click="open">点击打开 Message Box</hl-button>
</template>

<script lang="ts" setup>
import { HlMessageBox, HlMessage } from 'hongluan-ui'

const open = () => {
  HlMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消',
    type: 'success',
  })
    .then(() => {
      HlMessage({
        type: 'success',
        message: '删除成功!',
      })
    })
    .catch(() => {
      HlMessage({
        type: 'info',
        message: '已取消删除',
      })
    })
}

</script>
