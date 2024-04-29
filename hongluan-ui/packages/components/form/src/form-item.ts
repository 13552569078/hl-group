import { isValidComponentSize } from '@hongluan-ui/utils'

import type { ExtractPropTypes, PropType } from 'vue'
import type { Arrayable } from '@hongluan-ui/utils'
import type { ComponentSize } from '@hongluan-ui/constants'
import type { FormItemRule } from '@hongluan-ui/tokens'

export const formItemValidateStates = [
  '',
  'error',
  'validating',
  'success',
] as const
export type FormItemValidateState = typeof formItemValidateStates[number]

export type FormItemProp = Arrayable<string>

export const formItemProps = {
  label: String,
  width: [String, Array],
  labelPosition: [String, Array],
  prop: [String, Array] as PropType<string | FormItemProp>,
  required: {
    type: Boolean,
    default: undefined,
  },
  rules: [Object, Array] as PropType<FormItemRule | FormItemRule[]>,
  error: String,
  validateStatus: String as PropType<FormItemValidateState>,
  for: String,
  showMessage: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize,
  },
  gap: {
    type: String,
    default: '',
  },
  offset: {
    type: String,
    default: '',
  },
}
export type FormItemProps = ExtractPropTypes<typeof formItemProps>
