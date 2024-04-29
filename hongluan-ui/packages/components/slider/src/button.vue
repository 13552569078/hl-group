<template>
  <div
    ref="button"
    class="slider-handle-wrap"
    :class="{ hover: hovering, dragging: dragging }"
    :style="wrapperStyle"
    :tabindex="disabled ? -1 : 0"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="onButtonDown"
    @touchstart="onButtonDown"
    @focus="handleMouseEnter"
    @blur="handleMouseLeave"
    @keydown="onKeyDown"
  >
    <hl-tooltip
      ref="tooltip"
      :visible="tooltipVisible"
      :placement="placement"
      :fallback-placements="['top', 'bottom', 'right', 'left']"
      :effect="Effect.DARK"
      :stop-popper-mouse-event="false"
      :popper-class="`${tooltipClass} tooltip ${namespace}`"
      :disabled="!showTooltip"
      persistent
    >
      <template #content>
        <span>{{ formatValue }}</span>
      </template>
      <div
        class="slider-handle"
        :class="{ hover: hovering, dragging: dragging }"
      ></div>
    </hl-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from 'vue'
import { HlTooltip } from '@hongluan-ui/components/tooltip'
import { Effect } from '@hongluan-ui/components/popper'
import { useNamespace } from '@hongluan-ui/hooks'
import { useSliderButton } from './composables'
import { sliderButtonEmits, sliderButtonProps } from './button'
import type { SliderButtonInitData } from './button'

defineOptions({
  name: 'SliderButton',
})

const props = defineProps(sliderButtonProps)
const emit = defineEmits(sliderButtonEmits)

const initData = reactive<SliderButtonInitData>({
  hovering: false,
  dragging: false,
  isClick: false,
  startX: 0,
  currentX: 0,
  startY: 0,
  currentY: 0,
  startPosition: 0,
  newPosition: 0,
  oldValue: props.modelValue,
})

const { namespace } = useNamespace('popover')
const {
  disabled,
  button,
  tooltip,
  showTooltip,
  tooltipVisible,
  wrapperStyle,
  formatValue,
  handleMouseEnter,
  handleMouseLeave,
  onButtonDown,
  onKeyDown,
  setPosition,
} = useSliderButton(props, initData, emit)

const { hovering, dragging } = toRefs(initData)

defineExpose({
  onButtonDown,
  onKeyDown,
  setPosition,
  hovering,
  dragging,
})
</script>
