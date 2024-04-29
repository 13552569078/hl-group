<template>
  <hl-row align="items-center" gap="var(--xl)">
    <hl-col span="col">
      <p class="m-b-sm">默认为 Date 对象</p>
      <hl-date-picker v-model="value1" type="date" placeholder="选择日期" format="YYYY 年 MM 月 DD 日" />
      <p class="m-t-lg">值：{{ value1 }}</p>
    </hl-col>
    <hl-col span="col">
      <p class="m-b-sm">使用value-format</p>
      <hl-date-picker
        v-model="value2"
        type="date"
        placeholder="选择日期"
        format="YYYY 年 MM 月 DD 日"
        value-format="YYYY/MM/DD"
      />
      <p class="m-t-lg">值：{{ value2 }}</p>
    </hl-col>
    <hl-col span="col">
      <p class="m-b-sm">时间戳</p>
      <hl-date-picker
        v-model="value3"
        type="date"
        placeholder="选择日期"
        format="YYYY 年 MM 月 DD 日"
        value-format="x"
      />
      <p class="m-t-lg">值：{{ value3 }}</p>
    </hl-col>
  </hl-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
</script>
