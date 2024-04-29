<template>
  <div
    class="range-picker"
    :class="[{
      'has-sidebar': $slots.sidebar || hasShortcuts,
      'has-time': showTime
    }, namespace + '-date-picker']"
  >
    <div class="picker-wrapper">
      <slot name="sidebar" :class="['picker-sidebar', namespace + '-group', 'vertical']"></slot>
      <hl-group v-if="hasShortcuts" :class="['picker-sidebar']" dir="vertical">
        <hl-group v-for="(shortcut, key) in shortcuts" :key="key" class="p-x-sm p-y-xxs hover:text-hover cursor-pointer" @click="handleShortcutClick(shortcut)">
          {{ shortcut.text }}
        </hl-group>
      </hl-group>
      <div class="picker-body">
        <div v-if="showTime" class="picker-body-header-wrapper">
          <hl-group class="picker-time-header" deep-merge indent full>
            <hl-input
              size="sm"
              :disabled="rangeState.selecting"
              :placeholder="t('hl.datepicker.startDate')"
              :validate-event="false"
              :model-value="minVisibleDate"
              @input="val => handleDateInput(val, 'min')"
              @change="val => handleDateChange(val, 'min')"
            >
              <template #prefix>
                <hl-icon>
                  <system-calendar />
                </hl-icon>
              </template>
            </hl-input>
            <div
              v-clickoutside="handleMinTimeClose"
            >
              <hl-input
                size="sm"
                :disabled="rangeState.selecting"
                :placeholder="t('hl.datepicker.startTime')"
                :model-value="minVisibleTime"
                :validate-event="false"
                @focus="minTimePickerVisible = true"
                @input="val => handleTimeInput(val, 'min')"
                @change="val => handleTimeChange(val, 'min')"
              >
                <template #prefix>
                  <hl-icon>
                    <system-clock />
                  </hl-icon>
                </template>
              </hl-input>
              <time-pick-panel
                :visible="minTimePickerVisible"
                :format="timeFormat"
                datetime-role="start"
                :time-arrow-control="arrowControl"
                :parsed-value="leftDate"
                @pick="handleMinTimePick"
              />
            </div>
          </hl-group>
          <hl-button
            size="sm"
            class="range-separator"
          />
          <hl-group class="picker-time-header is-right" deep-merge indent full>
            <hl-input
              size="sm"
              :disabled="rangeState.selecting"
              :placeholder="t('hl.datepicker.endDate')"
              :model-value="maxVisibleDate"
              :readonly="!minDate"
              :validate-event="false"
              @input="val => handleDateInput(val, 'max')"
              @change="val => handleDateChange(val, 'max')"
            >
              <template #prefix>
                <hl-icon>
                  <system-calendar />
                </hl-icon>
              </template>
            </hl-input>
            <div
              v-clickoutside="handleMaxTimeClose"
            >
              <hl-input
                size="sm"
                :disabled="rangeState.selecting"
                :placeholder="t('hl.datepicker.endTime')"
                :model-value="maxVisibleTime"
                :readonly="!minDate"
                :validate-event="false"
                @focus="minDate && (maxTimePickerVisible = true)"
                @input="val => handleTimeInput(val, 'max')"
                @change="val => handleTimeChange(val, 'max')"
              >
                <template #prefix>
                  <hl-icon>
                    <system-clock />
                  </hl-icon>
                </template>
              </hl-input>
              <time-pick-panel
                datetime-role="end"
                :visible="maxTimePickerVisible"
                :format="timeFormat"
                :time-arrow-control="arrowControl"
                :parsed-value="rightDate"
                @pick="handleMaxTimePick"
              />
            </div>
          </hl-group>
        </div>
        <div class="picker-body-content is-left">
          <hl-group class="picker-body-header" full>
            <div class="static">
              <hl-button
                type="link"
                size="sm"
                class="prev-year"
                equal
                @click="leftPrevYear"
              >
                <hl-icon>
                  <system-double-arrow-left />
                </hl-icon>
              </hl-button>
              <hl-button
                type="link"
                size="sm"
                class="prev-month"
                equal
                @click="leftPrevMonth"
              >
                <hl-icon>
                  <system-arrow-left />
                </hl-icon>
              </hl-button>
            </div>
            <div class="header-label">
              <hl-button type="link">
                {{ leftLabel }}
              </hl-button>
            </div>
            <div class="static">
              <hl-button
                v-if="unlinkPanels"
                type="link"
                size="sm"
                :disabled="!enableMonthArrow"
                :class="{ 'is-disabled': !enableMonthArrow }"
                class="group-item next-month"
                equal
                @click="leftNextMonth"
              >
                <hl-icon>
                  <system-arrow-right />
                </hl-icon>
              </hl-button>
              <hl-button
                v-if="unlinkPanels"
                type="link"
                size="sm"
                :disabled="!enableYearArrow"
                :class="{ 'is-disabled': !enableYearArrow }"
                class="group-item next-year"
                equal
                @click="leftNextYear"
              >
                <hl-icon>
                  <system-double-arrow-right />
                </hl-icon>
              </hl-button>
            </div>
          </hl-group>
          <date-table
            selection-mode="range"
            :date="leftDate"
            :min-date="minDate"
            :max-date="maxDate"
            :range-state="rangeState"
            :disabled-date="disabledDate"
            :cell-class-name="cellClassName"
            @changerange="handleChangeRange"
            @pick="handleRangePick"
            @select="onSelect"
          />
        </div>
        <div class="picker-body-content is-right">
          <hl-group class="picker-body-header" full>
            <div class="static">
              <hl-button
                v-if="unlinkPanels"
                size="sm"
                :disabled="!enableYearArrow"
                :class="{ 'is-disabled': !enableYearArrow }"
                class="prev-year"
                equal
                @click="rightPrevYear"
              >
                <hl-icon>
                  <system-double-arrow-left />
                </hl-icon>
              </hl-button>
              <hl-button
                v-if="unlinkPanels"
                size="sm"
                :disabled="!enableMonthArrow"
                :class="{ 'is-disabled': !enableMonthArrow }"
                class="prev-month"
                equal
                @click="rightPrevMonth"
              >
                <hl-icon>
                  <system-arrow-left />
                </hl-icon>
              </hl-button>
            </div>
            <div class="header-label">
              <hl-button>
                {{ rightLabel }}
              </hl-button>
            </div>
            <div class="static">
              <hl-button
                size="sm"
                class="next-month"
                equal
                @click="rightNextMonth"
              >
                <hl-icon>
                  <system-arrow-right />
                </hl-icon>
              </hl-button>
              <hl-button
                size="sm"
                class="next-year"
                equal
                @click="rightNextYear"
              >
                <hl-icon>
                  <system-double-arrow-right />
                </hl-icon>
              </hl-button>
            </div>
          </hl-group>
          <date-table
            selection-mode="range"
            :date="rightDate"
            :min-date="minDate"
            :max-date="maxDate"
            :range-state="rangeState"
            :disabled-date="disabledDate"
            :cell-class-name="cellClassName"
            @changerange="handleChangeRange"
            @pick="handleRangePick"
            @select="onSelect"
          />
        </div>
      </div>
    </div>
    <div v-if="showTime" class="picker-footer">
      <hl-button
        v-if="clearable"
        class=""
        @click="handleClear"
      >
        {{ t('hl.datepicker.clear') }}
      </hl-button>
      <hl-button
        type="primary"
        class=""
        :disabled="btnDisabled"
        @click="handleRangeConfirm(false)"
      >
        {{ t('hl.datepicker.confirm') }}
      </hl-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref, toRef, unref } from 'vue'
