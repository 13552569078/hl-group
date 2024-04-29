import {
  UPDATE_MODEL_EVENT,
  CHANGE_EVENT,
  INPUT_EVENT,
} from '@hongluan-ui/constants'
import { isValidComponentSize, isValidComponentType, isBoolean, isNumber, isString } from '@hongluan-ui/utils'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ComponentSize, ComponentType } from '@hongluan-ui/constants'
import type Switch from './switch.vue'

export const switchProps = {
  modelValue: {
    type: [Boolean, String, Number],
    default: false,
  },
  value: {
    type: [Boolean, String, Number],
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<ComponentType>,
    validator: isValidComponentType,
  },
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize,
  },
  width: String,
  activeColor: {
    type: String,
    default: '',
  },
  inactiveColor: {
    type: String,
    default: '',
  },
  borderColor: {
    type: String,
    default: '',
  },
  activeValue: {
    type: [Boolean, String, Number],
    default: true,
  },
  inactiveValue: {
    type: [Boolean, String, Number],
    default: false,
  },
  name: {
    type: String,
    default: '',
  },
  validateEvent: {
    type: Boolean,
    default: true,
  },
  id: String,
  loading: {
    type: Boolean,
    default: false,
  },
  beforeChange: Function as PropType<() => (Promise<boolean> | boolean)>,
  tabindex: {
    type: [String, Number],
  },
}

export type SwitchProps = ExtractPropTypes<typeof switchProps>

export const switchEmits = {
  [UPDATE_MODEL_EVENT]: (val: boolean | string | number) =>
    isBoolean(val) || isString(val) || isNumber(val),
  [CHANGE_EVENT]: (val: boolean | string | number) =>
    isBoolean(val) || isString(val) || isNumber(val),
  [INPUT_EVENT]: (val: boolean | string | number) =>
    isBoolean(val) || isString(val) || isNumber(val),
}
export type SwitchEmits = typeof switchEmits
export type SwitchInstance = InstanceType<typeof Switch>
