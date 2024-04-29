<template>
  <div
    :id="range ? inputId : undefined"
    ref="sliderWrapper"
    :class="[
      namespace,
      vertical ? 'is-vertical': '',
      type ? type : '',
    ]"
    :role="range ? 'group' : undefined"
    :aria-label="range && !isLabeledByFormItem ? groupLabel : undefined"
    :aria-labelledby="
      range && isLabeledByFormItem ? formItem.labelId : undefined
    "
    @touchstart="onSliderWrapperPrevent"
    @touchmove="onSliderWrapperPrevent"
  >
    <div
      ref="slider"
      :class="{
        'slider-wrap': true,
        disabled: sliderDisabled
      }"
      :style="runwayStyle"
      @mousedown="onSliderDown"
      @touchstart="onSliderDown"
    >
      <div class="slider-bar" :style="barStyle"></div>
      <slider-button
        :id="!range ? inputId : undefined"
        ref="firstButton"
        :model-value="firstValue"
        :vertical="vertical"
        :tooltip-class="tooltipClass"
        :placement="placement"
        role="slider"
        :aria-label="
          range || !isLabeledByFormItem ? firstButtonLabel : undefined
        "
        :aria-labelledby="
          !range && isLabeledByFormItem ? formItem.labelId : undefined
        "
        :aria-valuemin="min"
        :aria-valuemax="range ? secondValue : max"
        :aria-valuenow="firstValue"
        :aria-valuetext="firstValueText"
        :aria-orientation="vertical ? 'vertical' : 'horizontal'"
        :aria-disabled="sliderDisabled"
        @update:model-value="setFirstValue"
      />
      <slider-button
        v-if="range"
        ref="secondButton"
        :model-value="secondValue"
        :vertical="vertical"
        :tooltip-class="tooltipClass"
        :placement="placement"
        role="slider"
        :aria-label="secondButtonLabel"
        :aria-valuemin="firstValue"
        :aria-valuemax="max"
        :aria-valuenow="secondValue"
        :aria-valuetext="secondValueText"
        :aria-orientation="vertical ? 'vertical' : 'horizontal'"
        :aria-disabled="sliderDisabled"
        @update:model-value="setSecondValue"
      />
      <div v-if="showStops">
        <div
          v-for="(item, key) in stops"
          :key="key"
          class="slider-stop"
          :style="getStopStyle(item)"
        ></div>
      </div>
      <template v-if="markList.length > 0">
        <div>
          <div
            v-for="(item, key) in markList"
            :key="key"
            :style="getStopStyle(item.position)"
            class="slider-stop slider-marks-stop"
          ></div>
        </div>
        <div class="slider-marks">
          <slider-marker
            v-for="(item, key) in markList"
            :key="key"
            :mark="item.mark"
            :style="getStopStyle(item.position)"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, provide, reactive, toRefs } from 'vue'
import {
  useFormItemInputId,
  useLocale,
  useNamespace,
} from '@hongluan-ui/hooks'
import { sliderContextKey } from '@hongluan-ui/tokens'
import { sliderEmits, sliderProps } from './slider'
import SliderButton from './button.vue'
import SliderMarker from './marker'
import {
  useLifecycle,
  useMarks,
  useSlide,
  useStops,
  useWatch,
} from './composables'
import type { SliderInitData } from './slider'

defineOptions({
  name: 'Slider',
})

const props = defineProps(sliderProps)
const emit = defineEmits(sliderEmits)

const { namespace } = useNamespace('slider')
const { t } = useLocale()

const initData = reactive<SliderInitData>({
  firstValue: 0,
  secondValue: 0,
  oldValue: 0,
  dragging: false,
  sliderSize: 1,
})

const {
  formItem,
  slider,
  firstButton,
  secondButton,
  sliderDisabled,
  minValue,
  maxValue,
  runwayStyle,
  barStyle,
  resetSize,
  emitChange,
  onSliderWrapperPrevent,
  onSliderClick,
  onSliderDown,
  setFirstValue,
  setSecondValue,
} = useSlide(props, initData, emit)

const { stops, getStopStyle } = useStops(props, initData, minValue, maxValue)

const { inputId, isLabeledByFormItem } = useFormItemInputId(props, {
  formItemContext: formItem,
})

const groupLabel = computed<string>(() => {
  return (
    props.label ||
    t('hl.slider.defaultLabel', {
      min: props.min,
      max: props.max,
    })
  )
})

const firstButtonLabel = computed<string>(() => {
  if (props.range) {
    return props.rangeStartLabel || t('hl.slider.defaultRangeStartLabel')
  } else {
    return groupLabel.value
  }
})

const firstValueText = computed<string>(() => {
  return props.formatValueText
    ? props.formatValueText(firstValue.value)
    : `${firstValue.value}`
})

const secondButtonLabel = computed<string>(() => {
  return props.rangeEndLabel || t('hl.slider.defaultRangeEndLabel')
})

const secondValueText = computed<string>(() => {
  return props.formatValueText
    ? props.formatValueText(secondValue.value)
    : `${secondValue.value}`
})

const markList = useMarks(props)

useWatch(props, initData, minValue, maxValue, emit, formItem!)

const precision = computed(() => {
  const precisions = [props.min, props.max, props.step].map(item => {
    const decimal = `${item}`.split('.')[1]
    return decimal ? decimal.length : 0
  })
  return Math.max.apply(null, precisions)
})

const { sliderWrapper } = useLifecycle(props, initData, resetSize)

const { firstValue, secondValue, sliderSize } = toRefs(initData)

const updateDragging = (val: boolean) => {
  initData.dragging = val
}

provide(sliderContextKey, {
  ...toRefs(props),
  sliderSize,
  disabled: sliderDisabled,
  precision,
  emitChange,
  resetSize,
  updateDragging,
})

defineExpose({
  onSliderClick,
})
</script>
