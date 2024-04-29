<template>
  <p class="m-b-sm">组件值：{{ value }}</p>
  <hl-date-picker v-model="value" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="defaultTime" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const defaultTime = [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)] // '00:00:00', '23:59:59'
const value = ref('')
</script>
