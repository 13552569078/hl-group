<template>
  <hl-button class="m-r-md" @click="outerVisible = true">点击打Dialog</hl-button>
  <hl-dialog
    v-model="outerVisible"
    title="测试Panel属性"
    width="400px"
    borderless
    radius="0"
    header-height="40px"
    body-padding="20px"
    header-class="header-dialog"
    body-class="footer-dialog"
  >
    <p>panel 对话框</p>
  </hl-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const outerVisible = ref(false)

</script>
