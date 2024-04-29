<template>
  <div ref="chartContainer" class="echart-container"></div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { useEChart } from 'hongluan-hooks'

export default defineComponent({
  setup() {
    const { chartContainer, setChartOption } = useEChart()

    const renderChart = () => {
      const option = {
        color: ['#4875F0', '#009EF7', '#05C6D0', '#28E2B2', '#79D42B', '#C0E135'],
        legend: {
          orient: 'vertical',
          icon: 'circle',
          right: '16%',
          top: 'center',
          itemWidth: 10,
          itemHeight: 10,
        },
        series: [ {
          name: '案例2',
          type: 'pie',
          radius: ['60%', '90%'],
          center: ['30%', '50%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
          },
          data: [
            { value: 300, name: 'a' },
            { value: 100, name: 'b' },
            { value: 100, name: 'c' },
            { value: 100, name: 'd' },
            { value: 50, name: 'e' },
            { value: 50, name: 'f' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.1)',
            },
          },
        }],
      }
      setChartOption(option)
    }

    onMounted(() => {
      renderChart()
    })

    return {
      chartContainer,
    }
  },
})
</script>

<style lang="scss" scoped>
.echart-container {
  min-height: 200px;
}
</style>
