<template>
  <div
    :class="[
      namespace + '-input-number',
      namespace + '-group',
      dir,
      merge ? 'merge' : '',
      deepMerge ? 'deep-merge' : '',
      indent ? 'indent' : '',
      round ? 'round' : '',
      block ? 'block' : '',
      inputNumberSize ? inputNumberSize : '',
      controlsPosition === 'inner' ? 'btn-inner' : '',
      { 'btn-vertical': ['left', 'right'].includes(controlsPosition) },
      { 'is-disabled': inputNumberDisabled },
      { 'is-without-controls': !controls },
    ]"
    :style="[typeof indent === 'string' ? `--indent:${indent}` : '', typeof gap === 'string' ? `gap: ${gap}` : '']"
    @dragstart.prevent
  >
    <hl-button
      v-if="(controls && 'initial' === controlsPosition) || 'inner' === controlsPosition"
      v-repeat-click="decrease"
      :class="['group-item', 'decrease', round ? 'round' : '', inputNumberFill ? 'light' : '']"
      :size="inputNumberSize"
      :disabled="minDisabled || inputNumberDisabled"
      :aria-label="t('hl.inputNumber.decrease')"
    >
      <slot name="icon-decrease">
        <hl-icon>
          <system-remove />
        </hl-icon>
      </slot>
    </hl-button>
    <div
      v-if="controls && controlsPosition === 'left'"
      :class="[namespace + '-group', 'btn-group', 'vertical', 'left', 'merge', 'indent']"
    >
      <hl-button
        v-repeat-click="increase"
        class="group-item increase"
        :disabled="maxDisabled || inputNumberDisabled"
        :size="inputNumberSize"
        :aria-label="t('hl.inputNumber.increase')"
      >
        <slot name="icon-increase">
          <hl-icon>
            <system-arrow-up />
          </hl-icon>
        </slot>
      </hl-button>
      <hl-button
        v-repeat-click="decrease"
        class="group-item decrease"
        :disabled="minDisabled || inputNumberDisabled"
        :size="inputNumberSize"
        :aria-label="t('hl.inputNumber.decrease')"
      >
        <slot name="icon-decrease">
          <hl-icon>
            <system-arrow-down />
          </hl-icon>
        </slot>
      </hl-button>
    </div>
    <hl-input
      :id="id"
      ref="input"
      native-type="number"
      class="group-item"
      :validate-event="false"
      :model-value="displayValue"
      :step="step"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="inputNumberDisabled"
      :size="inputNumberSize"
      :max="max"
      :min="min"
      :name="name"
      :label="label"
      :fill="inputNumberFill"
      :round="round"
      @keydown.up.prevent="increase"
      @keydown.down.prevent="decrease"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleInput"
      @change="handleInputChange"
    >
      <template v-if="$slots.prefix" #prefix>
        <slot name="prefix"></slot>
      </template>
      <template v-if="$slots.suffix" #suffix>
        <slot name="suffix"></slot>
      </template>
    </hl-input>
    <div
      v-if="controls && controlsPosition === 'right'"
      :class="[namespace + '-group', 'btn-group', 'vertical', 'right', 'merge', 'indent']"
    >
      <hl-button
        v-repeat-click="increase"
        class="group-item increase"
        :disabled="maxDisabled || inputNumberDisabled"
        :size="inputNumberSize"
        :aria-label="t('hl.inputNumber.increase')"
      >
        <slot name="icon-increase">
          <hl-icon>
            <system-arrow-up />
          </hl-icon>
        </slot>
      </hl-button>
      <hl-button
        v-repeat-click="decrease"
        class="group-item decrease"
        :disabled="minDisabled || inputNumberDisabled"
        :size="inputNumberSize"
        :aria-label="t('hl.inputNumber.decrease')"
      >
        <slot name="icon-increase">
          <hl-icon>
            <system-arrow-down />
          </hl-icon>
        </slot>
      </hl-button>
    </div>
    <hl-button
      v-if="(controls && 'initial' === controlsPosition) || 'inner' === controlsPosition"
      v-repeat-click="increase"
      :class="['group-item', 'increase', round ? 'round' : '', inputNumberFill ? 'light' : '']"
      :size="inputNumberSize"
      :disabled="maxDisabled || inputNumberDisabled"
      :aria-label="t('hl.inputNumber.increase')"
    >
      <slot name="icon-increase">
        <hl-icon>
          <system-add />
        </hl-icon>
      </slot>
    </hl-button>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, onUpdated, reactive, ref, watch } from 'vue'
