<template>
  <hl-transfer
    v-model="value"
    :left-default-checked="[1,4]"
    :titles="['Source', 'Target']"
    :data="data"
    :show-buttons="false"
    :format="{
      noChecked: '${total}',
      hasChecked: '${total}'
    }"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const generateData = () => {
  const data = []
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `备选项 ${i}`,
      disabled: i % 4 === 0,
    })
  }
  return data
}
const data = ref(generateData())
const value = ref([1, 4])
</script>
