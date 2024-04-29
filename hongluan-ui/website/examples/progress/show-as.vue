<template>
  <hl-progress show-as="stack" :stack="list" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const list = ref([
  {
    percentage: 35,
    type: '',
    striped: true,
    active: false,
  },
  {
    percentage: 20,
    type: 'warning',
    indicating: true,
    active: true,
  },
  {
    percentage: 20,
    type: 'error',
    format: p => `自定义内容${p}%`,
  },
])

</script>
