import { buildProps, definePropType, isArray } from '@hongluan-ui/utils'

import type { ExtractPropTypes, PropType } from 'vue'
import type { Dayjs } from 'dayjs'
import type { DatePickType } from '@hongluan-ui/constants'

const selectionModes = ['date', 'dates', 'year', 'month', 'week', 'range']

export type RangeState = {
  endDate: null | Dayjs
  selecting: boolean
}

export const datePickerSharedProps = buildProps({
  disabledDate: {
    type: definePropType<(date: Date) => boolean>(Function),
  },
  date: {
    type: definePropType<Dayjs>(Object),
  },
  minDate: {
    type: definePropType<Dayjs | null>(Object),
  },
  maxDate: {
    type: definePropType<Dayjs | null>(Object),
  },
  parsedValue: {
    type: definePropType<Dayjs | Dayjs[]>([Object, Array]),
  },
  rangeState: {
    type: definePropType<RangeState>(Object),
    default: () => ({
      endDate: null,
      selecting: false,
    }),
  },
} as const)

export const panelSharedProps = {
  type: {
    type: String as PropType<DatePickType>,
    required: true,
  },
}
export const panelRangeSharedProps = {
  unlinkPanels: Boolean,
  parsedValue: {
    type: Array as PropType<Dayjs[]>,
  },
}
export const selectionModeWithDefault = (
  mode: typeof selectionModes[number],
) => {
  return {
    type: String,
    values: selectionModes,
    default: mode,
  }
}

export const rangePickerSharedEmits = {
  pick: (range: [Dayjs, Dayjs]) => isArray(range),
}

export type RangePickerSharedEmits = typeof rangePickerSharedEmits
export type PanelRangeSharedProps = ExtractPropTypes<
  typeof panelRangeSharedProps
>
