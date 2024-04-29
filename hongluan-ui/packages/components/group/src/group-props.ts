import { isValidComponentSize, isValidComponentType } from '@hongluan-ui/utils'

import type { PropType } from 'vue'
import type { ComponentSize, ComponentType } from '@hongluan-ui/constants'

const groupProps = {
  dir: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
  },
  merge: {
    type: Boolean,
    default: false,
  },
  deepMerge: {
    type: Boolean,
    default: false,
  },
  indent: {
    type: [Boolean, String],
    default: false,
  },
  gap: String,
  gapX: String,
  gapY: String,
  full: {
    type: [Boolean, String],
    default: false,
  },
  wrap: {
    type: Boolean,
    default: false,
  },
  align: {
    type: String,
    default: '',
  },
  block: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize,
  },
  disabled: Boolean,
  fill: Boolean,
  type: {
    type: String as PropType<ComponentType>,
    validator: isValidComponentType,
  },
}

export { groupProps }
