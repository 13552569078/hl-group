<template>
  <hl-steps :active="1">
    <hl-step title="步骤 1">
      <template #icon>
        <hl-icon><two-edit /></hl-icon>
      </template>
    </hl-step>
    <hl-step title="步骤 2">
      <template #icon>
        <hl-icon><two-upload /></hl-icon>
      </template>
    </hl-step>
    <hl-step title="步骤 3">
      <template #icon>
        <hl-icon><two-pic /></hl-icon>
      </template>
    </hl-step>
  </hl-steps>
</template>
<script lang="ts" setup>
import { TwoEdit, TwoUpload, TwoPic } from '@hongluan-ui/icons'

</script>
