<template>
  <div :class="namespace">
    <div class="calendar-header">
      <slot name="header" :date="i18nDate">
        <div class="calendar-title">{{ i18nDate }}</div>
        <hl-group v-if="validatedRange.length === 0" indent merge class="calendar-button-group">
          <hl-button @click="selectDate('prev-month')">
            {{ t('hl.datepicker.prevMonth') }}
          </hl-button>
          <hl-button @click="selectDate('today')">
            {{ t('hl.datepicker.today') }}
          </hl-button>
          <hl-button @click="selectDate('next-month')">
            {{ t('hl.datepicker.nextMonth') }}
          </hl-button>
        </hl-group>
      </slot>
    </div>
    <div v-if="validatedRange.length === 0" class="calendar-body">
      <date-table
        :date="date"
        :selected-day="realSelectedDay"
        @pick="pickDay"
      >
        <template
          v-if="$slots['date-cell'] || $slots.dateCell"
          #date-cell="data"
        >
          <slot v-if="$slots['date-cell']" name="date-cell" v-bind="data"></slot>
          <slot v-else name="dateCell" v-bind="data"></slot>
        </template>
      </date-table>
    </div>
    <div v-else class="calendar-body">
      <date-table
        v-for="(range_, index) in validatedRange"
        :key="index"
        :date="range_[0]"
        :selected-day="realSelectedDay"
        :range="range_"
        :hide-header="index !== 0"
        @pick="pickDay"
      >
        <template
          v-if="$slots['date-cell'] || $slots.dateCell"
          #date-cell="data"
        >
          <slot v-if="$slots['date-cell']" name="date-cell" v-bind="data"></slot>
          <slot v-else name="dateCell" v-bind="data"></slot>
        </template>
      </date-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import HlButton from '@hongluan-ui/components/button'
import HlGroup from '@hongluan-ui/components/group'
import { useNamespace, useLocale } from '@hongluan-ui/hooks'
import DateTable from './date-table.vue'
import { useCalendar } from './use-calendar'
import { calendarEmits, calendarProps } from './calendar'

const COMPONENT_NAME = 'Calendar'

defineOptions({
  name: COMPONENT_NAME,
})

const props = defineProps(calendarProps)
const emit = defineEmits(calendarEmits)

const { namespace } = useNamespace('calendar')
const {
  calculateValidatedDateRange,
  date,
  pickDay,
  realSelectedDay,
  selectDate,
  validatedRange,
} = useCalendar(props, emit, COMPONENT_NAME)

const { t } = useLocale()

const i18nDate = computed(() => {
  const pickedMonth = `hl.datepicker.month${date.value.format('M')}`
  return `${date.value.year()} ${t('hl.datepicker.year')} ${t(pickedMonth)}`
})

defineExpose({
  /** @description currently selected date */
  selectedDay: realSelectedDay,
  /** @description select a specific date */
  pickDay,
  /** @description select date */
  selectDate,
  /** @description Calculate the validate date range according to the start and end dates */
  calculateValidatedDateRange,
})
</script>

