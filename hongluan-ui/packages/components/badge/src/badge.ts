import { isValidComponentType } from '@hongluan-ui/utils'

import type { ComponentType } from '@hongluan-ui/constants'
import type { ExtractPropTypes, PropType } from 'vue'

export type BadgePosition = 'lt' | 'rt' | 'lb' | 'rb'

export const badgeProps = {
  /**
   * @description display value.
   */
  value: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  /**
   * @description maximum value, shows `{max}+` when exceeded. Only works if value is a number.
   */
  max: {
    type: Number,
    default: 99,
  },
  position: String as PropType<BadgePosition>,
  offset: Array as PropType<string[]>,
  /**
   * @description if a little dot is displayed.
   */
  dot: Boolean,
  round: Boolean,
  hidden: Boolean,
  /**
   * @description badge type.
   */
  type: {
    type: String as PropType<ComponentType>,
    validator: isValidComponentType,
  },
}

export type BadgeProps = ExtractPropTypes<typeof badgeProps>
