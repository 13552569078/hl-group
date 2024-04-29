import { isValidComponentSize } from '@hongluan-ui/utils'
import { useTooltipContentProps } from '@hongluan-ui/components/tooltip'
import { disabledTimeListsProps } from '../props/shared'

import type { Dayjs } from 'dayjs'
import type { ExtractPropTypes, PropType } from 'vue'
import type { Options } from '@popperjs/core'
import type { ComponentSize } from '@hongluan-ui/constants'

export type SingleOrRange<T> = T | [T, T]
export type DateModelType = number | string | Date
export type ModelValueType = SingleOrRange<DateModelType>
export type DayOrDays = SingleOrRange<Dayjs>
export type DateOrDates = SingleOrRange<Date>
export type UserInput = SingleOrRange<string | null>
export type GetDisabledHours = (role: string, comparingDate?: Dayjs) => number[]
export type GetDisabledMinutes = (
  hour: number,
  role: string,
  comparingDate?: Dayjs
) => number[]
export type GetDisabledSeconds = (
  hour: number,
  minute: number,
  role: string,
  comparingDate?: Dayjs
) => number[]

export const timePickerDefaultProps = {
  id: {
    type: [Array, String] as PropType<SingleOrRange<string>>,
  },
  name: {
    type: [Array, String] as PropType<SingleOrRange<string>>,
    default: '',
  },
  popperClass: {
    type: String,
    default: '',
  },
  popperOffset: {
    type: Number,
    default: 4,
  },
  format:  String,
  valueFormat: String,
  type: {
    type: String,
    default: '',
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  editable: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [Date, Array, String, Number] as PropType<ModelValueType>,
    default: '',
  },
  popperOptions: {
    type: Object as PropType<Partial<Options>>,
    default: () => ({}),
  },
  rangeSeparator: {
    type: String,
    default: '-',
  },
  startPlaceholder: String,
  endPlaceholder: String,
  defaultValue: {
    type: [Date, Array] as PropType<SingleOrRange<Date>>,
  },
  defaultTime: {
    type: [Date, Array] as PropType<SingleOrRange<Date>>,
  },
  isRange: {
    type: Boolean,
    default: false,
  },
  ...disabledTimeListsProps,
  disabledDate: {
    type: Function,
  },
  cellClassName: {
    type: Function,
  },
  shortcuts: {
    type: Array,
    default: () => ([]),
  },
  arrowControl: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: undefined,
  },
  tabindex: {
    type: [String, Number],
    default: 0,
  },
  validateEvent: {
    type: Boolean,
    default: true,
  },
  fill: Boolean,
  unlinkPanels: Boolean,
  block: Boolean,
  thin: Boolean,
  teleported: useTooltipContentProps.teleported,
}

export type TimePickerDefaultProps = ExtractPropTypes<
  typeof timePickerDefaultProps
>

export interface PickerOptions {
  isValidValue: (date: DayOrDays) => boolean
  handleKeydownInput: (event: KeyboardEvent) => void
  parseUserInput: (value: UserInput) => DayOrDays
  formatToString: (value: DayOrDays) => UserInput
  getRangeAvailableTime: (date: DayOrDays) => DayOrDays
  getDefaultValue: () => DayOrDays
  panelReady: boolean
  handleClear: () => void
  handleFocusPicker?: () => void
}
