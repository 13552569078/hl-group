<template>
  <hl-row align="items-center" gap="var(--xl)">
    <hl-col span="lg:col-10">
      <hl-time-picker
        v-model="value2"
        is-range
        arrow-control
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        placeholder="选择时间范围"
        block
      />
    </hl-col>
    <hl-col span="lg:col-10">
      <hl-time-picker
        v-model="value1"
        is-range
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        placeholder="选择时间范围"
        block
      />
    </hl-col>
  </hl-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

let value1 = ref([new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)])
let value2 = ref([new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)])

</script>
