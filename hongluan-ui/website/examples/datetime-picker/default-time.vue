<template>
  <hl-row align="items-center" gap="var(--lg)">
    <hl-col span="col">
      <p class="m-b-md">起始日期时刻为 12:00:00</p>
      <hl-date-picker
        v-model="value1"
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="defaultTime1"
        block
      />
    </hl-col>
    <hl-col span="col">
      <p class="m-b-md">起始日期时刻为 12:00:00，结束日期时刻为 08:00:00</p>
      <hl-date-picker
        v-model="value2"
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="defaultTime2"
        block
      />
    </hl-col>
  </hl-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const defaultTime1 = [new Date(2000, 1, 1, 12, 0, 0)] // '12:00:00'
const defaultTime2 = [new Date(2000, 1, 1, 12, 0, 0), new Date(2000, 2, 1, 8, 0, 0)] // '12:00:00', '08:00:00'

const value1 = ref('')
const value2 = ref('')

</script>
