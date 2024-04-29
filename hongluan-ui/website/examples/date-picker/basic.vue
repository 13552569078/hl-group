<template>
  <hl-row align="items-center" gap="var(--xl)">
    <hl-col span="lg:col-10 md:col-12">
      <p class="m-b-sm">默认</p>
      <hl-date-picker v-model="value1" type="date" placeholder="选择日期" :disabled="true" block>
        <template #icon>
          <hl-icon>
            <two-airplay />
          </hl-icon>
        </template>
      </hl-date-picker>
    </hl-col>
    <hl-col span="lg:col-10 md:col-12">
      <p class="m-b-sm">带快捷选项</p>
      <hl-date-picker
        v-model="value2"
        type="date"
        placeholder="选择日期"
        :disabled-date="disabledDate"
        :shortcuts="shortcuts"
        block
      />
    </hl-col>
  </hl-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TwoAirplay } from '@hongluan-ui/icons'

const disabledDate = time => {
  return time.getTime() > Date.now()
}
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
    text: '一周以前',
    value: (() => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    })(),
  },
]
const value1 = ref('')
const value2 = ref('')
</script>
