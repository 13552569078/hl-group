<template>
  <fx-v-pie-chart :chart-data="chartData" height="200px" title="17%" :fullTitle="{textStyle: {color: '#ffffff'}}"/>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const chartData = [
      {
        label: '重大风险',
        value: 40,
        color: '#FD6161',
      },
      {
        label: '较大风险',
        value: 20,
        color: '#FB7E00',
      },
      {
        label: '一般风险',
        value: 50,
        color: '#D6B800',
      },
      {
        label: '低风险',
        value: 10,
        color: '#3E7DFF',
      },
    ]
    return {
      chartData,
    }
  },
})
</script>
