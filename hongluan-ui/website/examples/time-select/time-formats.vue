<template>
  <hl-time-select
    v-model="value"
    start="00:00"
    step="00:30"
    end="23:59"
    placeholder="选择时间"
    format="hh:mm A"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')

</script>
