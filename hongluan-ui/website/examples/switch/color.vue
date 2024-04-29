<template>
  <hl-switch v-model="value1" class="m-r-md" />
  <hl-switch v-model="value1" class="m-r-md" type="primary" />
  <hl-switch v-model="value1" class="m-r-md" type="success" />
  <hl-switch v-model="value1" class="m-r-md" type="warning" />
  <hl-switch v-model="value1" class="m-r-md" type="danger" />
  <hl-switch v-model="value1" class="m-r-md" type="info" />

  <hl-switch
    v-model="value"
    active-color="#13ce66"
    inactive-color="#2d3748"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(false)
const value1 = ref(true)

</script>
