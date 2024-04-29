<template>
  <hl-group gap="var(--md)">
    <hl-radio v-model="radio" disabled label="禁用">备选项</hl-radio>
    <hl-radio v-model="radio" disabled label="选中且禁用">备选项</hl-radio>
  </hl-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radio = ref('选中且禁用')

</script>
