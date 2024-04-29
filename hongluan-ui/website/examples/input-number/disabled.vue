<template>
  <hl-input-number v-model="num" :disabled="true" indent merge />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const num = ref(1)

</script>
