<template>
  <hl-tooltip
    ref="tooltipRef"
    v-bind="$attrs"
    :trigger="finalTrigger"
    :placement="placement"
    :disabled="disabled"
    :visible="visible"
    :transition="transition"
    :popper-options="popperOptions"
    :outside-ignore="outsideIgnore"
    :tabindex="tabindex"
    :append-to-body="appendToBody"
    :content="content"
    :offset="offset"
    :show-after="showAfter"
    :hide-after="hideAfter"
    :auto-close="autoClose"
    :show-arrow="showArrow"
    :aria-label="title"
    :effect="effect"
    :enterable="enterable"
    :popper-class="kls"
    :popper-style="style"
    :teleported="compatTeleported"
    :persistent="persistent"
    :gpu-acceleration="gpuAcceleration"
    :trigger-keys="triggerKeys"
    @update:visible="onUpdateVisible"
    @before-show="beforeEnter"
    @before-hide="beforeLeave"
    @show="afterEnter"
    @hide="afterLeave"
  >
    <template v-if="$slots.reference">
      <slot name="reference"></slot>
    </template>

    <template #content>
      <div v-if="title" class="popover-title" role="title">
        {{ title }}
      </div>
      <slot>
        {{ content }}
      </slot>
    </template>
  </hl-tooltip>
</template>
<script lang="ts" setup>
import { computed, ref, unref } from 'vue'
import { HlTooltip } from '@hongluan-ui/components/tooltip'
import { useDeprecateAppendToBody } from '@hongluan-ui/components/popper'
import { isString } from '@hongluan-ui/utils'
import { useNamespace } from '@hongluan-ui/hooks'
import { popoverEmits, popoverProps } from './popover'

import type { TooltipInstance } from '@hongluan-ui/components/tooltip'
import type { StyleValue } from 'vue'

defineOptions({
  name: 'Popover',
  inheritAttrs: false,
})

const props = defineProps(popoverProps)
const emit = defineEmits(popoverEmits)

const { namespace } = useNamespace('popover')
const tooltipRef = ref<TooltipInstance>()
const popperRef = computed(() => {
  return unref(tooltipRef)?.popperRef
})

const width = computed(() => {
  if (isString(props.width)) {
    return props.width as string
  }
  return `${props.width}px`
})

const style = computed(() => {
  return [
    {
      width: width.value,
    },
    props.popperStyle,
  ] as StyleValue
})

const kls = computed(() => {
  return [namespace.value, props.popperClass, { 'plain': !!props.content }, props.tooltip ? 'tooltip' : '']
})

const gpuAcceleration = computed(() => {
  return props.transition === 'fade'
})

const finalTrigger = computed(() => {
  return props.tooltip ? 'hover' : props.trigger
})

const { compatTeleported } = useDeprecateAppendToBody('Popover', 'appendToBody')

const updateEventKeyRaw = `onUpdate:visible` as const

const onUpdateVisible = computed(() => {
  return props[updateEventKeyRaw]
})

const hide = () => {
  tooltipRef.value?.hide()
}

const beforeEnter = () => {
  emit('before-enter')
}
const beforeLeave = () => {
  emit('before-leave')
}

const afterEnter = () => {
  emit('after-enter')
}

const afterLeave = () => {
  emit('update:visible', false)
  emit('after-leave')
}

defineExpose({
  /** @description popper ref */
  popperRef,
  /** @description hide popover */
  hide,
})
</script>

