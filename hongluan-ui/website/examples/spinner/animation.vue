<template>
  <hl-group block gap="5vw">
    <hl-group align="items-middle" gap="var(--md)" dir="vertical">
      <hl-spinner animation="around-right">
        <hl-icon>
          <two-circle-top />
        </hl-icon>
      </hl-spinner>
      <p>向右旋转</p>
    </hl-group>

    <hl-group align="items-middle" gap="var(--md)" dir="vertical">
      <hl-spinner animation="around-left">
        <hl-icon>
          <two-circle-top />
        </hl-icon>
      </hl-spinner>
      <p>向左旋转</p>
    </hl-group>

    <hl-group align="items-middle" gap="var(--md)" dir="vertical">
      <hl-spinner animation="none">
        <hl-icon>
          <two-circle-top />
        </hl-icon>
      </hl-spinner>
      <p>禁止旋转</p>
    </hl-group>
  </hl-group>
</template>
<script lang="ts" setup>
import { TwoCircleTop } from '@hongluan-ui/icons'

</script>