import { isNil } from 'lodash-unified'
import { vRepeatClick } from '@hongluan-ui/directives'
import HlInput from '@hongluan-ui/components/input'
import HlButton from '@hongluan-ui/components/button'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemAdd, SystemRemove, SystemArrowDown, SystemArrowUp } from '@hongluan-ui/components/system-icon'
import {
  useLocale,
  useNamespace,
  useConsistentProp,
} from '@hongluan-ui/hooks'
import { formItemContextKey, FormItemEvents } from '@hongluan-ui/tokens'
import { debugWarn, isNumber, isString, isUndefined } from '@hongluan-ui/utils'
import {
  CHANGE_EVENT,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT,
} from '@hongluan-ui/constants'
import { inputNumberEmits, inputNumberProps } from './input-number'

import type { InputInstance } from '@hongluan-ui/components/input'
import type { FormItemContext } from '@hongluan-ui/tokens'

defineOptions({
  name: 'InputNumber',
})

const props = defineProps(inputNumberProps)
const emit = defineEmits(inputNumberEmits)

const { t } = useLocale()
const { namespace } = useNamespace()
const input = ref<InputInstance>()

interface Data {
  currentValue: number | null | undefined
  userInput: null | number | string
}
const data = reactive<Data>({
  currentValue: props.modelValue,
  userInput: null,
})

const formItem = inject(formItemContextKey, {} as FormItemContext)

const minDisabled = computed(
  () => isNumber(props.modelValue) && props.modelValue <= props.min,
)
const maxDisabled = computed(
  () => isNumber(props.modelValue) && props.modelValue >= props.max,
)

const numPrecision = computed(() => {
  const stepPrecision = getPrecision(props.step)
  if (!isUndefined(props.precision)) {
    if (stepPrecision > props.precision) {
      debugWarn(
        'InputNumber',
        'precision should not be less than the decimal places of step',
      )
    }
    return props.precision
  } else {
    return Math.max(getPrecision(props.modelValue), stepPrecision)
  }
})

const { size: inputNumberSize, disabled: inputNumberDisabled, fill: inputNumberFill } = useConsistentProp()

