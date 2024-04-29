<template>
  <div
    :class="[
      {
        'has-sidebar': $slots.sidebar || hasShortcuts,
        'has-time': showTime,
      },
      namespace + '-date-picker',
    ]"
  >
    <div class="picker-wrapper">
      <slot name="sidebar" :class="['picker-sidebar', namespace + '-group', 'vertical']"></slot>
      <hl-group v-if="hasShortcuts" :class="['picker-sidebar']" dir="vertical">
        <hl-group v-for="(shortcut, key) in shortcuts" :key="key" class="p-x-sm p-y-xxs hover:text-hover cursor-pointer" @click="handleShortcutClick(shortcut)">
          {{ shortcut.text }}
        </hl-group>
      </hl-group>
      <div class="picker-body">
        <hl-group v-if="showTime" class="picker-time-header" deep-merge indent full>
          <hl-input
            :placeholder="t('hl.datepicker.selectDate')"
            size="sm"
            :model-value="visibleDate"
            :validate-event="false"
            @input="(val) => (userInputDate = val)"
            @change="handleVisibleDateChange"
          >
            <template #prefix>
              <hl-icon>
                <system-calendar />
              </hl-icon>
            </template>
          </hl-input>
          <div v-click-outside="handleTimePickClose">
            <hl-input
              :placeholder="t('hl.datepicker.selectTime')"
              :model-value="visibleTime"
              size="sm"
              :validate-event="false"
              @focus="onTimePickerInputFocus"
              @input="(val) => (userInputTime = val)"
              @change="handleVisibleTimeChange"
            >
              <template #prefix>
                <hl-icon>
                  <system-clock />
                </hl-icon>
              </template>
            </hl-input>
            <time-pick-panel :visible="timePickerVisible" :format="timeFormat" :time-arrow-control="arrowControl" :parsed-value="innerDate" @pick="handleTimePick" />
          </div>
        </hl-group>
        <!--:class="{ '': currentView === 'year' || currentView === 'month' }"-->
        <div v-show="currentView !== 'time'" :class="['picker-body-header', namespace + '-group', 'full']">
          <div class="group-item static">
            <hl-button size="sm" class="prev-year" equal :aria-label="t(`hl.datepicker.prevYear`)" @click="moveByYear(false)">
              <hl-icon>
                <system-double-arrow-left />
              </hl-icon>
            </hl-button>
            <hl-button
              v-show="currentView === 'date'"
              size="sm"
              class="prev-month"
              equal
              :aria-label="t(`hl.datepicker.prevMonth`)"
              @click="moveByMonth(false)"
            >
              <hl-icon>
                <system-arrow-left />
              </hl-icon>
            </hl-button>
          </div>
          <div class="header-label group-item">
            <hl-button
              role="button"
              aria-live="polite"
              tabindex="0"
              @keydown.enter="showPicker('year')"
              @click="showPicker('year')"
            >
              {{ yearLabel }}
            </hl-button>
            <hl-button
              v-show="currentView === 'date'"
              role="button"
              aria-live="polite"
              tabindex="0"
              :class="{ active: currentView === 'month' }"
              @keydown.enter="showPicker('month')"
              @click="showPicker('month')"
            >
              {{ t(`hl.datepicker.month${month + 1}`) }}
            </hl-button>
          </div>
          <div class="group-item static">
            <hl-button
              v-show="currentView === 'date'"
              size="sm"
              class="next-month"
              equal
              :aria-label="t(`hl.datepicker.nextMonth`)"
              @click="moveByMonth(true)"
            >
              <hl-icon>
                <system-arrow-right />
              </hl-icon>
            </hl-button>
            <hl-button size="sm" class="next-year" equal :aria-label="t(`hl.datepicker.nextYear`)" @click="moveByYear(true)">
              <hl-icon>
                <system-double-arrow-right />
              </hl-icon>
            </hl-button>
          </div>
        </div>
        <div class="picker-body-content" @keydown="handleKeydownTable">
          <date-table
            v-if="currentView === 'date'"
            ref="currentViewRef"
            :selection-mode="selectionMode"
            :date="innerDate"
            :parsed-value="parsedValue"
            :disabled-date="disabledDate"
            :cell-class-name="cellClassName"
            @pick="handleDatePick"
          />
          <year-table
            v-if="currentView === 'year'"
            ref="currentViewRef"
            :date="innerDate"
            :disabled-date="disabledDate"
            :parsed-value="parsedValue"
            @pick="handleYearPick"
          />
          <month-table
            v-if="currentView === 'month'"
            ref="currentViewRef"
            :date="innerDate"
            :parsed-value="parsedValue"
            :disabled-date="disabledDate"
            @pick="handleMonthPick"
          />
        </div>
      </div>
    </div>
    <div v-show="footerVisible && currentView === 'date'" class="picker-footer">
      <hl-button v-show="selectionMode !== 'dates'" type="link" class="" @click="changeToNow">
        {{ t('hl.datepicker.now') }}
      </hl-button>
      <hl-button plain type="primary" class="" @click="onConfirm">
        {{ t('hl.datepicker.confirm') }}
      </hl-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  inject,
  nextTick,
  ref,
  toRef,
  useAttrs,
  useSlots,
  watch,
} from 'vue'
import dayjs from 'dayjs'
import { ClickOutside as vClickOutside } from '@hongluan-ui/directives'
import { useLocale, useNamespace } from '@hongluan-ui/hooks'
import {
  TimePickPanel,
  extractDateFormat,
  extractTimeFormat,
} from '@hongluan-ui/components/time-picker'
import HlInput from '@hongluan-ui/components/input'
import HlButton from '@hongluan-ui/components/button'
import HlGroup from '@hongluan-ui/components/group'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemCalendar, SystemClock, SystemArrowLeft, SystemArrowRight, SystemDoubleArrowLeft, SystemDoubleArrowRight } from '@hongluan-ui/components/system-icon'
import { isArray, isFunction } from '@hongluan-ui/utils'
import { EVENT_CODE } from '@hongluan-ui/constants'
import { TOOLTIP_INJECTION_KEY } from '@hongluan-ui/tokens'
import { panelDatePickProps } from '../props/panel-date-pick'
import DateTable from './basic-date-table.vue'
import MonthTable from './basic-month-table.vue'
import YearTable from './basic-year-table.vue'

