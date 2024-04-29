<template>
  <scrolling-bar-chart
    :chart-data="chartData"
    height="200px"
    :bar-style="{
      color: 'linear-gradient(90deg, rgba(114,245,172,0.16) 0%, #72F5AC 100%)',
      width: '8px',
      background: 'rgba(47,71,110,0.12)'
    }"
  />
</template>

<script>
import { defineComponent } from 'vue'
import ScrollingBarChart from './custom-charts/scrolling-bar-chart.vue'

export default defineComponent({
  components: { ScrollingBarChart },
  setup() {
    const chartData = [
      { value: 55, label: '大客流' },
      { value: 69, label: '人员聚集' },
      { value: 50, label: '明火烟雾' },
      { value: 20, label: '打架斗殴' },
      { value: 26, label: '小孩走失' },
      { value: 87, label: '非法越界' },
    ]
    return {
      chartData,
    }
  },
})
</script>
