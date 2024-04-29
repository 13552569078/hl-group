<template>
  <div ref="chartContainer" class="echart-container"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useEChart } from 'hongluan-hooks'

export default defineComponent({
  setup() {
    const { chartContainer, setChartOption } = useEChart()

    const renderChart = () => {
      const option = {
        color: ['#4875F0', '#009EF7', '#05C6D0', '#28E2B2', '#79D42B', '#C0E135', '#F1E723', '#F7BF4C', '#E4697D', '#A462D7', '#6C5FF8'],
        legend: {
          orient: 'vertical',
          icon: 'circle',
          right: '10%',
          top: 'center',
          itemWidth: 10,
          itemHeight: 10,
        },
        series: [ {
          name: '案例1',
          type: 'pie',
          radius: '90%',
          center: ['30%', '50%'],
          label: {
            show: false,
          },
          data: [
            { value: 80, name: 'a' },
            { value: 100, name: 'b' },
            { value: 100, name: 'c' },
            { value: 100, name: 'd' },
            { value: 100, name: 'e' },
            { value: 100, name: 'f' },
            { value: 100, name: 'g' },
            { value: 200, name: 'h' },
            { value: 100, name: 'i' },
            { value: 100, name: 'j' },
            { value: 100, name: 'k' },
            { value: 100, name: 'l' },
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
