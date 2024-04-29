<template>
  <hl-row gap="var(--md)">
    <hl-col span="lg:col-8">
      <hl-progress :percentage="68" type="warning" :format="formatWarning" />
    </hl-col>
    <hl-col span="lg:col-8">
      <hl-progress :percentage="68" type="success" :format="formatSuccess" />
    </hl-col>
    <hl-col span="lg:col-8">
      <hl-progress :percentage="68" type="error" :format="formatDanger" />
    </hl-col>
  </hl-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const formatSuccess = percentage => {
  return `${percentage}%  success`
}
const formatWarning = percentage => {
  return `${percentage}%  warning`
}
const formatDanger = percentage => {
  return `${percentage}%  danger`
}
</script>
