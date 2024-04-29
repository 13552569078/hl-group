<template>
  <fx-v-proportion-pie-chart :legend="legend" :chart-data="chartData" style="height: 400px;" />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const chartData = [
      { label: '应急车辆', value: 10, color: '#CDE5F0' },
      { label: '防护装备', value: 20, color: '#9084FF' },
      { label: '医疗装备', value: 30, color: '#72F5AC' },
      { label: '抢险装备', value: 20, color: '#FD6161' },
      { label: '救援装备', value: 10, color: '#FD892F' },
      { label: '食品物资', value: 5, color: '#DBC200' },
      { label: '其他物资', value: 5 },
    ]
    return {
      chartData,
    }
  },
})
</script>
