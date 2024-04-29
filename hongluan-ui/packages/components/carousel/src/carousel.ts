import { buildProps, isNumber } from '@hongluan-ui/utils'
import type { ExtractPropTypes, PropType } from 'vue'

export const carouselProps = buildProps({
  initialIndex: {
    type: Number,
    default: 0,
  },
  height: {
    type: String,
    default: '',
  },
  trigger: {
    type: String as PropType<'hover' | 'click'>,
    default: 'hover',
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
  interval: {
    type: Number,
    default: 3000,
  },
  indicatorPosition: {
    type: String,
    default: '',
  },
  indicator: {
    type: Boolean,
    default: true,
  },
  arrow: {
    type: String,
    default: 'hover',
  },
  type: { type: String, default: '' },
  loop: {
    type: Boolean,
    default: true,
  },
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
    validator(val: string) {
      return ['horizontal', 'vertical'].includes(val)
    },
  },
  pauseOnHover: {
    type: Boolean,
    default: true,
  },
  indicatorType: {
    type: String as PropType<'line' | 'dot' | 'custom'>,
    default: 'line',
    validator(val: string) {
      return ['line', 'dot' , 'custom'].includes(val)
    },
  },
  itemsNumber:{
    type: Number,
    default: 1,
  },
  itemsWidth:{
    type: [String, Number],
    default: '',
  },
} as const)

export const carouselEmits = {
  change: (current: number, prev: number) => [current, prev].every(isNumber),
}

export type CarouselProps = ExtractPropTypes<typeof carouselProps>
export type CarouselEmits = typeof carouselEmits
