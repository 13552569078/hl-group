<template>
  <hl-row>
    <hl-col :span="12">
      <hl-menu
        default-active="2"
        class="hl-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <hl-sub-menu index="1">
          <template #title>
            <hl-icon class="item-icon"><two-point /></hl-icon>
            <span>导航一</span>
          </template>
          <hl-menu-item-group>
            <template #title>分组一</template>
            <hl-menu-item index="1-1">选项1</hl-menu-item>
            <hl-menu-item index="1-2">选项2</hl-menu-item>
          </hl-menu-item-group>
          <hl-menu-item-group title="分组2">
            <hl-menu-item index="1-3">选项3</hl-menu-item>
          </hl-menu-item-group>
          <hl-sub-menu index="1-4">
            <template #title>选项4</template>
            <hl-menu-item index="1-4-1">选项1</hl-menu-item>
          </hl-sub-menu>
        </hl-sub-menu>
        <hl-menu-item index="2">
          <hl-icon class="item-icon"><two-application /></hl-icon>
          <template #title>导航二</template>
        </hl-menu-item>
        <hl-menu-item index="3" disabled>
          <hl-icon class="item-icon"><two-file /></hl-icon>
          <template #title>导航三</template>
        </hl-menu-item>
        <hl-menu-item index="4">
          <hl-icon class="item-icon"><two-setting /></hl-icon>
          <template #title>导航四</template>
        </hl-menu-item>
      </hl-menu>
    </hl-col>
  </hl-row>
</template>

<script lang="ts" setup>
import { TwoPoint, TwoApplication, TwoFile, TwoSetting } from '@hongluan-ui/icons'

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}

</script>
