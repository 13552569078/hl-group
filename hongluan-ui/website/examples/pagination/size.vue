<template>
  <hl-select v-model="value" clearable placeholder="选择尺寸" class="m-b-md">
    <template v-for="item in options">
      <hl-option v-if="item.divider" :key="item.value" divider />
      <hl-option v-else :key="item.value" :label="item.label" :value="item.value" />
    </template>
  </hl-select>
  <hl-pagination
    layout="total, slot, prev, pager, next, sizes, jumper"
    :total="50"
    :size="value"
    :pager-gap="pagerGapValue"
    block
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = ref([
  {
    value: 'sm',
    label: 'sm',
  },
  {
    value: 'md',
    label: 'md',
  },
  {
    value: 'lg',
    label: 'lg',
  },
])
const value = ref('')

</script>
