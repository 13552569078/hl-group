<template>
  <div class="demo-date-picker">
    <hl-date-picker
      v-model="value"
      type="date"
      placeholder="Pick a day"
      format="YYYY/MM/DD"
      value-format="YYYY-MM-DD"
    >
      <template #default="cell">
        <div class="cell" :class="{ current: cell.isCurrent }">
          <span :class="['text', isHoliday(cell) && 'text-danger font-bold'] ">{{ cell.text }}</span>
        </div>
      </template>
    </hl-date-picker>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('2021-10-29')

const holidays = [
  '2021-10-01',
  '2021-10-02',
  '2021-10-03',
  '2021-10-04',
  '2021-10-05',
  '2021-10-06',
  '2021-10-07',
]

function isHoliday({ dayjs }) {
  return holidays.includes(dayjs.format('YYYY-MM-DD'))
}
</script>
