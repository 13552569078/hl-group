<template>
  <hl-steps :active="active" finish-status="success">
    <hl-step title="Step 1" />
    <hl-step title="Step 2" />
    <hl-step title="Step 3" />
  </hl-steps>

  <hl-button style="margin-top: 12px" @click="next">Next step</hl-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)

const next = () => {
  if (active.value++ > 2) active.value = 0
}
</script>
