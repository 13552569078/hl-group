<template>
  <hl-row gap="var(--lg)">
    <hl-col span="lg:col-8">
      <p class="m-b-sm">默认</p>
      <hl-date-picker v-model="value1" type="datetime" placeholder="选择日期时间" block />
    </hl-col>
    <hl-col span="lg:col-8">
      <p class="m-b-sm">带快捷选项</p>
      <hl-date-picker v-model="value2" type="datetime" placeholder="选择日期时间" :shortcuts="shortcuts" block />
    </hl-col>
    <hl-col span="lg:col-8">
      <p class="m-b-sm">设置默认时间</p>
      <hl-date-picker v-model="value3" type="datetime" placeholder="选择日期时间" :default-time="defaultTime" block />
    </hl-col>
  </hl-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const shortcuts = [
  {
    text: '今天',
    value: new Date(),
  },
  {
    text: '昨天',
    value: (() => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    })(),
  },
  {
    text: '一周前',
    value: (() => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    })(),
  },
]
const defaultTime = new Date(2000, 1, 1, 12, 0, 0)

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')

</script>
