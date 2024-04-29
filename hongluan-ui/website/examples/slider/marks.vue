<template>
  <div class="block">
    <hl-slider v-model="value" range :marks="marks" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([30, 60])
const marks = ref({
  0: '0°C',
  8: '8°C',
  37: '37°C',
  50: {
    style: {
      color: '#1989FA',
    },
    label: '50%',
  },
})
</script>
