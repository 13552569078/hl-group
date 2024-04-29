<template>
  <hl-switch v-model="value1" class="m-r-md" disabled />
  <hl-switch v-model="value2" class="m-r-md" type="primary" disabled />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(true)
const value2 = ref(false)

</script>
