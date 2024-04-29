import { buildProps } from '@hongluan-ui/utils'
import type { ExtractPropTypes } from 'vue'
import type Bar from './bar.vue'

export const barProps = buildProps({
  always: {
    type: Boolean,
    default: true,
  },
  width: {
    type: String,
    default: '',
  },
  height: {
    type: String,
    default: '',
  },
  ratioX: {
    type: Number,
    default: 1,
  },
  ratioY: {
    type: Number,
    default: 1,
  },
} as const)
export type BarProps = ExtractPropTypes<typeof barProps>
export type BarInstance = InstanceType<typeof Bar>
