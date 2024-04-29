<template>
  <!-- `checked` 为 true 或 false -->
  <hl-checkbox v-model="checked">备选项</hl-checkbox>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const checked = ref(true)
</script>
