<template>
  <hl-input-number
    v-model="num"
    :precision="2"
    :step="0.1"
    :max="10"
    indent
    merge
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const num = ref(1)
</script>
