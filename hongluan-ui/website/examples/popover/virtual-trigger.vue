<template>
  <hl-button
    ref="buttonRef"
    v-click-outside="onClickOutside"
  >
    Click me
  </hl-button>

  <hl-popover
    ref="popoverRef"
    :virtual-ref="buttonRef"
    trigger="click"
    title="With title"
    virtual-triggering
  >
    <span> Some content </span>
  </hl-popover>
</template>

<script setup lang="ts">
import { ref, unref } from 'vue'
import { cloneDeep } from 'lodash-unified'
import { ClickOutside as vClickOutside } from 'hongluan-ui'

const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}

console.log(cloneDeep({ a:1 }))
</script>
