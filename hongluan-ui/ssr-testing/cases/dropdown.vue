<template>
  <hl-dropdown>
    <span
      class="hl-dropdown-link"
      style="
        cursor: pointer;
        color: var(--hl-color-primary);
        display: flex;
        align-items: center;
      "
    >
      Dropdown List
      <hl-icon class="hl-icon--right">
        <two-arrow-bottom />
      </hl-icon>
    </span>
    <template #dropdown>
      <hl-dropdown-menu>
        <hl-dropdown-item>Action 1</hl-dropdown-item>
        <hl-dropdown-item>Action 2</hl-dropdown-item>
        <hl-dropdown-item>Action 3</hl-dropdown-item>
        <hl-dropdown-item disabled>Action 4</hl-dropdown-item>
        <hl-dropdown-item divided>Action 5</hl-dropdown-item>
      </hl-dropdown-menu>
    </template>
  </hl-dropdown>
</template>

<script lang="ts" setup>
import { TwoArrowBottom } from '@hongluan-ui/icons'
</script>
