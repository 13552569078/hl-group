<template>
  <div class="block">
    <span class="demonstration">不显示间断点</span>
    <hl-slider v-model="value1" :step="10" />
  </div>
  <div class="block">
    <span class="demonstration">显示间断点</span>
    <hl-slider v-model="value2" :step="10" show-stops />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(0)
const value2 = ref(0)

</script>
