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
        title: {
          text: '50.0%',
          subtext: '承诺百分比',
          top: '36%',
          left: 'center',
          textStyle: {
            color: '#3F4254',
            fontSize: 28,
            fontWeight: 'bold',
          },
          subtextStyle: {
            color: '#5E6278',
            fontSize: 14,
          },
        },
        legend: {
          show: false,
        },
        series: [ {
          name: '案例3',
          type: 'pie',
          radius: ['70%', '90%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          z: 2,
          label: {
            show: false,
          },
          data: [
            { value: 50,
              name: 'a',
              itemStyle: {
                color: '#4875F0',
                borderWidth: 0,
              },
            },
            { value: 50,
              itemStyle: {
                color: 'rgba(0, 0, 0, 0)',
                borderWidth: 0,
              },
            },
          ],
        },
        {
          name: '背景',
          type: 'pie',
          radius: ['70%', '90%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          z: 1,
          label: {
            show: false,
          },
          data: [
            { value: 100,
              itemStyle: {
                color: '#EFF2F5',
                borderWidth: 0,
              },
            },
          ],
        },
        ],
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
