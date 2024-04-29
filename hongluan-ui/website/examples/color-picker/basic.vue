<template>
  <div class="m-b-md">
    <span class="m-r-sm">有默认值</span>
    <hl-color-picker v-model="color1" />
  </div>
  <div>
    <span class="m-r-sm">无默认值</span>
    <hl-color-picker v-model="color2" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const color1 = ref('#409EFF')
const color2 = ref()

</script>
