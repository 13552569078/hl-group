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
        legend: {
          data: ['类别1', '类别2', '类别3'],
          left: 10,
          icon: 'roundRect',
          itemWidth: 10,
          itemHeight: 10,
          orient: 'vertical',
        },
        radar: {
          indicator: [
            { name: 'A', max: 1000, color: '#5E6278', axisLabel: { show: true } },
            { name: 'B', max: 1000, color: '#5E6278' },
            { name: 'C', max: 1000, color: '#5E6278' },
            { name: 'D', max: 1000, color: '#5E6278' },
            { name: 'E', max: 1000, color: '#5E6278' },
          ],
          splitNumber: 4,
          splitLine: {
            lineStyle: {
              color: '#EFF2F5',
            },
          },
          axisLine: {
            lineStyle: {
              color: '#EFF2F5',
            },
          },
          axisLabel: {
            color: '#A1A5B7',
          },
          splitArea: {
            areaStyle: {
              color: 'transparent',
            },
          },
        },
        series: [{
          name: '案例1',
          type: 'radar',
          symbol: 'none',
          data: [
            {
              value: [1000, 900, 200, 900, 500],
              name: '类别1',
              lineStyle: {
                color: 'rgba(0, 158, 247, 1)',
              },
              areaStyle: {
                color: 'rgba(0, 158, 247, .2)',
              },
            },
            {
              value: [500, 490, 700, 800, 420],
              name: '类别2',
              lineStyle: {
                color: 'rgba(241, 231, 35, 1)',
              },
              areaStyle: {
                color: 'rgba(241, 231, 35, .2)',
              },
            },
            {
              value: [900, 300, 910, 710, 620],
              name: '类别3',
              lineStyle: {
                color: 'rgba(121, 212, 43, 1)',
              },
              areaStyle: {
                color: 'rgba(121, 212, 43, .2)',
              },
            },
          ],
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

