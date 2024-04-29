<template>
  <hl-group gap="var(--md)">
    <hl-link>
      <template #prefix>
        <hl-icon><TwoEdit /></hl-icon>
      </template>
      Edit
    </hl-link>
    <hl-link>
      Check
      <template #suffix>
        <hl-icon><TwoInfo /></hl-icon>
      </template>
    </hl-link>
  </hl-group>
</template>

<script setup lang="ts">
import { TwoEdit, TwoInfo } from '@hongluan-ui/icons'
</script>

