<template>
  <hl-group gap="var(--md)">
    <hl-checkbox v-model="checked1" round>备选项1</hl-checkbox>
    <hl-checkbox v-model="checked2" round type="primary">备选项</hl-checkbox>
  </hl-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked1 = ref(false)
const checked2 = ref(false)

</script>