import dayjs from 'dayjs'
import { ClickOutside as vClickoutside } from '@hongluan-ui/directives'
import { isArray } from '@hongluan-ui/utils'
import { useLocale, useNamespace } from '@hongluan-ui/hooks'
import HlInput from '@hongluan-ui/components/input'
import HlButton from '@hongluan-ui/components/button'
import HlGroup from '@hongluan-ui/components/group'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemClock, SystemCalendar, SystemArrowLeft, SystemArrowRight, SystemDoubleArrowLeft, SystemDoubleArrowRight } from '@hongluan-ui/components/system-icon'
import {
  TimePickPanel,
  extractDateFormat,
  extractTimeFormat,
} from '@hongluan-ui/components/time-picker'
import { panelDateRangeProps } from '../props/panel-date-range'
import { useRangePicker } from '../composables/use-range-picker'
import { getDefaultValue, isValidRange } from '../utils'
import DateTable from './basic-date-table.vue'

import type { Dayjs } from 'dayjs'

type ChangeType = 'min' | 'max'
type UserInput = {
  min: string | null
  max: string | null
}

const props = defineProps(panelDateRangeProps)
const emit = defineEmits([
  'pick',
  'set-picker-option',
  'calendar-change',
  'panel-change',
])

const unit = 'month'
// FIXME: fix the type for ep picker
const pickerBase = inject('EP_PICKER_BASE') as any
const {
  disabledDate,
  cellClassName,
  format,
  defaultTime,
  arrowControl,
  clearable,
} = pickerBase.props
const shortcuts = toRef(pickerBase.props, 'shortcuts')
const defaultValue = toRef(pickerBase.props, 'defaultValue')
const { lang } = useLocale()
const leftDate = ref<Dayjs>(dayjs().locale(lang.value))
const rightDate = ref<Dayjs>(dayjs().locale(lang.value).add(1, unit))

