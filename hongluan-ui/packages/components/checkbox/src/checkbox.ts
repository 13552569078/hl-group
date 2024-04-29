import { UPDATE_MODEL_EVENT } from '@hongluan-ui/constants'
import { isBoolean, isNumber, isString, isValidComponentSize, isValidComponentType } from '@hongluan-ui/utils'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ComponentSize, ComponentType } from '@hongluan-ui/constants'
import type Checkbox from './checkbox.vue'

export const checkboxProps = {
  /**
   * @description binding value
   */
  modelValue: {
    type: [Number, String, Boolean, Array],
    default: undefined,
  },
  /**
   * @description value of the Checkbox when used inside a `checkbox-group`
   */
  label: {
    type: [String, Boolean, Number, Object] as PropType<string | boolean | number | Record<string, unknown>>,
  },
  /**
   * @description Set indeterminate state, only responsible for style control
   */
  indeterminate: Boolean,
  /**
   * @description whether the Checkbox is disabled
   */
  disabled: Boolean,
  /**
   * @description if the Checkbox is checked
   */
  checked: Boolean,
  bold: Boolean,
  fill: Boolean,
  custom: Boolean,
  round: Boolean,
  /**
   * @description native 'name' attribute
   */
  name: {
    type: String,
    default: undefined,
  },
  /**
   * @description value of the Checkbox if it's checked
   */
  trueLabel: {
    type: [String, Number],
    default: undefined,
  },
  /**
   * @description value of the Checkbox if it's not checked
   */
  falseLabel: {
    type: [String, Number],
    default: undefined,
  },
  /**
   * @description input id
   */
  id: {
    type: String,
    default: undefined,
  },
  type: {
    type: String as PropType<ComponentType>,
    validator: isValidComponentType,
  },
  /**
   * @description size of the Checkbox
   */
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize,
  },
  /**
   * @description same as [aria-controls](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls), takes effect when `indeterminate` is `true`
   */
  controls: {
    type: String,
    default: undefined,
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
  /**
   * @description input tabindex
   */
  tabindex: [String, Number],
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
}

export type CheckboxValueType = string | number | boolean

export const checkboxEmits = {
  [UPDATE_MODEL_EVENT]: (val: CheckboxValueType) =>
    isString(val) || isNumber(val) || isBoolean(val),
  change: (val: CheckboxValueType) =>
    isString(val) || isNumber(val) || isBoolean(val),
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>
export type CheckboxEmits = typeof checkboxEmits
export type CheckboxInstance = InstanceType<typeof Checkbox>

