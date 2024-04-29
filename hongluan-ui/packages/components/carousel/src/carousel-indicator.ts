import { buildProps } from '@hongluan-ui/utils'
import type { ExtractPropTypes } from 'vue'


export const carouselIndicatorProps = buildProps({
  index: {
    type: Number,
    default: 0,
  },
} as const)

export type CarouselIndicatorProps = ExtractPropTypes<typeof carouselIndicatorProps>
