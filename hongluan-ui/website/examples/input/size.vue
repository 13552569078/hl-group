<template>
  <hl-input
    v-model="input1"
    placeholder="sm"
    size="sm"
    class="m-r-md"
  />
  <hl-input
    v-model="input2"
    placeholder="md"
    size="md"
    class="m-r-md"
  />
  <hl-input
    v-model="input3"
    placeholder="lg"
    size="lg"
    class="m-r-md"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
</script>
