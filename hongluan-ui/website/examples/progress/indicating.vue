<template>
  <hl-row gap="var(--md)">
    <hl-col :span="12">
      <hl-progress :percentage="50" indicating :format="format" />
    </hl-col>
    <hl-col :span="12">
      <hl-progress :percentage="50" indicating active :format="formatActive" />
    </hl-col>
  </hl-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const format = percentage => {
  return `${percentage}%  静态`
}
const formatActive = percentage => {
  return `${percentage}%  脉冲`
}

</script>
