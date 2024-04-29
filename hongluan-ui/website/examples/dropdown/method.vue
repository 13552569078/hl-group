<template>
  <div style="font-size: 14px">
    <p>打开(关闭) 下拉框2 将会 关闭(打开) 下拉框1</p>
  </div>
  <div style="margin: 15px">
    <hl-button type="primary" @click="showClick">show</hl-button>
  </div>
  <hl-dropdown ref="dropdown1" trigger="contextmenu" style="margin-right: 30px">
    <hl-button type="link"> 下拉框1 </hl-button>
    <template #dropdown>
      <hl-dropdown-menu>
        <hl-dropdown-item>Action 1</hl-dropdown-item>
        <hl-dropdown-item>Action 2</hl-dropdown-item>
        <hl-dropdown-item>Action 3</hl-dropdown-item>
        <hl-dropdown-item disabled>Action 4</hl-dropdown-item>
        <hl-dropdown-item divider>Action 5</hl-dropdown-item>
      </hl-dropdown-menu>
    </template>
  </hl-dropdown>

  <hl-dropdown trigger="contextmenu" @visible-change="handleVisible2">
    <hl-button type="link"> 下拉框2(右键) </hl-button>
    <template #dropdown>
      <hl-dropdown-menu>
        <hl-dropdown-item>Action 1</hl-dropdown-item>
        <hl-dropdown-item>Action 2</hl-dropdown-item>
        <hl-dropdown-item>Action 3</hl-dropdown-item>
        <hl-dropdown-item disabled>Action 4</hl-dropdown-item>
        <hl-dropdown-item divider>Action 5</hl-dropdown-item>
      </hl-dropdown-menu>
    </template>
  </hl-dropdown>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const dropdown1 = ref()
function handleVisible2(visible) {
  if (visible) {
    dropdown1.value.handleClose()
  } else {
    dropdown1.value.handleOpen()
  }
}
function showClick() {
  dropdown1.value.handleOpen()
}
</script>
