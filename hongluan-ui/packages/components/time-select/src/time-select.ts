import { useTooltipContentProps } from '@hongluan-ui/components/tooltip'

import type TimeSelect from './time-select.vue'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ComponentSize } from '@hongluan-ui/constants'

export const timeSelectProps = {
  format: {
    type: String,
    default: 'HH:mm',
  },
  modelValue: String,
  disabled: {
    type: Boolean,
    default: false,
  },
  editable: {
    type: Boolean,
    default: true,
  },
  effect: {
    type: String as PropType<'light' | 'dark' | string>,
    default: 'light',
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String as PropType<ComponentSize>,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  start: {
    type: String,
    default: '09:00',
  },
  end: {
    type: String,
    default: '18:00',
  },
  step: {
    type: String,
    default: '00:30',
  },
  minTime: {
    type: String,
    default: '',
  },
  maxTime: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  teleported: useTooltipContentProps.teleported,
}

export type TimeSelectProps = ExtractPropTypes<typeof timeSelectProps>

export type TimeSelectInstance = InstanceType<typeof TimeSelect>
