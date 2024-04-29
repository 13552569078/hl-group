<template>
  <hl-transfer
    v-model="value"
    :props="{
      key: 'value',
      label: 'desc'
    }"
    :data="data"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const generateData = () => {
  const data = []
  for (let i = 1; i <= 15; i++) {
    data.push({
      value: i,
      desc: `备选项 ${i}`,
      disabled: i % 4 === 0,
    })
  }
  return data
}
const data = ref(generateData())
const value = ref([])

</script>
