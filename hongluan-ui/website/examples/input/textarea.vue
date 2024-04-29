<template>
  <hl-input
    v-model="textarea"
    native-type="textarea"
    placeholder="请输入内容"
    block
    :input-style="{height: '200px'}"
  />
</template>


<script lang="ts" setup>
import { ref } from 'vue'

const textarea = ref('')

</script>