const { namespace } = useNamespace()
const {
  minDate,
  maxDate,
  rangeState,

  handleChangeRange,
  handleRangeConfirm,
  handleShortcutClick,
  onSelect,
  t,
} = useRangePicker(props, {
  defaultValue,
  leftDate,
  rightDate,
  unit,
  onParsedValueChanged,
})

const dateUserInput = ref<UserInput>({
  min: null,
  max: null,
})

const timeUserInput = ref<UserInput>({
  min: null,
  max: null,
})

const leftLabel = computed(() => {
  return `${leftDate.value.year()} ${t('hl.datepicker.year')} ${t(
    `hl.datepicker.month${leftDate.value.month() + 1}`,
  )}`
})

const rightLabel = computed(() => {
  return `${rightDate.value.year()} ${t('hl.datepicker.year')} ${t(
    `hl.datepicker.month${rightDate.value.month() + 1}`,
  )}`
})

const leftYear = computed(() => {
  return leftDate.value.year()
})

const leftMonth = computed(() => {
  return leftDate.value.month()
})

const rightYear = computed(() => {
  return rightDate.value.year()
})

const rightMonth = computed(() => {
  return rightDate.value.month()
})

const hasShortcuts = computed(() => !!shortcuts.value.length)

const minVisibleDate = computed(() => {
  if (dateUserInput.value.min !== null) return dateUserInput.value.min
  if (minDate.value) return minDate.value.format(dateFormat.value)
  return ''
})

const maxVisibleDate = computed(() => {
  if (dateUserInput.value.max !== null) return dateUserInput.value.max
  if (maxDate.value || minDate.value)
    return (maxDate.value || minDate.value)!.format(dateFormat.value)
  return ''
})

const minVisibleTime = computed(() => {
  if (timeUserInput.value.min !== null) return timeUserInput.value.min
  if (minDate.value) return minDate.value.format(timeFormat.value)
  return ''
})

const maxVisibleTime = computed(() => {
  if (timeUserInput.value.max !== null) return timeUserInput.value.max
  if (maxDate.value || minDate.value)
    return (maxDate.value || minDate.value)!.format(timeFormat.value)
  return ''
})

const timeFormat = computed(() => {
  return extractTimeFormat(format)
})

const dateFormat = computed(() => {
  return extractDateFormat(format)
})

const leftPrevYear = () => {
  leftDate.value = leftDate.value.subtract(1, 'year')
  if (!props.unlinkPanels) {
    rightDate.value = leftDate.value.add(1, 'month')
  }
  handlePanelChange('year')
}

const leftPrevMonth = () => {
  leftDate.value = leftDate.value.subtract(1, 'month')
  if (!props.unlinkPanels) {
    rightDate.value = leftDate.value.add(1, 'month')
  }
  handlePanelChange('month')
}

const rightNextYear = () => {
  if (!props.unlinkPanels) {
    leftDate.value = leftDate.value.add(1, 'year')
    rightDate.value = leftDate.value.add(1, 'month')
  } else {
    rightDate.value = rightDate.value.add(1, 'year')
  }
  handlePanelChange('year')
}

