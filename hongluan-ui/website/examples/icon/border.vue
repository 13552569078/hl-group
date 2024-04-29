<template>
  <hl-row>
    <hl-col span="col" class="display-flex items-middle flex-col">
      <p class="m-b-md">填充透明度</p>
      <hl-group indent="var(--lg)">
        <hl-icon size="xxxl" :opacity="0">
          <two-delete />
        </hl-icon>
        <hl-icon size="xxxl" :opacity=".2">
          <two-delete />
        </hl-icon>
        <hl-icon size="xxxl" :opacity=".5">
          <two-delete />
        </hl-icon>
      </hl-group>
    </hl-col>
    <hl-col span="col" class="display-flex items-middle flex-col">
      <p class="m-b-md">线条粗细</p>
      <hl-group indent="var(--lg)">
        <hl-icon size="xxxl" :border="1">
          <two-delete />
        </hl-icon>
        <hl-icon size="xxxl" :border="1.5">
          <two-delete />
        </hl-icon>
        <hl-icon size="xxxl" :border="2">
          <two-delete />
        </hl-icon>
      </hl-group>
    </hl-col>
  </hl-row>
</template>
<script lang="ts" setup>
import { TwoDelete } from '@hongluan-ui/icons'
</script>
