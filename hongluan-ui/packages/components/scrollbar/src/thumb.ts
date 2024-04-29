import { buildProps } from '@hongluan-ui/utils'
import type { ExtractPropTypes } from 'vue'
import type ScrollbarThumb from './thumb.vue'

export const scrollbarThumbProps = buildProps({
  vertical: Boolean,
  size: String,
  move: Number,
  ratio: {
    type: Number,
    required: true,
  },
  always: Boolean,
} as const)
export type ScrollbarThumbProps = ExtractPropTypes<typeof scrollbarThumbProps>
export type ScrollbarThumbInstance = InstanceType<typeof ScrollbarThumb>
