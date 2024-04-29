<template>
  <hl-row align="items-center" gap="var(--xl)">
    <hl-col span="lg:col-12">
      <p class="m-b-md">默认</p>
      <hl-date-picker
        v-model="value1"
        type="monthrange"
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
        block
      />
    </hl-col>
    <hl-col span="lg:col-12">
      <p class="m-b-md">带快捷选项</p>
      <hl-date-picker
        v-model="value2"
        type="monthrange"
        unlink-panels
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
        :shortcuts="shortcuts"
        block
      />
    </hl-col>
  </hl-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const shortcuts = [
  {
    text: '本月',
    value: [new Date(), new Date()],
  },
  {
    text: '今年至今',
    value: (() => {
      const end = new Date()
      const start = new Date(new Date().getFullYear(), 0)
      return [start, end]
    })(),
  },
  {
    text: '最近六个月',
    value: (() => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 6)
      return [start, end]
    })(),
  },
]

const value1 = ref('')
const value2 = ref('')

</script>
