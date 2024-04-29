<template>
  <hl-group gap="var(--md)">
    <hl-radio v-model="radio" label="1" size="sm" class="m-r-md">默认</hl-radio>
    <hl-radio v-model="radio" label="2" type="primary" size="md" class="m-r-md">Primary</hl-radio>
    <hl-radio v-model="radio" label="3" type="success" size="lg" class="m-r-md">Success</hl-radio>
  </hl-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radio = ref('1')

</script>
