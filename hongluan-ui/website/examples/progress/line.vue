<template>
  <hl-progress :percentage="75" stroke-width="var(--xxs)" :text="text" show-as="line" />
  <br>
  <hl-progress :percentage="75" stroke-width="1px" hide-label show-as="line" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const text = ref('正在下载 hongluan-ui_v_1.2.1.rar')

</script>
