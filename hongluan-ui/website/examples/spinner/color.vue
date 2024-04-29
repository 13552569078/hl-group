<template>
  <hl-group block gap="5vw">
    <hl-spinner color="var(--danger)">
      <hl-icon><two-repeat /></hl-icon>
    </hl-spinner>
    <hl-spinner color="#4a7fb1">
      <hl-icon><two-setting /></hl-icon>
    </hl-spinner>
    <hl-spinner color="#b14a4a">
      <hl-icon><two-star /></hl-icon>
    </hl-spinner>
    <hl-spinner color="#b9bd47">
      <hl-icon><two-minus /></hl-icon>
    </hl-spinner>
  </hl-group>
</template>
<script lang="ts" setup>
import { TwoRepeat, TwoSetting, TwoStar, TwoMinus } from '@hongluan-ui/icons'
</script>
