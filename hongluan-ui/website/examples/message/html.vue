<template>
  <hl-button @click="openHTML">使用 HTML 片段</hl-button>
</template>

<script lang="ts" setup>
import { HlMessage } from 'hongluan-ui'

const openHTML = () => {
  HlMessage({
    dangerouslyUseHTMLString: true,
    message: '<strong>这是 <i>HTML</i> 片段</strong>',
  })
}

</script>
