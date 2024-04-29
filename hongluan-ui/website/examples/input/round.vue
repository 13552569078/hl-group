<template>
  <hl-input v-model="input" placeholder="请输入内容" round />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const input = ref('')

</script>
