<template>
  <hl-radio-group v-model="radio" gap="var(--md)" type="primary" size="md">
    <hl-radio label="a">备选项</hl-radio>
    <hl-radio label="b">备选项</hl-radio>
    <hl-radio label="c">备选项</hl-radio>
  </hl-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radio = ref('a')

</script>
