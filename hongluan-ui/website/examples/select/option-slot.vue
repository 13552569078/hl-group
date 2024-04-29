<template>
  <hl-select v-model="value" placeholder="请选择">
    <hl-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value">
      <span class="m-r-md">{{ item.label }}</span>
      <span class="text-secondary font-sm">{{ item.value }}</span>
    </hl-option>
  </hl-select>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const cities = ref([
  {
    value: 'Beijing',
    label: '北京',
  },
  {
    value: 'Shanghai',
    label: '上海',
  },
  {
    value: 'Nanjing',
    label: '南京',
  },
  {
    value: 'Chengdu',
    label: '成都',
  },
  {
    value: 'Shenzhen',
    label: '深圳',
  },
  {
    value: 'Guangzhou',
    label: '广州',
  },
])
const value = ref('')

</script>
