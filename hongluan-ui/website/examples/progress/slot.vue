<template>
  <hl-progress :percentage="40" text="自定义内容" class="m-b-xxl">
    <span>自定义内容</span>
  </hl-progress>

  <hl-progress :percentage="40" text="自定义内容" class="m-b-xxl">
    <template #default="{percentage, text}">
      <span class="progress-label">{{ text }}</span>
      <span class="progress-percentage">{{ percentage }}%</span>
    </template>
  </hl-progress>

  <hl-progress show-as="stack" :stack="list" class="m-b-xxl">
    <template #default="{percentage}">
      <strong>进度：{{ percentage }}%</strong>
    </template>
  </hl-progress>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const list = ref([
  {
    percentage: 35,
  },
  {
    percentage: 20,
    type: 'warning',
  },
  {
    percentage: 20,
    type: 'error',
  },
])

</script>
