<template>
  <hl-group indent="var(--md)">
    <hl-color-picker v-model="color" size="lg" />
    <hl-color-picker v-model="color" />
    <hl-color-picker v-model="color" size="sm" />
  </hl-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const color = ref('409EFF')

</script>
