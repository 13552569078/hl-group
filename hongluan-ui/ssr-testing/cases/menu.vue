<template>
  <hl-menu :default-active="activeIndex" class="hl-menu-demo" mode="horizontal">
    <hl-menu-item index="1">Processing Center</hl-menu-item>
    <hl-sub-menu index="2">
      <template #title>Workspace</template>
      <hl-menu-item index="2-1">item one</hl-menu-item>
    </hl-sub-menu>
    <hl-menu-item index="3" disabled>Info</hl-menu-item>
    <hl-menu-item index="4">Orders</hl-menu-item>
  </hl-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
</script>
