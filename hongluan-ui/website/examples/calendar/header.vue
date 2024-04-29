<template>
  <hl-calendar ref="calendar">
    <template #header="{date}">
      <span>自定义头部内容</span>
      <span>{{ date }}</span>
      <hl-group>
        <hl-button size="sm" @click="selectDate('prev-year')">上一年</hl-button>
        <hl-button size="sm" @click="selectDate('prev-month')">上个月</hl-button>
        <hl-button size="sm" @click="selectDate('today')">今天</hl-button>
        <hl-button size="sm" @click="selectDate('next-month')">下个月</hl-button>
        <hl-button size="sm" @click="selectDate('next-year')">下一年</hl-button>
      </hl-group>
    </template>
  </hl-calendar>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const calendar = ref(null)
const selectDate = value => {
  calendar.value.selectDate(value)
}
</script>