const rightNextMonth = () => {
  if (!props.unlinkPanels) {
    leftDate.value = leftDate.value.add(1, 'month')
    rightDate.value = leftDate.value.add(1, 'month')
  } else {
    rightDate.value = rightDate.value.add(1, 'month')
  }
  handlePanelChange('month')
}

const leftNextYear = () => {
  leftDate.value = leftDate.value.add(1, 'year')
  handlePanelChange('year')
}

const leftNextMonth = () => {
  leftDate.value = leftDate.value.add(1, 'month')
  handlePanelChange('month')
}

const rightPrevYear = () => {
  rightDate.value = rightDate.value.subtract(1, 'year')
  handlePanelChange('year')
}

const rightPrevMonth = () => {
  rightDate.value = rightDate.value.subtract(1, 'month')
  handlePanelChange('month')
}

const handlePanelChange = (mode: 'month' | 'year') => {
  emit(
    'panel-change',
    [leftDate.value.toDate(), rightDate.value.toDate()],
    mode,
  )
}

const enableMonthArrow = computed(() => {
  const nextMonth = (leftMonth.value + 1) % 12
  const yearOffset = leftMonth.value + 1 >= 12 ? 1 : 0
  return (
    props.unlinkPanels &&
    new Date(leftYear.value + yearOffset, nextMonth) <
      new Date(rightYear.value, rightMonth.value)
  )
})

const enableYearArrow = computed(() => {
  return (
    props.unlinkPanels &&
    rightYear.value * 12 +
      rightMonth.value -
      (leftYear.value * 12 + leftMonth.value + 1) >=
      12
  )
})

const btnDisabled = computed(() => {
  return !(
    minDate.value &&
    maxDate.value &&
    !rangeState.value.selecting &&
    isValidRange([minDate.value, maxDate.value])
  )
})

const showTime = computed(
  () => props.type === 'datetime' || props.type === 'datetimerange',
)

const formatEmit = (emitDayjs: Dayjs | null, index?: number) => {
  if (!emitDayjs) return
  if (defaultTime) {
    const defaultTimeD = dayjs(
      defaultTime[index as number] || defaultTime,
    ).locale(lang.value)
    return defaultTimeD
      .year(emitDayjs.year())
      .month(emitDayjs.month())
      .date(emitDayjs.date())
  }
  return emitDayjs
}

const handleRangePick = (
  val: {
    minDate: Dayjs
    maxDate: Dayjs | null
  },
  close = true,
) => {
  const min_ = val.minDate
  const max_ = val.maxDate
  const minDate_ = formatEmit(min_, 0)
  const maxDate_ = formatEmit(max_, 1)

  if (maxDate.value === maxDate_ && minDate.value === minDate_) {
    return
  }
  emit('calendar-change', [min_.toDate(), max_ && max_.toDate()])
  maxDate.value = maxDate_
  minDate.value = minDate_

  if (!close || showTime.value) return
  handleRangeConfirm()
}

const minTimePickerVisible = ref(false)
const maxTimePickerVisible = ref(false)

const handleMinTimeClose = () => {
  minTimePickerVisible.value = false
}

const handleMaxTimeClose = () => {
  maxTimePickerVisible.value = false
}

const handleDateInput = (value: string | null, type: ChangeType) => {
  dateUserInput.value[type] = value
  const parsedValueD = dayjs(value, dateFormat.value).locale(lang.value)

  if (parsedValueD.isValid()) {
    if (disabledDate && disabledDate(parsedValueD.toDate())) {
      return
    }
    if (type === 'min') {
      leftDate.value = parsedValueD
      minDate.value = (minDate.value || leftDate.value)
        .year(parsedValueD.year())
        .month(parsedValueD.month())
        .date(parsedValueD.date())
      if (!props.unlinkPanels) {
        rightDate.value = parsedValueD.add(1, 'month')
        maxDate.value = minDate.value.add(1, 'month')
      }
    } else {
      rightDate.value = parsedValueD
      maxDate.value = (maxDate.value || rightDate.value)
        .year(parsedValueD.year())
        .month(parsedValueD.month())
        .date(parsedValueD.date())
      if (!props.unlinkPanels) {
        leftDate.value = parsedValueD.subtract(1, 'month')
        minDate.value = maxDate.value.subtract(1, 'month')
      }
    }
  }
}

