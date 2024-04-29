import { buildProps, definePropType } from '@hongluan-ui/utils'

import type { ExtractPropTypes } from 'vue'
import type { IDatePickerType } from '../date-picker.type'

export const datePickerProps = buildProps({
  type: {
    type: definePropType<IDatePickerType>(String),
    default: 'date',
  },
} as const)

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>
