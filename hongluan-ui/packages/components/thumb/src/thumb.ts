import { isNumber, isValidComponentSize, isValidComponentType } from '@hongluan-ui/utils'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ComponentSize, ComponentType } from '@hongluan-ui/constants'
import type Thumb from './thumb.vue'

export const thumbProps = {
  appendToBody: {
    type: Boolean,
    default: false,
  },
  hideOnClickModal: {
    type: Boolean,
    default: false,
  },
  src: {
    type: String,
    default: '',
  },
  fit: {
    type: String,
    default: '',
  },
  lazy: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: String as PropType<'eager' | 'lazy'>,
  },
  scrollContainer: [String, Object] as PropType<string | HTMLElement | undefined>,
  previewSrcList: {
    type: Array as PropType<string[]>,
    default: () => [] as string[],
  },
  previewTeleported: {
    type: Boolean,
    default: false,
  },
  zIndex: {
    type: Number,
  },
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize,
  },
  type: {
    type: String as PropType<ComponentType>,
    validator: isValidComponentType,
  },
  round: Boolean,
  radius: Boolean,
  bordered: Boolean,
  effect: String,
  full: Boolean,
  initialIndex: {
    type: Number,
    default: 0,
  },
  infinite: {
    type: Boolean,
    default: true,
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
  zoomRate: {
    type: Number,
    default: 1.2,
  },
}
export type ThumbProps = ExtractPropTypes<typeof thumbProps>

export const thumbEmits = {
  load: (evt: Event) => evt instanceof Event,
  error: (evt: Event) => evt instanceof Event,
  switch: (val: number) => isNumber(val),
  close: () => true,
  show: () => true,
}
export type ThumbEmits = typeof thumbEmits
export type ThumbInstance = InstanceType<typeof Thumb>
