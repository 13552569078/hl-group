import { isValidComponentType, isValidComponentSize } from '@hongluan-ui/utils'

import type { ComponentType, ComponentSize } from '@hongluan-ui/constants'
import type { ExtractPropTypes, PropType } from 'vue'

export const buttonIconPosition = ['left', 'right'] as const
export type ButtonIconPosition = typeof buttonIconPosition[number]

export const buttonNativeTypes = ['button', 'submit', 'reset'] as const
export type ButtonNativeTypes = typeof buttonNativeTypes[number]

export const buttonProps = {
  /**
   * @description button type
   */
  type: {
    type: String as PropType<ComponentType>,
    validator: isValidComponentType,
  },
  /**
   * @description button size
   */
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize,
  },
  iconPosition: {
    type: String as PropType<ButtonIconPosition>,
    default: '',
  },
  /**
   * @description native button type
   */
  nativeType: {
    type: String as PropType<ButtonNativeTypes>,
    default: 'button',
    validator: (val: ButtonNativeTypes) => buttonNativeTypes.includes(val),
  },
  /**
   * @description determine whether it's loading
   */
  loading: Boolean,
  /**
   * @description disable the button
   */
  disabled: Boolean,
  /**
   * @description native button autofocus
   */
  autofocus: Boolean,
  /**
   * @description determine whether it's a round button
   */
  round: Boolean,
  equal: Boolean,
  effect: String,
  noFill: Boolean,
  outline: Boolean,
  block: Boolean,
  rational: Boolean,
  dashed: Boolean,
  hover: [Boolean, String],
}

export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonEmits = typeof buttonEmits
