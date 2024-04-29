<template>
  <fx-v-spire-column-chart :chart-data="chartData" />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const chartData = [
      { label: '沣西新城', value: 20, color: ['rgba(83,78,225,1)', 'rgba(83,78,225,0)'] },
      { label: '沣东新城', value: 60, color: ['rgba(236,214,79,1)', 'rgba(236,214,79,0)'] },
      { label: '秦汉新城', value: 40, color: ['rgba(0,228,240,1)', 'rgba(0,228,240,0)'] },
      { label: '泾河新城', value: 90, color: ['rgba(68,209,109,1)', 'rgba(68,209,109,0)'] },
      { label: '泾河新城2', value: 60, color: ['rgba(18,78,145,1)', 'rgba(18,78,145,0)'] },
      { label: '测试新城', value: 70, color: ['rgba(189,196,20,1)', 'rgba(189,196,20,0)'] },
      { label: '测试新城2', value: 80, color: ['rgba(200,204,165,1)', 'rgba(200,204,165,0)'] },
    ]
    return {
      chartData,
    }
  },
})
</script>
