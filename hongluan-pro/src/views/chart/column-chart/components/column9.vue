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
        grid: {
          left: 40,
          top: 25,
          bottom: 26,
          right: 0,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none',
          },
          extraCssText: 'border-radius: 0;',
        },
        legend: {
          data: ['正常', '异常'],
          right: '0',
          top: 'top',
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 20,
          textStyle: {
            fontSize: 12,
            color: 'rgba(128, 128, 160, 0.65)',
          },
        },
        xAxis: {
          axisLabel: {
            fontSize: 12,
            color: 'rgba(128, 128, 160, 0.65)',
            lineHeight: 20,
            margin: 5,
          },
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(128, 128, 160, 0.15)',
            },
          },
          type: 'category',
          data: ['2002', '2004', '2006', '2008', '2010', '2012', '2014', '2016'],
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: 'rgba(128, 128, 160, 0.15)',
            },
          },
          axisLabel: {
            fontSize: 12,
            color: 'rgba(128, 128, 160, 0.65)',
            lineHeight: 20,
          },
          type: 'value',
        },
        series: [{
          itemStyle: {
            color: '#F1E723',
            borderRadius: [2, 2, 0, 0],
          },
          barWidth: 24,
          name: '正常',
          data: [20, 60, 40, 90, 60, 70, 10, 40],
          type: 'bar',
          stack: 'one',
        }, {
          itemStyle: {
            color: '#79D42B',
            borderRadius: [0, 0, 2, 2],
          },
          barWidth: 30,
          name: '异常',
          data: [-70, -10, -40, -40, -10, -70, -10, -40],
          type: 'bar',
          stack: 'one',
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
