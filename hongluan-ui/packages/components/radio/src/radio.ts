import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@hongluan-ui/constants'
import { isBoolean, isString, isNumber, isValidComponentSize, isValidComponentType } from '@hongluan-ui/utils'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ComponentSize, ComponentType } from '@hongluan-ui/constants'
import type Radio from './radio.vue'

export const radioProps = {
  modelValue: {
    type: [String, Number, Boolean],
    default: '',
  },
  label: {
    type: [String, Number, Boolean],
    default: '',
  },
  disabled: Boolean,
  fill: Boolean,
  custom: Boolean,
  name: {
    type: String,
    default: '',
  },
  type: {
    type: String as PropType<ComponentType>,
    validator: isValidComponentType,
  },
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize,
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
}

export const radioEmits = {
  [UPDATE_MODEL_EVENT]: (val: string | number | boolean) =>
    isString(val) || isNumber(val) || isBoolean(val),
  [CHANGE_EVENT]: (val: string | number | boolean) =>
    isString(val) || isNumber(val) || isBoolean(val),
}

export type RadioProps = ExtractPropTypes<typeof radioProps>
export type RadioEmits = typeof radioEmits
export type RadioInstance = InstanceType<typeof Radio>
