<template>
  <table
    :class="{
      'calendar-table': true,
      'is-range': isInRange
    }"
    cellspacing="0"
    cellpadding="0"
  >
    <thead v-if="!hideHeader">
      <th v-for="day in weekDays" :key="day">{{ day }}</th>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) in rows"
        :key="index"
        :class="{
          'calendar-table-row': true,
          'calendar-table-row-hide-border': index === 0 && hideHeader
        }"
      >
        <td
          v-for="(cell, key) in row"
          :key="key"
          :class="getCellClass(cell)"
          @click="handlePickDay(cell)"
        >
          <div class="calendar-day">
            <slot
              name="date-cell"
              :data="getSlotData(cell)"
            >
              <span>{{ cell.text }}</span>
            </slot>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { dateTableEmits, dateTableProps } from './date-table'
import { useDateTable } from './use-date-table'
import type { CalendarDateCell } from './date-table'

defineOptions({
  name: 'DateTable',
})

const props = defineProps(dateTableProps)
const emit = defineEmits(dateTableEmits)

const {
  isInRange,
  now,
  rows,
  weekDays,
  getFormattedDate,
  handlePickDay,
  getSlotData,
} = useDateTable(props, emit)

const getCellClass = ({ text, type }: CalendarDateCell) => {
  const classes: string[] = [type]
  if (type === 'current') {
    const date = getFormattedDate(text, type)
    if (date.isSame(props.selectedDay, 'day')) {
      classes.push('is-selected')
    }
    if (date.isSame(now, 'day')) {
      classes.push('is-today')
    }
  }
  return classes
}

defineExpose({
  /** @description toggle date panel */
  getFormattedDate,
})
</script>
