import { buildProps } from '@hongluan-ui/utils'

import type { ExtractPropTypes } from 'vue'
import type Step from './item.vue'

export const stepProps = buildProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: '',
    values: ['', 'wait', 'process', 'finish', 'error', 'success'],
  },
} as const)
export type StepProps = ExtractPropTypes<typeof stepProps>
export type StepInstance = InstanceType<typeof Step>
