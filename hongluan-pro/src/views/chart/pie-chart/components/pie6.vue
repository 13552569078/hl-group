<template>
  <div ref="chartContainer" class="echart-container"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useEChart } from 'hongluan-hooks'

export default defineComponent({
  setup() {
    const { chartContainer, setChartOption } = useEChart()
    const echartsData = [
      {
        name: 'a',
        value: 20,
      },
      {
        name: 'b',
        value: 30,
      },
      {
        name: 'c',
        value: 30,
      },
      {
        name: 'd',
        value: 10,
      },
    ]

    const getEchartsSeries = () => {
      const sumValue = echartsData.reduce((pre, cur) => {
        return pre + Number(cur.value)
      }, 0)
      const res = {
        series: [],
      }
      for (let i = 1; i <= echartsData.length; i++) {
        res.series.push({
          name: '案例6',
          type: 'pie',
          clockWise: true,
          silent: true,
          roundCap: true,
          z: 2,
          hoverAnimation: false,
          radius: [100 - i * 12 + '%', 92 - i * 12 + '%'],
          center: ['30%', '50%'],
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          data: [
            {
              value: echartsData[i - 1].value,
              name: echartsData[i - 1].name,
            },
            {
              value: sumValue - echartsData[i - 1].value,
              name: '',
              itemStyle: {
                color: 'rgba(0,0,0,0)',
                borderWidth: 0,
              },
              tooltip: {
                show: false,
              },
              label: {
                show: false,
              },
              hoverAnimation: false,
            },
          ],
        })
        res.series.push({
          name: '背景线',
          type: 'pie',
          roundCap: true,
          silent: true,
          z: 1,
          clockWise: true,
          hoverAnimation: false,
          radius: [100 - i * 12 + '%', 92 - i * 12 + '%'],
          center: ['30%', '50%'],
          label: {
            show: false,
          },
          itemStyle: {
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            borderWidth: 5,
          },
          data: [
            {
              value: 100,
              itemStyle: {
                color: 'rgba(128, 128, 160, 0.15)',
                borderWidth: 0,
              },
              tooltip: {
                show: false,
              },
              hoverAnimation: false,
            },
          ],
        })
      }
      return res
    }
    const renderChart = () => {
      const option = {
        color: ['#4875F0', '#79D42B', '#F1E723', '#F7BF4C'],
        title: {
          text: '承诺情况',
          top: 'center',
          left: '21%',
          textStyle: {
            color: 'rgba(128, 128, 160, 0.9)',
            fontSize: 16,
            fontWidth: '500',
          },
        },
        legend: {
          show: true,
          right: '30%',
          top: 'center',
          icon: 'circle',
          itemWidth: 10,
          itemHeight: 10,
        },
        series: getEchartsSeries().series,
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
