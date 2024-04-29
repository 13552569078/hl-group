<template>
  <hl-input-number v-model="num" :step="2" indent merge />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const num = ref(5)

</script>
