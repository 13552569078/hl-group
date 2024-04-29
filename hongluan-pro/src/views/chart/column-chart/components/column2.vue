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
          top: '32',
          left: '0%',
          right: '0%',
          bottom: '0%',
          containLabel: true,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none',
          },
          extraCssText: 'border-radius: 0;',
        },
        legend: {
          data: ['天然气', '煤炭', '风能'],
          right: '0',
          top: 'top',
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 16,
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
          splitNumber: 3,
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
          barWidth: 22,
          name: '天然气',
          data: [20, 60, 40, 90, 60, 70, 10, 40],
          type: 'bar',
          stack: 'one',
        }, {
          itemStyle: {
            color: '#79D42B',
            borderRadius: [2, 2, 0, 0],
          },
          barWidth: 22,
          name: '煤炭',
          data: [20, 60, 40, 90, 60, 70, 10, 40],
          type: 'bar',
          stack: 'one',
        }, {
          itemStyle: {
            color: '#009EF7',
            borderRadius: [2, 2, 0, 0],
          },
          barWidth: 22,
          name: '风能',
          data: [20, 60, 40, 90, 60, 70, 10, 40],
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
