import { CHANGE_EVENT } from '@hongluan-ui/constants'
import { isNumber } from '@hongluan-ui/utils'

import type { ExtractPropTypes } from 'vue'
import type Steps from './steps.vue'

export const stepsProps = {
  size: {
    type: [Number, String],
    default: '',
  },
  gap: {
    type: [Number, String],
    default: '',
  },
  itemPadding: {
    type: [Number, String],
    default: '',
  },
  active: {
    type: Number,
    default: 0,
  },
  dir: {
    type: String,
    default: 'horizontal',
    validator: (val: string): boolean => ['horizontal', 'vertical'].includes(val),
  },
  round: {
    type: Boolean,
    default: false,
  },
  center: {
    type: Boolean,
    default: false,
  },
  simple: {
    type: Boolean,
    default: false,
  },
  finishStatus: {
    type: String,
    default: 'finish',
    validator: (val: string): boolean => ['wait', 'process', 'finish', 'error', 'success'].includes(val),
  },
  processStatus: {
    type: String,
    default: 'process',
    validator: (val: string): boolean => ['wait', 'process', 'finish', 'error', 'success'].includes(val),
  },
}
export type StepsProps = ExtractPropTypes<typeof stepsProps>

export const stepsEmits = {
  [CHANGE_EVENT]: (newVal: number, oldVal: number) =>
    isNumber(newVal) && isNumber(oldVal),
}
export type StepsEmits = typeof stepsEmits
export type StepsInstance = InstanceType<typeof Steps>
