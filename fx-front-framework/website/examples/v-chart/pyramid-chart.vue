<template>
  <fx-v-pyramid-chart :chart-data="chartData" style="height: 300px;" />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const chartData = [
      { label: '沣西新城', value: 2, color: ['rgba(114,245,172,0.00)', 'rgba(114,245,172,0.56)'] },
      { label: '沣东新城', value: 160, color: ['rgba(37,129,255,0.00)', 'rgba(37,129,255,0.56)'] },
      { label: '秦汉新城', value: 90, color: ['rgba(255,234,68,0.00)', 'rgba(255,234,68,0.56)'] },
      { label: '泾河新城', value: 190, color: ['rgba(255,84,84,0.0)', 'rgba(255,84,84,0.56)'] },
      { label: '泾河新城', value: 40, color: ['rgba(253,137,47,0.00)', 'rgba(253,137,47,0.56)'] },
      { label: '测试新城', value: 40, color: ['rgba(253,137,47,0.00)', 'rgba(253,137,47,0.56)'] },
      { label: '测试新城2', value: 40, color: ['rgba(253,137,47,0.00)', 'rgba(253,137,47,0.56)'] },
    ]
    return {
      chartData,
    }
  },
})
</script>