import type { SetupContext } from 'vue'
import type { ConfigType, Dayjs } from 'dayjs'
import type { PanelDatePickProps } from '../props/panel-date-pick'
import type {
  DateTableEmits,
  DatesPickerEmits,
  WeekPickerEmits,
} from '../props/basic-date-table'

type DatePickType = PanelDatePickProps['type']
// todo
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const timeWithinRange = (_: ConfigType, __: any, ___: string) => true
const props = defineProps(panelDatePickProps)
const contextEmit = defineEmits(['pick', 'set-picker-option', 'panel-change'])

const attrs = useAttrs()
const slots = useSlots()

const { t, lang } = useLocale()
const { namespace } = useNamespace()
const pickerBase = inject('EP_PICKER_BASE') as any
const popper = inject(TOOLTIP_INJECTION_KEY)
const { shortcuts, disabledDate, cellClassName, defaultTime, arrowControl } =
  pickerBase.props
const defaultValue = toRef(pickerBase.props, 'defaultValue')

const currentViewRef = ref<{ focus: () => void; }>()

const innerDate = ref(dayjs().locale(lang.value))

const isChangeToNow = ref(false)

const defaultTimeD = computed(() => {
  return dayjs(defaultTime).locale(lang.value)
})

const month = computed(() => {
  return innerDate.value.month()
})

const year = computed(() => {
  return innerDate.value.year()
})

