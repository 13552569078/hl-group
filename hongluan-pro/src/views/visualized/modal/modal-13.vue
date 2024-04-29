<template show-source>
  <hv-modal title="日历" width="calc(var(--xxl) * 20)">
    <hl-calendar ref="calendar" v-model="value">
      <template #header="{ date }">
        <hl-row class="w-full">
          <hl-col span="col" />
          <hl-col span="col-12">
            <hl-group class="w-full" align="items-middle items-center">
              <hl-icon type="primary" size="xxs" class="cursor-pointer m-r-lg" @click="selectDate('prev-year')">
                <two-chevrons-left />
              </hl-icon>
              <hl-icon type="primary" size="xxs" class="cursor-pointer m-r-lg" @click="selectDate('prev-month')">
                <two-chevron-left />
              </hl-icon>
              <span>{{ date }}</span>
              <hl-icon type="primary" size="xxs" class="cursor-pointer m-l-lg" @click="selectDate('next-month')">
                <two-chevron-right />
              </hl-icon>
              <hl-icon type="primary" size="xxs" class="cursor-pointer m-l-lg" @click="selectDate('next-year')">
                <two-chevrons-right />
              </hl-icon>
            </hl-group>
          </hl-col>
          <hl-col span="col" class="display-flex items-right">
            <hl-button size="sm" type="primary" outline @click="selectDate('today')">返回今天</hl-button>
          </hl-col>
        </hl-row>
      </template>
      <template #dateCell="{ data }">
        <hl-group dir="vertical" :class="[data.isSelected ? 'current-selected' : 'common-day']" @click="itemDate(data.day)">
          <span class="font-din font-xl">{{ data.day.split('-')[2] }}</span>
          <hl-group class="m-t-xs font-sm" dir="vertical">
            <hl-group v-if="getDayContent(data.day, 'maxValue')" full="full-x">
              <span class="static m-r-xxs">最高:</span>
              <span class="ellipsis">{{ getDayContent(data.day, 'maxValue') }}</span>
            </hl-group>
            <hl-group v-if="getDayContent(data.day, 'minValue')" full="full-x">
              <span class="static m-r-xxs">最低:</span>
              <span class="ellipsis">{{ getDayContent(data.day, 'minValue') }}</span>
            </hl-group>
            <hl-group v-if="getDayContent(data.day, 'averageValue')" full="full-x">
              <span class="static m-r-xxs">平均:</span>
              <span class="ellipsis">{{ getDayContent(data.day, 'averageValue') }}</span>
            </hl-group>
          </hl-group>
        </hl-group>
      </template>
    </hl-calendar>
  </hv-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

interface DateItem {
  date: string
  maxValue: string
  minValue: string
  averageValue: string
}
type DateKeys = 'maxValue' | 'minValue' | 'averageValue'

export default defineComponent({
  components: {},
  setup() {
    const value = ref(new Date()) as any
    const calendar = ref(null) as any
    // const currentDay = ref(dayjs().format('YYYY-MM-DD'))

    const selectDate = (value: string) => {
      calendar.value.selectDate(value)
    }
    const getDayContent = (date: string, code: DateKeys) => {
      const calendarData = [
        { date: '2021-11-16', maxValue: '1', minValue: '0', averageValue: '200' },
        { date: '2021-11-17', maxValue: '1', minValue: '0', averageValue: '200' },
        { date: '2021-11-18', maxValue: '1', minValue: '0', averageValue: '300' },
        { date: '2021-11-19', maxValue: '1', minValue: '0', averageValue: '400' },
        { date: '2021-11-20', maxValue: '1', minValue: '0', averageValue: '1500' },
      ]
      let itemObj = {} as DateItem
      calendarData.forEach((item: DateItem) => {
        if (item.date === date) {
          itemObj = item
        }
      })
      // 如果前面是空就用||
      return itemObj[code as DateKeys] ?? ''
    }
    const itemDate = (date: string) => {
      console.log(date, '当前选中date')
    }

    return {
      value,
      calendar,

      selectDate,
      getDayContent,
      itemDate,
    }
  },
})
</script>
<style lang="scss" scoped>
:deep(.hl-calendar) {
  .calendar-body {
    .calendar-table {
      .calendar-day {
        height: calc(var(--xxs) * 26);
        padding: 0;
        .current-selected {
          position: relative;
          color: var(--primary);
          padding: var(--xxs) var(--xs);
          width: 100%;
          height: 100%;
          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            border: 1px solid #fff;
            width: 100%;
            height: 100%;
            z-index: 1;
          }
        }
        .common-day {
          width: 100%;
          height: 100%;
          padding: var(--xxs) var(--xs);
        }
      }
      .current {
        color: #6f8ea8;
      }
    }
  }
}
</style>
