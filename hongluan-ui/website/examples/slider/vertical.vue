<template>
  <div class="block">
    <hl-slider v-model="value" vertical height="200px" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(0)

</script>