const selectableRange = ref([])
const userInputDate = ref<string | null>(null)
const userInputTime = ref<string | null>(null)
// todo update to disableHour
const checkDateWithinRange = (date: ConfigType) => {
  return selectableRange.value.length > 0
    ? timeWithinRange(date, selectableRange.value, props.format || 'HH:mm:ss')
    : true
}
const formatEmit = (emitDayjs: Dayjs) => {
  if (defaultTime && !visibleTime.value && !isChangeToNow.value) {
    return defaultTimeD.value
      .year(emitDayjs.year())
      .month(emitDayjs.month())
      .date(emitDayjs.date())
  }
  if (showTime.value) return emitDayjs.millisecond(0)
  return emitDayjs.startOf('day')
}
const emit = (value: Dayjs | Dayjs[], ...args: any[]) => {
  if (!value) {
    contextEmit('pick', value, ...args)
  } else if (isArray(value)) {
    const dates = value.map(formatEmit)
    contextEmit('pick', dates, ...args)
  } else {
    contextEmit('pick', formatEmit(value), ...args)
  }
  userInputDate.value = null
  userInputTime.value = null
  isChangeToNow.value = false
}
const handleDatePick = (value: DateTableEmits, keepOpen?: boolean) => {
  if (selectionMode.value === 'date') {
    value = value as Dayjs
    let newDate = props.parsedValue
      ? (props.parsedValue as Dayjs)
        .year(value.year())
        .month(value.month())
        .date(value.date())
      : value
    // change default time while out of selectableRange
    if (!checkDateWithinRange(newDate)) {
      newDate = (selectableRange.value[0][0] as Dayjs)
        .year(value.year())
        .month(value.month())
        .date(value.date())
    }
    innerDate.value = newDate
    emit(newDate, showTime.value || keepOpen)
  } else if (selectionMode.value === 'week') {
    emit((value as WeekPickerEmits).date)
  } else if (selectionMode.value === 'dates') {
    emit(value as DatesPickerEmits, true) // set true to keep panel open
  }
}

const moveByMonth = (forward: boolean) => {
  const action = forward ? 'add' : 'subtract'
  innerDate.value = innerDate.value[action](1, 'month')
  handlePanelChange('month')
}

const moveByYear = (forward: boolean) => {
  const currentDate = innerDate.value
  const action = forward ? 'add' : 'subtract'

  innerDate.value =
    currentView.value === 'year'
      ? currentDate[action](10, 'year')
      : currentDate[action](1, 'year')

  handlePanelChange('year')
}

const currentView = ref('date')

const yearLabel = computed(() => {
  const yearTranslation = t('hl.datepicker.year')
  if (currentView.value === 'year') {
    const startYear = Math.floor(year.value / 10) * 10
    if (yearTranslation) {
      return `${startYear} ${yearTranslation} - ${
        startYear + 9
      } ${yearTranslation}`
    }
    return `${startYear} - ${startYear + 9}`
  }
  return `${year.value} ${yearTranslation}`
})

type Shortcut = {
  value: (() => Dayjs) | Dayjs
  onClick?: (ctx: Omit<SetupContext, 'expose'>) => void
}

const handleShortcutClick = (shortcut: Shortcut) => {
  const shortcutValue = isFunction(shortcut.value)
    ? shortcut.value()
    : shortcut.value
  if (shortcutValue) {
    emit(dayjs(shortcutValue).locale(lang.value))
    return
  }
  if (shortcut.onClick) {
    shortcut.onClick({
      attrs,
      slots,
      emit: contextEmit as SetupContext['emit'],
    })
  }
}

const selectionMode = computed<DatePickType>(() => {
  const { type } = props
  if (['week', 'month', 'year', 'dates'].includes(type)) return type
  return 'date' as DatePickType
})

const keyboardMode = computed<string>(() => {
  return selectionMode.value === 'date'
    ? currentView.value
    : selectionMode.value
})

const hasShortcuts = computed(() => !!shortcuts.length)

const handleMonthPick = async (month: number) => {
  innerDate.value = innerDate.value.startOf('month').month(month)
  if (selectionMode.value === 'month') {
    emit(innerDate.value, false)
  } else {
    currentView.value = 'date'
    if (['month', 'year', 'date', 'week'].includes(selectionMode.value)) {
      emit(innerDate.value, true)
      await nextTick()
      handleFocusPicker()
    }
  }
  handlePanelChange('month')
}

const handleYearPick = async (year: number) => {
  if (selectionMode.value === 'year') {
    innerDate.value = innerDate.value.startOf('year').year(year)
    emit(innerDate.value, false)
  } else {
    innerDate.value = innerDate.value.year(year)
    currentView.value = 'month'
    if (['month', 'year', 'date', 'week'].includes(selectionMode.value)) {
      emit(innerDate.value, true)
      await nextTick()
      handleFocusPicker()
    }
  }
  handlePanelChange('year')
}

const showPicker = async (view: 'month' | 'year') => {
  currentView.value = view
  await nextTick()
  handleFocusPicker()
}

const showTime = computed(
  () => props.type === 'datetime' || props.type === 'datetimerange',
)

const footerVisible = computed(() => {
  return showTime.value || selectionMode.value === 'dates'
})

