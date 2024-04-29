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
          top: '10',
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
          formatter: (params: any) => `
          <div style="backgroundColor:#fff;borderRaduis:0">
            ${params[0].marker}
            <span>${params[0].axisValue} <span style="font-weight: bold; margin-left: 30px">${params[0].value}</span></span>
          </div>
          `,
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
        series: [
          {
            itemStyle: {
              color: '#009EF7',
            },
            symbolSize: 6,
            lineStyle: {
              width: 3,
            },
            data: [20, 30, 18, 36, 40, 50, 70, 80],
            type: 'line',
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
