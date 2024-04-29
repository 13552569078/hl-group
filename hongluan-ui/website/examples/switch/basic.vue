<template>
  <hl-switch v-model="value" class="m-r-md" />
  <hl-switch v-model="value" type="primary" width="var(--xxl)" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(true)

</script>
