import { buildProps, definePropType, isBoolean, isNumber } from '@hongluan-ui/utils'

import type { ExtractPropTypes } from 'vue'
import type { ZIndexProperty } from 'csstype'
import type Affix from './affix.vue'
import { CHANGE_EVENT } from '@hongluan-ui/constants'

export const affixProps = buildProps({
  /**
   * @description affix element zIndex value
   * */
  zIndex: {
    type: definePropType<ZIndexProperty>([Number, String]),
    default: 100,
  },
  /**
   * @description target container. (CSS selector)
   */
  target: {
    type: String,
    default: '',
  },
  /**
   * @description offset distance
   * */
  offset: {
    type: Number,
    default: 0,
  },
  /**
   * @description position of affix
   * */
  position: {
    type: String,
    values: ['top', 'bottom'],
    default: 'top',
  },
} as const)

export const affixEmits = {
  scroll: ({ scrollTop, fixed }: { scrollTop: number; fixed: boolean; }) =>
    isNumber(scrollTop) && isBoolean(fixed),
  [CHANGE_EVENT]: (fixed: boolean) => isBoolean(fixed),
}

export type AffixProps = ExtractPropTypes<typeof affixProps>
export type AffixEmits = typeof affixEmits
export type AffixInstance = InstanceType<typeof Affix>
