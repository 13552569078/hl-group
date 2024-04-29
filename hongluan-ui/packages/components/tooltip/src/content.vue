<template>
  <teleport :disabled="!teleported" :to="appendTo">
    <transition
      :name="transition"
      @after-leave="onTransitionLeave"
      @before-enter="onBeforeEnter"
      @after-enter="onAfterShow"
      @before-leave="onBeforeLeave"
    >
      <hl-popper-content
        v-if="shouldRender"
        v-show="shouldShow"
        :id="id"
        ref="contentRef"
        v-bind="$attrs"
        :aria-label="ariaLabel"
        :aria-hidden="ariaHidden"
        :boundaries-padding="boundariesPadding"
        :fallback-placements="fallbackPlacements"
        :gpu-acceleration="gpuAcceleration"
        :offset="offset"
        :placement="placement"
        :popper-options="popperOptions"
        :strategy="strategy"
        :effect="effect"
        :enterable="enterable"
        :pure="pure"
        :popper-class="popperClass"
        :popper-style="[popperStyle, contentStyle]"
        :reference-el="referenceEl"
        :trigger-target-el="triggerTargetEl"
        :visible="shouldShow"
        :z-index="zIndex"
        @mouseenter="onContentEnter"
        @mouseleave="onContentLeave"
        @blur="onBlur"
        @close="onClose"
      >
        <template v-if="!destroyed">
          <slot></slot>
        </template>
      </hl-popper-content>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { computed, inject, onBeforeUnmount, ref, unref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { composeEventHandlers } from '@hongluan-ui/utils'
import { usePopperContainerId } from '@hongluan-ui/hooks'
import { HlPopperContent } from '@hongluan-ui/components/popper'
import { TOOLTIP_INJECTION_KEY } from '@hongluan-ui/tokens'
import { useTooltipContentProps } from './content'

defineOptions({
  name: 'TooltipContent',
  inheritAttrs: false,
})

const props = defineProps(useTooltipContentProps)

const { selector } = usePopperContainerId()
// TODO any is temporary, replace with `InstanceType<typeof PopperContent> | null` later
const contentRef = ref<any>(null)
const destroyed = ref(false)
const {
  controlled,
  id,
  open,
  trigger,
  onClose,
  onOpen,
  onShow,
  onHide,
  onBeforeShow,
  onBeforeHide,
} = inject(TOOLTIP_INJECTION_KEY, undefined)!
const persistentRef = computed(() => {
  // For testing, we would always want the content to be rendered
  // to the DOM, so we need to return true here.
  if (process.env.NODE_ENV === 'test') {
    return true
  }
  return props.persistent
})

onBeforeUnmount(() => {
  destroyed.value = true
})

const shouldRender = computed(() => {
  return unref(persistentRef) ? true : unref(open)
})

const shouldShow = computed(() => {
  return props.disabled ? false : unref(open)
})

const appendTo = computed(() => {
  return props.appendTo || selector.value
})

const contentStyle = computed(() => (props.style ?? {}) as any)

const ariaHidden = computed(() => !unref(open))

const onTransitionLeave = () => {
  onHide()
}

const stopWhenControlled = () => {
  if (unref(controlled)) return true
}

const onContentEnter = composeEventHandlers(stopWhenControlled, () => {
  if (props.enterable && unref(trigger) === 'hover') {
    onOpen()
  }
})

const onContentLeave = composeEventHandlers(stopWhenControlled, () => {
  if (unref(trigger) === 'hover') {
    onClose()
  }
})

const onBeforeEnter = () => {
  contentRef.value?.updatePopper?.()
  onBeforeShow?.()
}

const onBeforeLeave = () => {
  onBeforeHide?.()
}

const onAfterShow = () => {
  onShow()
  stopHandle = onClickOutside(
    computed(() => {
      return contentRef.value?.popperContentRef
    }),
    () => {
      if (unref(controlled)) return
      const $trigger = unref(trigger)
      if ($trigger !== 'hover') {
        onClose()
      }
    },
    {
      ignore: props.outsideIgnore,
    },
  )
}

const onBlur = () => {
  if (!props.virtualTriggering) {
    onClose()
  }
}

let stopHandle: ReturnType<typeof onClickOutside>

watch(
  () => unref(open),
  val => {
    if (!val) {
      stopHandle?.()
    }
  },
  {
    flush: 'post',
  },
)

watch(
  () => props.content,
  () => {
    contentRef.value?.updatePopper?.()
  },
)

defineExpose({
  /**
   * @description popper-content component instance
   */
  contentRef,
})
</script>
