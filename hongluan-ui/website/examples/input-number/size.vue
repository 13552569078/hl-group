<template>
  <hl-group>
    <hl-input-number v-model="num2" size="sm" class="m-r-md" indent merge />
    <hl-input-number v-model="num3" class="m-r-md" indent merge />
    <hl-input-number v-model="num4" size="lg" class="m-r-md" indent merge />
  </hl-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const num2 = ref(1)
const num3 = ref(1)
const num4 = ref(1)

</script>
