<template>
  <hl-group gap="var(--md)">
    <hl-checkbox v-model="checked1" size="sm">Default</hl-checkbox>
    <hl-checkbox v-model="checked2" type="primary">Primary</hl-checkbox>
    <hl-checkbox v-model="checked3" type="success" size="lg">Success</hl-checkbox>
  </hl-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked1 = ref(false)
const checked2 = ref(false)
const checked3 = ref(false)

</script>
