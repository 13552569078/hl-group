<template>
  <hl-group gap="var(--md)" class="m-b-md">
    <hl-select v-model="gapValue" clearable placeholder="选择分页元素间隙">
      <template v-for="item in options">
        <hl-option v-if="item.divider" :key="item.value" divider />
        <hl-option v-else :key="item.value" :label="item.label" :value="item.value" />
      </template>
    </hl-select>

    <hl-select v-model="pagerGapValue" clearable placeholder="选择分页指示器间隙">
      <template v-for="item in options">
        <hl-option v-if="item.divider" :key="item.value" divider />
        <hl-option v-else :key="item.value" :label="item.label" :value="item.value" />
      </template>
    </hl-select>
  </hl-group>
  <hl-pagination
    layout="total, slot, prev, pager, next, sizes, jumper"
    :total="50"
    :gap="gapValue"
    :pager-gap="pagerGapValue"
    block
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = ref([
  {
    value: '0',
    label: 'none',
  },
  {
    divider: true,
  },
  {
    value: 'var(--sm)',
    label: 'var(--sm)',
  },
  {
    value: 'var(--md)',
    label: 'var(--md)',
  },
  {
    value: 'var(--lg)',
    label: 'var(--lg)',
  },
  {
    value: 'var(--xl)',
    label: 'var(--xl)',
  },
  {
    value: 'var(--xxl)',
    label: 'var(--xxl)',
  },
])
const gapValue = ref('')
const pagerGapValue = ref('')

</script>
