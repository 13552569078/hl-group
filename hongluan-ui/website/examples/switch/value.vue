<template>
  <hl-switch v-model="value" active-value="100" inactive-value="0" />
  <span class="m-l-md">{{ value }}</span>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('100')
</script>