const handleDateChange = (_: unknown, type: ChangeType) => {
  dateUserInput.value[type] = null
}

const handleTimeInput = (value: string | null, type: ChangeType) => {
  timeUserInput.value[type] = value
  const parsedValueD = dayjs(value, timeFormat.value).locale(lang.value)

  if (parsedValueD.isValid()) {
    if (type === 'min') {
      minTimePickerVisible.value = true
      minDate.value = (minDate.value || leftDate.value)
        .hour(parsedValueD.hour())
        .minute(parsedValueD.minute())
        .second(parsedValueD.second())
      if (!maxDate.value || maxDate.value.isBefore(minDate.value)) {
        maxDate.value = minDate.value
      }
    } else {
      maxTimePickerVisible.value = true
      maxDate.value = (maxDate.value || rightDate.value)
        .hour(parsedValueD.hour())
        .minute(parsedValueD.minute())
        .second(parsedValueD.second())
      rightDate.value = maxDate.value
      if (maxDate.value && maxDate.value.isBefore(minDate.value)) {
        minDate.value = maxDate.value
      }
    }
  }
}

const handleTimeChange = (value: string | null, type: ChangeType) => {
  timeUserInput.value[type] = null
  if (type === 'min') {
    leftDate.value = minDate.value!
    minTimePickerVisible.value = false
  } else {
    rightDate.value = maxDate.value!
    maxTimePickerVisible.value = false
  }
}

const handleMinTimePick = (value: Dayjs, visible: boolean, first: boolean) => {
  if (timeUserInput.value.min) return
  if (value) {
    leftDate.value = value
    minDate.value = (minDate.value || leftDate.value)
      .hour(value.hour())
      .minute(value.minute())
      .second(value.second())
  }

  if (!first) {
    minTimePickerVisible.value = visible
  }

  if (!maxDate.value || maxDate.value.isBefore(minDate.value)) {
    maxDate.value = minDate.value
    rightDate.value = value
  }
}

const handleMaxTimePick = (
  value: Dayjs | null,
  visible: boolean,
  first: boolean,
) => {
  if (timeUserInput.value.max) return
  if (value) {
    rightDate.value = value
    maxDate.value = (maxDate.value || rightDate.value)
      .hour(value.hour())
      .minute(value.minute())
      .second(value.second())
  }

  if (!first) {
    maxTimePickerVisible.value = visible
  }

  if (maxDate.value && maxDate.value.isBefore(minDate.value)) {
    minDate.value = maxDate.value
  }
}

const handleClear = () => {
  leftDate.value = getDefaultValue(unref(defaultValue), {
    lang: unref(lang),
    unit: 'month',
    unlinkPanels: props.unlinkPanels,
  })[0]
  rightDate.value = leftDate.value.add(1, 'month')
  emit('pick', null)
}

const formatToString = (value: Dayjs | Dayjs[]) => {
  return isArray(value)
    ? value.map(_ => _.format(format))
    : value.format(format)
}

const parseUserInput = (value: Dayjs | Dayjs[]) => {
  return isArray(value)
    ? value.map(_ => dayjs(_, format).locale(lang.value))
    : dayjs(value, format).locale(lang.value)
}

function onParsedValueChanged(
  minDate: Dayjs | undefined,
  maxDate: Dayjs | undefined,
) {
  if (props.unlinkPanels && maxDate) {
    const minDateYear = minDate?.year() || 0
    const minDateMonth = minDate?.month() || 0
    const maxDateYear = maxDate.year()
    const maxDateMonth = maxDate.month()
    rightDate.value =
      minDateYear === maxDateYear && minDateMonth === maxDateMonth
        ? maxDate.add(1, unit)
        : maxDate
  } else {
    rightDate.value = leftDate.value.add(1, unit)
    if (maxDate) {
      rightDate.value = rightDate.value
        .hour(maxDate.hour())
        .minute(maxDate.minute())
        .second(maxDate.second())
    }
  }
}

emit('set-picker-option', ['isValidValue', isValidRange])
emit('set-picker-option', ['parseUserInput', parseUserInput])
emit('set-picker-option', ['formatToString', formatToString])
emit('set-picker-option', ['handleClear', handleClear])
</script>
