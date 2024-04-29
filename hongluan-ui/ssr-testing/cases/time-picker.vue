<template>
  <div class="example-basic">
    <hl-time-picker v-model="value1" placeholder="Arbitrary time" />
    <hl-time-picker
      v-model="value2"
      arrow-control
      placeholder="Arbitrary time"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value1 = ref()
const value2 = ref()
</script>

<style>
.example-basic .hl-date-editor {
  margin: 8px;
}
</style>
