<template>
  <hl-select
    v-model="value"
    multiple
    filterable
    allow-create
    default-first-option
    :reserve-keyword="false"
    placeholder="请选择文章标签"
  >
    <hl-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </hl-select>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = ref([
  {
    value: 'HTML',
    label: 'HTML',
  },
  {
    value: 'CSS',
    label: 'CSS',
  },
  {
    value: 'JavaScript',
    label: 'JavaScript',
  },
])
const value = ref([])

</script>
