<template>
  <fx-v-rose-pie-chart :chart-data="chartData" />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const chartData = [
      {
        label: '重大风险',
        value: 30,
        color: '#FD6161',
      },
      {
        label: '较大风险',
        value: 50,
        color: '#FB7E00',
      },
      {
        label: '一般风险',
        value: 80,
        color: '#D6B800',
      },
      {
        label: '低风险',
        value: 90,
        color: '#3E7DFF',
      },
    ]
    return {
      chartData,
    }
  },
})
</script>
