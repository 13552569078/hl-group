<template>
  <hl-group block gap="5vw">
    <hl-group align="items-middle" gap="var(--md)" dir="vertical">
      <hl-spinner>
        <hl-icon>
          <two-circle-top />
        </hl-icon>
      </hl-spinner>
      <p>默认 2s</p>
    </hl-group>

    <hl-group align="items-middle" gap="var(--md)" dir="vertical">
      <hl-spinner duration="500ms">
        <hl-icon>
          <two-circle-top />
        </hl-icon>
      </hl-spinner>
      <p>500ms</p>
    </hl-group>

    <hl-group align="items-middle" gap="var(--md)" dir="vertical">
      <hl-spinner duration="12s">
        <hl-icon>
          <two-circle-top />
        </hl-icon>
      </hl-spinner>
      <p>12s</p>
    </hl-group>
  </hl-group>
</template>
<script lang="ts" setup>
import { TwoCircleTop } from '@hongluan-ui/icons'
</script>
