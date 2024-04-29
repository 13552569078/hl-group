import {
  isArray,
  isString,
  isBoolean,
} from '@hongluan-ui/utils'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ComponentSize } from '@hongluan-ui/constants'
import type { FormRules } from '@hongluan-ui/tokens'
import type { FormItemProp } from './form-item'

export const formProps = {
  model: Object,
  rules: Object as PropType<FormRules>,
  labelPosition: [String, Array],
  width: [String, Array],
  labelSuffix: {
    type: String,
    default: '',
  },
  labelPrefix: {
    type: String,
    default: '',
  },
  inline: Boolean,
  showMessage: {
    type: Boolean,
    default: true,
  },
  statusIcon: Boolean,
  size: String as PropType<ComponentSize>,
  disabled: Boolean,
  validateOnRuleChange: {
    type: Boolean,
    default: true,
  },
  hideRequiredAsterisk: {
    type: Boolean,
    default: false,
  },
  requireAsteriskPosition: {
    type: String,
    values: ['left', 'right'],
    default: 'left',
  },
  gap: {
    type: String,
    default: '',
  },
  itemGap: {
    type: String,
    default: '',
  },
  itemGapX: {
    type: String,
    default: '',
  },
  itemGapY: {
    type: String,
    default: '',
  },
  scrollToError: Boolean,
  fill: Boolean,
}
export type FormProps = ExtractPropTypes<typeof formProps>

export const formEmits = {
  validate: (prop: FormItemProp, isValid: boolean, message: string) =>
    (isArray(prop) || isString(prop)) &&
    isBoolean(isValid) &&
    isString(message),
}
export type FormEmits = typeof formEmits