const onConfirm = () => {
  if (selectionMode.value === 'dates') {
    emit(props.parsedValue as Dayjs[])
  } else {
    // deal with the scenario where: user opens the date time picker, then confirm without doing anything
    let result = props.parsedValue as Dayjs
    if (!result) {
      const defaultTimeD = dayjs(defaultTime).locale(lang.value)
      const defaultValueD = getDefaultValue()
      result = defaultTimeD
        .year(defaultValueD.year())
        .month(defaultValueD.month())
        .date(defaultValueD.date())
    }
    innerDate.value = result
    emit(result)
  }
}

const changeToNow = () => {
  // NOTE: not a permanent solution
  //       consider disable "now" button in the future
  const now = dayjs().locale(lang.value)
  const nowDate = now.toDate()
  isChangeToNow.value = true
  if (
    (!disabledDate || !disabledDate(nowDate)) &&
    checkDateWithinRange(nowDate)
  ) {
    innerDate.value = dayjs().locale(lang.value)
    emit(innerDate.value)
  }
}

const timeFormat = computed(() => {
  return extractTimeFormat(props.format)
})

const dateFormat = computed(() => {
  return extractDateFormat(props.format)
})

const visibleTime = computed(() => {
  if (userInputTime.value) return userInputTime.value
  if (!props.parsedValue && !defaultValue.value) return
  return ((props.parsedValue || innerDate.value) as Dayjs).format(
    timeFormat.value,
  )
})

const visibleDate = computed(() => {
  if (userInputDate.value) return userInputDate.value
  if (!props.parsedValue && !defaultValue.value) return
  return ((props.parsedValue || innerDate.value) as Dayjs).format(
    dateFormat.value,
  )
})

const timePickerVisible = ref(false)
const onTimePickerInputFocus = () => {
  timePickerVisible.value = true
}
const handleTimePickClose = () => {
  timePickerVisible.value = false
}

const getUnits = (date: Dayjs) => {
  return {
    hour: date.hour(),
    minute: date.minute(),
    second: date.second(),
    year: date.year(),
    month: date.month(),
    date: date.date(),
  }
}

const handleTimePick = (value: Dayjs, visible: boolean, first: boolean) => {
  const { hour, minute, second } = getUnits(value)
  const newDate = props.parsedValue
    ? (props.parsedValue as Dayjs).hour(hour).minute(minute).second(second)
    : value
  innerDate.value = newDate
  emit(innerDate.value, true)
  if (!first) {
    timePickerVisible.value = visible
  }
}

const handleVisibleTimeChange = (value: string) => {
  const newDate = dayjs(value, timeFormat.value).locale(lang.value)
  if (newDate.isValid() && checkDateWithinRange(newDate)) {
    const { year, month, date } = getUnits(innerDate.value)
    innerDate.value = newDate.year(year).month(month).date(date)
    userInputTime.value = null
    timePickerVisible.value = false
    emit(innerDate.value, true)
  }
}

const handleVisibleDateChange = (value: string) => {
  const newDate = dayjs(value, dateFormat.value).locale(lang.value)
  if (newDate.isValid()) {
    if (disabledDate && disabledDate(newDate.toDate())) {
      return
    }
    const { hour, minute, second } = getUnits(innerDate.value)
    innerDate.value = newDate.hour(hour).minute(minute).second(second)
    userInputDate.value = null
    emit(innerDate.value, true)
  }
}

const isValidValue = (date: unknown) => {
  return (
    dayjs.isDayjs(date) &&
    date.isValid() &&
    (disabledDate ? !disabledDate(date.toDate()) : true)
  )
}

const formatToString = (value: Dayjs | Dayjs[]) => {
  if (selectionMode.value === 'dates') {
    return (value as Dayjs[]).map(_ => _.format(props.format))
  }
  return (value as Dayjs).format(props.format)
}

const parseUserInput = (value: Dayjs) => {
  return dayjs(value, props.format).locale(lang.value)
}

const getDefaultValue = () => {
  const parseDate = dayjs(defaultValue.value).locale(lang.value)
  if (!defaultValue.value) {
    const defaultTimeDValue = defaultTimeD.value
    return dayjs()
      .hour(defaultTimeDValue.hour())
      .minute(defaultTimeDValue.minute())
      .second(defaultTimeDValue.second())
      .locale(lang.value)
  }
  return parseDate
}

