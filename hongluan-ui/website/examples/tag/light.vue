<template>
  <hl-group gap="var(--md)">
    <hl-tag v-for="item in items" :key="item.label" :type="item.type" effect="light">
      {{ item.label }}
    </hl-tag>
  </hl-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const items = ref([
  { label: '标签一', type: null },
  { label: '标签二', type: 'primary' },
  { label: '标签三', type: 'success' },
  { label: '标签四', type: 'warning' },
  { label: '标签五', type: 'danger' },
  { label: '标签六', type: 'info' },
])

</script>
