import { isValidComponentSize, isValidComponentType } from '@hongluan-ui/utils'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ComponentSize, ComponentType } from '@hongluan-ui/constants'
import type Icon from './icon.vue'

export const iconProps = {
  type: {
    type: String as PropType<ComponentType>,
    validator: isValidComponentType,
  },
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize,
  },
  name: {
    type: String,
    default: '',
  },
  color: String,
  border: Number,
  opacity: Number,
  width: [Number, String],
  height: [Number, String],
  gradient: Boolean,
  startColor: String,
  fill: Boolean,
  round: Boolean,
  radius: Boolean,
  transition: Boolean,
  effect: String,
}
export type IconProps = ExtractPropTypes<typeof iconProps>
export type IconInstance = InstanceType<typeof Icon>
