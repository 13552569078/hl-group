<template>
  <hl-input v-model="input" placeholder="请输入密码" show-password />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const input = ref('')

</script>

