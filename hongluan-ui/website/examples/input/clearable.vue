<template>
  <hl-input v-model="input" placeholder="请输入内容" clearable />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const input = ref('测试输入')

</script>