const handleFocusPicker = async () => {
  if (['week', 'month', 'year', 'date'].includes(selectionMode.value)) {
    currentViewRef.value?.focus()
    if (selectionMode.value === 'week') {
      handleKeyControl(EVENT_CODE.down)
    }
  }
}

const handleKeydownTable = (event: KeyboardEvent) => {
  const { code } = event
  const validCode = [
    EVENT_CODE.up,
    EVENT_CODE.down,
    EVENT_CODE.left,
    EVENT_CODE.right,
    EVENT_CODE.home,
    EVENT_CODE.end,
    EVENT_CODE.pageUp,
    EVENT_CODE.pageDown,
  ]
  if (validCode.includes(code)) {
    handleKeyControl(code)
    event.stopPropagation()
    event.preventDefault()
  }
  if (
    [EVENT_CODE.enter, EVENT_CODE.space].includes(code) &&
    userInputDate.value === null &&
    userInputTime.value === null
  ) {
    event.preventDefault()
    emit(innerDate.value, false)
  }
}

const handleKeyControl = (code: string) => {
  type KeyControlMappingCallableOffset = (date: Date, step?: number) => number
  type KeyControl = {
    [key: string]:
    | number
    | KeyControlMappingCallableOffset
    | ((date: Date, step: number) => any)
    offset: (date: Date, step: number) => any
  }
  interface KeyControlMapping {
    [key: string]: KeyControl
  }

  const { up, down, left, right, home, end, pageUp, pageDown } = EVENT_CODE
  const mapping: KeyControlMapping = {
    year: {
      [up]: -4,
      [down]: 4,
      [left]: -1,
      [right]: 1,
      offset: (date: Date, step: number) =>
        date.setFullYear(date.getFullYear() + step),
    },
    month: {
      [up]: -4,
      [down]: 4,
      [left]: -1,
      [right]: 1,
      offset: (date: Date, step: number) =>
        date.setMonth(date.getMonth() + step),
    },
    week: {
      [up]: -1,
      [down]: 1,
      [left]: -1,
      [right]: 1,
      offset: (date: Date, step: number) =>
        date.setDate(date.getDate() + step * 7),
    },
    date: {
      [up]: -7,
      [down]: 7,
      [left]: -1,
      [right]: 1,
      [home]: (date: Date) => -date.getDay(),
      [end]: (date: Date) => -date.getDay() + 6,
      [pageUp]: (date: Date) =>
        -new Date(date.getFullYear(), date.getMonth(), 0).getDate(),
      [pageDown]: (date: Date) =>
        new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
      offset: (date: Date, step: number) => date.setDate(date.getDate() + step),
    },
  }

  const newDate = innerDate.value.toDate()
  while (Math.abs(innerDate.value.diff(newDate, 'year', true)) < 1) {
    const map = mapping[keyboardMode.value]
    if (!map) return
    map.offset(
      newDate,
      isFunction(map[code])
        ? (map[code] as unknown as KeyControlMappingCallableOffset)(newDate)
        : (map[code] as number) ?? 0,
    )
    if (disabledDate && disabledDate(newDate)) {
      break
    }
    const result = dayjs(newDate).locale(lang.value)
    innerDate.value = result
    contextEmit('pick', result, true)
    break
  }
}

const handlePanelChange = (mode: 'month' | 'year') => {
  contextEmit('panel-change', innerDate.value.toDate(), mode, currentView.value)
}

watch(
  () => selectionMode.value,
  val => {
    if (['month', 'year'].includes(val)) {
      currentView.value = val
      return
    }
    currentView.value = 'date'
  },
  { immediate: true },
)

watch(
  () => currentView.value,
  () => {
    popper?.updatePopper()
  },
)

watch(
  () => defaultValue.value,
  val => {
    if (val) {
      innerDate.value = getDefaultValue()
    }
  },
  { immediate: true },
)

watch(
  () => props.parsedValue,
  val => {
    if (val) {
      if (selectionMode.value === 'dates') return
      if (Array.isArray(val)) return
      innerDate.value = val
    } else {
      innerDate.value = getDefaultValue()
    }
  },
  { immediate: true },
)

contextEmit('set-picker-option', ['isValidValue', isValidValue])
contextEmit('set-picker-option', ['formatToString', formatToString])
contextEmit('set-picker-option', ['parseUserInput', parseUserInput])
contextEmit('set-picker-option', ['handleFocusPicker', handleFocusPicker])
</script>

