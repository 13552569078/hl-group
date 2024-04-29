
import { isNil } from 'lodash-unified'
import { isNumber, isValidComponentSize } from '@hongluan-ui/utils'
import { CHANGE_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT, type ComponentSize } from '@hongluan-ui/constants'
import { groupProps } from '@hongluan-ui/components/group'

import type { ExtractPropTypes, PropType } from 'vue'
import type InputNumber from './input-number.vue'

export const inputNumberProps = {
  id: {
    type: String,
    default: undefined,
  },
  modelValue: {
    type: Number,
  },
  step: {
    type: Number,
    default: 1,
  },
  stepStrictly: {
    type: Boolean,
    default: false,
  },
  max: {
    type: Number,
    default: Number.POSITIVE_INFINITY,
  },
  min: {
    type: Number,
    default: Number.NEGATIVE_INFINITY,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize,
  },
  controls: {
    type: Boolean,
    default: true,
  },
  controlsPosition: {
    type: String,
    default: 'initial',
  },
  valueOnClear: {
    type: [String, Number, null],
    validator: (val: 'min' | 'max' | number | null) =>
      val === null || isNumber(val) || ['min', 'max'].includes(val),
    default: null,
  },
  name: String,
  label: String,
  placeholder: String,
  readonly: Boolean,
  precision: {
    type: Number,
    validator: (val: number) => val >= 0 && val === Number.parseInt(val + '', 10),
  },
  validateEvent: {
    type: Boolean,
    default: true,
  },
  merge: {
    type: Boolean,
    default: false,
  },
  deepMerge: {
    type: Boolean,
    default: false,
  },
  indent: {
    type: [Boolean, String],
    default: false,
  },
  gap: {
    type: [Boolean, String],
    default: false,
  },
  round: Boolean,
  fill: Boolean,
  block: Boolean,
  dir: groupProps.dir,
}

export const inputNumberEmits = {
  [CHANGE_EVENT]: (cur: number | undefined, prev: number | undefined) =>
    prev !== cur,
  blur: (e: FocusEvent) => e instanceof FocusEvent,
  focus: (e: FocusEvent) => e instanceof FocusEvent,
  [INPUT_EVENT]: (val: number | null | undefined) =>
    isNumber(val) || isNil(val),
  [UPDATE_MODEL_EVENT]: (val: number | undefined) =>
    isNumber(val) || isNil(val),
}
export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>
export type InputNumberEmits = typeof inputNumberEmits
export type InputNumberInstance = InstanceType<typeof InputNumber>
