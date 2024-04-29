<template>
  <div
    class="range-picker"
    :class="[{
      'has-sidebar': Boolean($slots.sidebar) || hasShortcuts
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
        <div class="picker-body-content is-left">
          <div :class="['picker-body-header', namespace + '-group', 'full']">
            <hl-button
              size="sm"
              class="group-item prev-year"
              equal
              @click="leftPrevYear"
            >
              <hl-icon>
                <system-arrow-left />
              </hl-icon>
            </hl-button>
            <div class="header-label group-item">
              <hl-button>
                {{ leftLabel }}
              </hl-button>
            </div>
            <hl-button
              v-if="unlinkPanels"
              size="sm"
              class="group-item next-year"
              equal
              :disabled="!enableYearArrow"
              @click="leftNextYear"
            >
              <hl-icon>
                <system-arrow-right />
              </hl-icon>
            </hl-button>
          </div>
          <month-table
            selection-mode="range"
            :date="leftDate"
            :min-date="minDate"
            :max-date="maxDate"
            :range-state="rangeState"
            :disabled-date="disabledDate"
            @changerange="handleChangeRange"
            @pick="handleRangePick"
            @select="onSelect"
          />
        </div>
        <div class="picker-body-content is-right">
          <div :class="['picker-body-header', namespace + '-group', 'full']">
            <hl-button
              v-if="unlinkPanels"
              size="sm"
              class="group-item prev-year"
              equal
              :disabled="!enableYearArrow"
              @click="rightPrevYear"
            >
              <hl-icon>
                <system-arrow-left />
              </hl-icon>
            </hl-button>
            <div class="header-label group-item">
              <hl-button>
                {{ rightLabel }}
              </hl-button>
            </div>
            <hl-button
              size="sm"
              class="group-item next-year"
              equal
              @click="rightNextYear"
            >
              <hl-icon>
                <system-arrow-right />
              </hl-icon>
            </hl-button>
          </div>
          <month-table
            selection-mode="range"
            :date="rightDate"
            :min-date="minDate"
            :max-date="maxDate"
            :range-state="rangeState"
            :disabled-date="disabledDate"
            @changerange="handleChangeRange"
            @pick="handleRangePick"
            @select="onSelect"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref, toRef } from 'vue'
import dayjs from 'dayjs'
import { useLocale, useNamespace } from '@hongluan-ui/hooks'
import HlButton from '@hongluan-ui/components/button'
import HlGroup from '@hongluan-ui/components/group'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemArrowLeft, SystemArrowRight } from '@hongluan-ui/components/system-icon'
import {
  panelMonthRangeEmits,
  panelMonthRangeProps,
} from '../props/panel-month-range'
import { useMonthRangeHeader } from '../composables/use-month-range-header'
import { useRangePicker } from '../composables/use-range-picker'
import MonthTable from './basic-month-table.vue'

import type { Dayjs } from 'dayjs'

defineOptions({
  name: 'DatePickerMonthRange',
})

const props = defineProps(panelMonthRangeProps)
const emit = defineEmits(panelMonthRangeEmits)
const unit = 'year'

const { lang } = useLocale()
const { namespace } = useNamespace()
const pickerBase = inject('EP_PICKER_BASE') as any
const { shortcuts, disabledDate, format } = pickerBase.props
const defaultValue = toRef(pickerBase.props, 'defaultValue')
const leftDate = ref(dayjs().locale(lang.value))
const rightDate = ref(dayjs().locale(lang.value).add(1, unit))

const {
  minDate,
  maxDate,
  rangeState,

  handleChangeRange,
  handleRangeConfirm,
  handleShortcutClick,
  onSelect,
} = useRangePicker(props, {
  defaultValue,
  leftDate,
  rightDate,
  unit,
  onParsedValueChanged,
})

const hasShortcuts = computed(() => !!shortcuts.length)

const {
  leftPrevYear,
  rightNextYear,
  leftNextYear,
  rightPrevYear,
  leftLabel,
  rightLabel,
  leftYear,
  rightYear,
} = useMonthRangeHeader({
  unlinkPanels: toRef(props, 'unlinkPanels'),
  leftDate,
  rightDate,
})

const enableYearArrow = computed(() => {
  return props.unlinkPanels && rightYear.value > leftYear.value + 1
})

type RangePickValue = {
  minDate: Dayjs
  maxDate: Dayjs
}

const handleRangePick = (val: RangePickValue, close = true) => {
  // const defaultTime = props.defaultTime || []
  // const minDate_ = modifyWithTimeString(val.minDate, defaultTime[0])
  // const maxDate_ = modifyWithTimeString(val.maxDate, defaultTime[1])
  // todo
  const minDate_ = val.minDate
  const maxDate_ = val.maxDate
  if (maxDate.value === maxDate_ && minDate.value === minDate_) {
    return
  }
  maxDate.value = maxDate_
  minDate.value = minDate_

  if (!close) return
  handleRangeConfirm()
}

const formatToString = (days: Dayjs[]) => {
  return days.map(day => day.format(format))
}

function onParsedValueChanged(
  minDate: Dayjs | undefined,
  maxDate: Dayjs | undefined,
) {
  if (props.unlinkPanels && maxDate) {
    const minDateYear = minDate?.year() || 0
    const maxDateYear = maxDate.year()
    rightDate.value =
      minDateYear === maxDateYear ? maxDate.add(1, unit) : maxDate
  } else {
    rightDate.value = leftDate.value.add(1, unit)
  }
}

emit('set-picker-option', ['formatToString', formatToString])
</script>
