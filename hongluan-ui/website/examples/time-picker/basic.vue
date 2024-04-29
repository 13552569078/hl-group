<template>
  <hl-row align="items-center" gap="var(--xl)">
    <hl-col span="lg:col-10">
      <p class="m-b-md">
        使用的箭头进行选择：
        <code>arrow-control</code>
      </p>
      <hl-time-picker
        v-model="value2"
        arrow-control
        :disabled-hours="disabledHours"
        :disabled-minutes="disabledMinutes"
        :disabled-seconds="disabledSeconds"
        placeholder="任意时间点"
        block
      >
        <template #icon>
          <hl-icon>
            <two-airplay />
          </hl-icon>
        </template>
      </hl-time-picker>
    </hl-col>
    <hl-col span="lg:col-10">
      <p class="m-b-md">鼠标滚轮进行选择：默认</p>
      <hl-time-picker
        v-model="value1"
        :disabled-hours="disabledHours"
        :disabled-minutes="disabledMinutes"
        :disabled-seconds="disabledSeconds"
        placeholder="任意时间点"
        block
      />
    </hl-col>
  </hl-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { TwoAirplay } from '@hongluan-ui/icons'

const makeRange = (start, end) => {
  const result = []
  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
}

let value1 = ref(new Date(2016, 9, 10, 18, 40))
let value2 = ref(new Date(2016, 9, 10, 18, 40))

// 如允许 17:30:00 - 18:30:00
const disabledHours = () => {
  return makeRange(0, 16).concat(makeRange(19, 23))
}

const disabledMinutes = hour => {
  if (hour === 17) {
    return makeRange(0, 29)
  }
  if (hour === 18) {
    return makeRange(31, 59)
  }
}

const disabledSeconds = (hour, minute) => {
  if (hour === 18 && minute === 30) {
    return makeRange(1, 59)
  }
}

</script>
