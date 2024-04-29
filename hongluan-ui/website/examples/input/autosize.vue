<template>
  <hl-input
    v-model="textarea1"
    native-type="textarea"
    placeholder="请输入内容"
    autosize
    block
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const textarea1 = ref('')
</script>
