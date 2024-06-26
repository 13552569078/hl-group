<template>
  <hl-popper ref="popperRef" :role="role">
    <hl-tooltip-trigger
      :style="$attrs.style"
      :class="$attrs.class"
      :disabled="disabled"
      :trigger="trigger"
      :trigger-keys="triggerKeys"
      :virtual-ref="virtualRef"
      :virtual-triggering="virtualTriggering"
    >
      <slot v-if="$slots.default"></slot>
    </hl-tooltip-trigger>
    <hl-tooltip-content
      ref="contentRef"
      :aria-label="ariaLabel"
      :boundaries-padding="boundariesPadding"
      :content="content"
      :disabled="disabled"
      :effect="effect"
      :enterable="enterable"
      :fallback-placements="fallbackPlacements"
      :hide-after="hideAfter"
      :gpu-acceleration="gpuAcceleration"
      :offset="offset"
      :persistent="persistent"
      :popper-class="popperClass"
      :popper-style="popperStyle"
      :placement="placement"
      :popper-options="popperOptions"
      :outside-ignore="outsideIgnore"
      :pure="pure"
      :raw-content="rawContent"
      :reference-el="referenceEl"
      :trigger-target-el="triggerTargetEl"
      :show-after="showAfter"
      :strategy="strategy"
      :teleported="teleported"
      :transition="transition"
      :virtual-triggering="virtualTriggering"
      :z-index="zIndex"
      :append-to="appendTo"
    >
      <slot name="content">
        <span v-if="rawContent" v-html="content"></span>
        <span v-else>{{ content }}</span>
      </slot>
      <hl-popper-arrow v-if="showArrow" :arrow-offset="arrowOffset" />
    </hl-tooltip-content>
  </hl-popper>
</template>

<script lang="ts" setup>
import {
  computed,
  onDeactivated,
  provide,
  readonly,
  ref,
  toRef,
  unref,
  watch,
} from 'vue'
import { HlPopper, HlPopperArrow } from '@hongluan-ui/components/popper'
import { isBoolean } from '@hongluan-ui/utils'
import {
  useDelayedToggle,
  useId,
  usePopperContainer,
} from '@hongluan-ui/hooks'
import { TOOLTIP_INJECTION_KEY } from '@hongluan-ui/tokens'
import { tooltipEmits, useTooltipModelToggle, useTooltipProps } from './tooltip'
import HlTooltipTrigger from './trigger.vue'
import HlTooltipContent from './content.vue'

defineOptions({
  name: 'Tooltip',
})

const props = defineProps(useTooltipProps)
const emit = defineEmits(tooltipEmits)

usePopperContainer()

const id = useId()
// TODO any is temporary, replace with `InstanceType<typeof ElPopper> | null` later
const popperRef = ref<any>()
// TODO any is temporary, replace with `InstanceType<typeof ElTooltipContent> | null` later
const contentRef = ref<any>()

const updatePopper = () => {
  const popperComponent = unref(popperRef)
  if (popperComponent) {
    popperComponent.popperInstanceRef?.update()
  }
}
const open = ref(false)
const toggleReason = ref<Event>()

const { show, hide, hasUpdateHandler } = useTooltipModelToggle({
  indicator: open,
  toggleReason,
})

const { onOpen, onClose } = useDelayedToggle({
  showAfter: toRef(props, 'showAfter'),
  hideAfter: toRef(props, 'hideAfter'),
  open: show,
  close: hide,
})

const controlled = computed(
  () => isBoolean(props.visible) && !hasUpdateHandler.value,
)

provide(TOOLTIP_INJECTION_KEY, {
  controlled,
  id,
  open: readonly(open),
  trigger: toRef(props, 'trigger'),
  onOpen: (event?: Event) => {
    onOpen(event)
  },
  onClose: (event?: Event) => {
    onClose(event)
  },
  onToggle: (event?: Event) => {
    if (unref(open)) {
      onClose(event)
    } else {
      onOpen(event)
    }
  },
  onShow: () => {
    emit('show', toggleReason.value)
  },
  onHide: () => {
    emit('hide', toggleReason.value)
  },
  onBeforeShow: () => {
    emit('before-show', toggleReason.value)
  },
  onBeforeHide: () => {
    emit('before-hide', toggleReason.value)
  },
  updatePopper,
})

watch(
  () => props.disabled,
  disabled => {
    if (disabled && open.value) {
      open.value = false
    }
  },
)

const isFocusInsideContent = () => {
  const popperContent: HTMLElement | undefined =
    contentRef.value?.contentRef?.popperContentRef
  return popperContent && popperContent.contains(document.activeElement)
}

onDeactivated(() => open.value && hide())

defineExpose({
  /**
   * @description el-popper component instance
   */
  popperRef,
  /**
   * @description el-tooltip-content component instance
   */
  contentRef,
  /**
   * @description validate current focus event is trigger inside el-tooltip-content
   */
  isFocusInsideContent,
  /**
   * @description update el-popper component instance
   */
  updatePopper,
  /**
   * @description expose onOpen function to mange el-tooltip open state
   */
  onOpen,
  /**
   * @description expose onOpen function to mange el-tooltip open state
   */
  onClose,
  /**
   * @description expose hide function
   */
  hide,
})
</script>