const displayValue = computed(() => {
  if (data.userInput !== null) {
    return data.userInput
  }
  let currentValue: number | string | undefined | null = data.currentValue
  if (isNil(currentValue)) return ''
  if (isNumber(currentValue)) {
    if (Number.isNaN(currentValue)) return ''
    if (!isUndefined(props.precision)) {
      currentValue = currentValue.toFixed(props.precision)
    }
  }
  return currentValue
})
const toPrecision = (num: number, pre?: number) => {
  if (isUndefined(pre)) pre = numPrecision.value
  if (pre === 0) return Math.round(num)
  let snum = String(num)
  const pointPos = snum.indexOf('.')
  if (pointPos === -1) return num
  const nums = snum.replace('.', '').split('')
  const datum = nums[pointPos + pre]
  if (!datum) return num
  const length = snum.length
  if (snum.charAt(length - 1) === '5') {
    snum = `${snum.slice(0, Math.max(0, length - 1))}6`
  }
  return Number.parseFloat(Number(snum).toFixed(pre))
}
const getPrecision = (value: number | null | undefined) => {
  if (isNil(value)) return 0
  const valueString = value.toString()
  const dotPosition = valueString.indexOf('.')
  let precision = 0
  if (dotPosition !== -1) {
    precision = valueString.length - dotPosition - 1
  }
  return precision
}
const ensurePrecision = (val: number, coefficient: 1 | -1 = 1) => {
  if (!isNumber(val)) return data.currentValue
  // Solve the accuracy problem of JS decimal calculation by converting the value to integer.
  return toPrecision(val + props.step * coefficient)
}
const increase = () => {
  if (props.readonly || inputNumberDisabled.value || maxDisabled.value) return
  const value = Number(displayValue.value) || 0
  const newVal = ensurePrecision(value)
  setCurrentValue(newVal)
  emit(INPUT_EVENT, data.currentValue)
}
const decrease = () => {
  if (props.readonly || inputNumberDisabled.value || minDisabled.value) return
  const value = Number(displayValue.value) || 0
  const newVal = ensurePrecision(value, -1)
  setCurrentValue(newVal)
  emit(INPUT_EVENT, data.currentValue)
}
const verifyValue = (
  value: number | string | null | undefined,
  update?: boolean,
): number | null | undefined => {
  const { max, min, step, precision, stepStrictly, valueOnClear } = props
  let newVal = Number(value)
  if (isNil(value) || Number.isNaN(newVal)) {
    return null
  }
  if (value === '') {
    if (valueOnClear === null) {
      return null
    }
    newVal = isString(valueOnClear) ? { min, max }[valueOnClear] : valueOnClear
  }
  if (stepStrictly) {
    newVal = toPrecision(Math.round(newVal / step) * step, precision)
  }
  if (!isUndefined(precision)) {
    newVal = toPrecision(newVal, precision)
  }
  if (newVal > max || newVal < min) {
    newVal = newVal > max ? max : min
    update && emit(UPDATE_MODEL_EVENT, newVal)
  }
  return newVal
}
const setCurrentValue = (
  value: number | string | null | undefined,
  emitChange = true,
) => {
  const oldVal = data.currentValue
  const newVal = verifyValue(value)
  if (oldVal === newVal) return
  if (!emitChange) {
    emit(UPDATE_MODEL_EVENT, newVal!)
    return
  }
  data.userInput = null
  emit(UPDATE_MODEL_EVENT, newVal!)
  emit(CHANGE_EVENT, newVal!, oldVal!)
  if (props.validateEvent) {
    formItem?.validate?.('change').catch(err => debugWarn(err))
  }
  data.currentValue = newVal
}
const handleInput = (value: string) => {
  data.userInput = value
  const newVal = value === '' ? null : Number(value)
  emit(INPUT_EVENT, newVal)
  setCurrentValue(newVal, false)
}
const handleInputChange = (value: string) => {
  const newVal = value !== '' ? Number(value) : ''
  if ((isNumber(newVal) && !Number.isNaN(newVal)) || value === '') {
    setCurrentValue(newVal)
  }
  data.userInput = null
}

const focus = () => {
  input.value?.focus?.()
}

const blur = () => {
  input.value?.blur?.()
}

const handleFocus = (event: MouseEvent | FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: MouseEvent | FocusEvent) => {
  emit('blur', event)
  if (props.validateEvent) {
    formItem?.validate?.(FormItemEvents.blur).catch(err => debugWarn(err))
  }
}

watch(
  () => props.modelValue,
  value => {
    const userInput = verifyValue(data.userInput)
    const newValue = verifyValue(value, true)
    if (!isNumber(userInput) && (!userInput || userInput !== newValue)) {
      data.currentValue = newValue
      data.userInput = null
    }
  },
  { immediate: true },
)
onMounted(() => {
  const { min, max, modelValue } = props
  const innerInput = input.value?.input as HTMLInputElement
  innerInput.setAttribute('role', 'spinbutton')
  if (Number.isFinite(max)) {
    innerInput.setAttribute('aria-valuemax', String(max))
  } else {
    innerInput.removeAttribute('aria-valuemax')
  }
  if (Number.isFinite(min)) {
    innerInput.setAttribute('aria-valuemin', String(min))
  } else {
    innerInput.removeAttribute('aria-valuemin')
  }
  innerInput.setAttribute('aria-valuenow', String(data.currentValue))
  innerInput.setAttribute('aria-disabled', String(inputNumberDisabled.value))
  if (!isNumber(modelValue) && modelValue != null) {
    let val: number | null = Number(modelValue)
    if (Number.isNaN(val)) {
      val = null
    }
    emit(UPDATE_MODEL_EVENT, val!)
  }
})
onUpdated(() => {
  const innerInput = input.value?.input
  innerInput?.setAttribute('aria-valuenow', `${data.currentValue}`)
})
defineExpose({
  increase,
  decrease,
  /** @description get focus the input component */
  focus,
  /** @description remove focus the input component */
  blur,
})
</script>
