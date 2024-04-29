<template>
  <hl-button plain @click="open">
    使用 HTML 片段
  </hl-button>
</template>

<script lang="ts" setup>
import { HlNotification } from 'hongluan-ui'

const open = () => {
  HlNotification({
    title: 'HTML 片段',
    dangerouslyUseHTMLString: true,
    message: '<strong>这是 <i>HTML</i> 片段</strong>',
  })
}
</script>
