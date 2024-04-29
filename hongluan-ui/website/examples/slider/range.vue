<template>
  <div class="block">
    <hl-slider v-model="value" range show-stops :max="10" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([4, 8])

</script>
