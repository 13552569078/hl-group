<template>
  <hl-input
    v-model="text"
    placeholder="请输入内容"
    maxlength="10"
    show-word-limit
    block
  />
  <hl-input
    v-model="textarea"
    native-type="textarea"
    placeholder="请输入内容"
    maxlength="30"
    class="m-t-md"
    :rows="5"
    show-word-limit
    block
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const text = ref('')
const textarea = ref('')

</script>
