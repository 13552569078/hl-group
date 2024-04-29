<template>
  <hl-button type="link" @click="open">点击打开 Message Box</hl-button>
</template>

<script lang="ts" setup>
import { HlMessageBox } from 'hongluan-ui'

const open = () => {
  HlMessageBox.alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
    dangerouslyUseHTMLString: true,
  })
}

</script>
