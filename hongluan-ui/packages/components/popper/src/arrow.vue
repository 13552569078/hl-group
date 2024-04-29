<template>
  <span ref="arrowRef" class="popper-arrow" data-popper-arrow=""></span>
</template>

<script lang="ts" setup>
import { inject, onBeforeUnmount, watch } from 'vue'
import { POPPER_CONTENT_INJECTION_KEY } from '@hongluan-ui/tokens'
import { popperArrowProps } from './arrow'

defineOptions({
  name: 'PopperArrow',
  inheritAttrs: false,
})

const props = defineProps(popperArrowProps)

const { arrowOffset, arrowRef } = inject(
  POPPER_CONTENT_INJECTION_KEY,
  undefined,
)

watch(
  () => props.arrowOffset,
  val => {
    arrowOffset.value = val
  },
)
onBeforeUnmount(() => {
  arrowRef.value = undefined
})

defineExpose({
  /**
   * @description Arrow element
   */
  arrowRef,
})
</script>
