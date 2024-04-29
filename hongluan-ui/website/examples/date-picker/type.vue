<template>
  <hl-row align="items-center" gap="var(--xl)">
    <hl-col span="md:col-12 lg:col-10">
      <p class="m-b-sm">周</p>
      <hl-date-picker v-model="value1" type="week" format="gggg 第 ww 周" placeholder="选择周" block />
    </hl-col>
    <hl-col span="md:col-12 lg:col-10">
      <p class="m-b-sm">月</p>
      <hl-date-picker v-model="value2" type="month" placeholder="选择月" block />
    </hl-col>
  </hl-row>

  <hl-row align="items-center" gap="var(--xl)" class="m-t-lg">
    <hl-col span="md:col-12 lg:col-10">
      <p class="m-b-sm">年</p>
      <hl-date-picker v-model="value3" type="year" placeholder="选择年" block />
    </hl-col>
    <hl-col span="md:col-12 lg:col-10">
      <p class="m-b-sm">多个日期</p>
      <hl-date-picker v-model="value4" type="dates" placeholder="选择一个或多个日期" block />
    </hl-col>
  </hl-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const value4 = ref('')
</script>

