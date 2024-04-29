<template>
  <hl-group gap="var(--md)">
    <hl-radio v-model="radio" label="1">备选项</hl-radio>
    <hl-radio v-model="radio" label="2">备选项</hl-radio>
  </hl-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radio = ref('1')

</script>
