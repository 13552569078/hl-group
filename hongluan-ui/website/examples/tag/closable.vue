<template>
  <hl-group gap="var(--md)">
    <hl-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type">
      {{ tag.name }}
    </hl-tag>
  </hl-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tags = ref([
  { name: '标签二', type: 'primary' },
  { name: '标签三', type: 'success' },
  { name: '标签四', type: 'warning' },
  { name: '标签五', type: 'danger' },
  { name: '标签六', type: 'info' },
])

</script>
