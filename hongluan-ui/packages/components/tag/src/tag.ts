import { isValidComponentSize, isValidComponentType } from '@hongluan-ui/utils'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ComponentSize, ComponentType } from '@hongluan-ui/constants'
import type Tag from './tag.vue'

export const tagProps = {
  closable: Boolean,
  type: {
    type: String as PropType<ComponentType>,
    validator: isValidComponentType,
  },
  disableTransitions: Boolean,
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize,
  },
  color: {
    type: String,
    default: '',
  },
  effect: String,
  outline: Boolean,
  round: Boolean,
  active: Boolean,
} as const
export type TagProps = ExtractPropTypes<typeof tagProps>

export const tagEmits = {
  close: (evt: MouseEvent) => evt instanceof MouseEvent,
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}
export type TagEmits = typeof tagEmits
export type TagInstance = InstanceType<typeof Tag>
