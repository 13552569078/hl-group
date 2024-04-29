<template>
  <div>
    <auto-scrolling-bar-chart :chart-data="chartData" :show-count="6" :scrolling-count="3" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import AutoScrollingBarChart from './custom-charts/auto-scrolling-bar-chart.vue'

export default defineComponent({
  components: { AutoScrollingBarChart },
  setup() {
    const chartData = [
      { label: '2002', value: 20 },
      { label: '2004', value: 60 },
      { label: '2006', value: 40 },
      { label: '2008', value: 90 },
      { label: '2010', value: 60 },
      { label: '2012', value: 70 },
      { label: '2014', value: 10 },
      { label: '2016', value: 50 },
      { label: '2018', value: 10 },
      { label: '2020', value: 50 },
    ]

    return {
      chartData,
    }
  },
})
</script>

<style lang="scss" scoped>
.echart-container {
  min-height: 200px;
}
</style>

