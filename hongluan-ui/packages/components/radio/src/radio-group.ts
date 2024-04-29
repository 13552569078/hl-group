import { groupProps } from '@hongluan-ui/components/group'
import { radioEmits } from './radio'

import type { ExtractPropTypes } from 'vue'
import type RadioGroup from './radio-group.vue'

export const radioGroupProps = {
  id: {
    type: String,
    default: undefined,
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: '',
  },
  bold: Boolean,
  custom: Boolean,
  label: {
    type: String,
    default: undefined,
  },
  name: {
    type: String,
    default: undefined,
  },
  validateEvent: {
    type: Boolean,
    default: true,
  },
  ...groupProps,
}
export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>

export const radioGroupEmits = radioEmits
export type RadioGroupEmits = typeof radioGroupEmits
export type RadioGroupInstance = InstanceType<typeof RadioGroup>
