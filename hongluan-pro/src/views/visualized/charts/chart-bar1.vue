<template>
  <div ref="chartContainer" class="echart-container"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import * as echarts from 'echarts'
import { useEChart } from 'hongluan-hooks'

export default defineComponent({
  setup() {
    const { chartContainer, setChartOption } = useEChart()

    const renderChart = () => {
      const option = {
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
        grid: {
          top: '10',
          left: '0%',
          right: '0%',
          bottom: '0%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            fontSize: 12,
            color: '#6F8EA8',
            lineHeight: 20,
            margin: 5,
          },
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: '#2B394E',
            },
          },
          data: ['2002', '2004', '2006', '2008', '2010', '2012', '2014', '2016'],
        },
        yAxis: {
          splitNumber: 3,
          splitLine: {
            lineStyle: {
              type: 'solid',
              color: '#2B394E',
            },
          },
          axisLabel: {
            fontSize: 12,
            color: '#6F8EA8',
            lineHeight: 20,
          },
          type: 'value',
        },
        series: [
          {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2EF4FF' },
                { offset: 1, color: 'rgba(44,218,249,0.17)' },
              ]),
              borderRadius: [2, 2, 0, 0],
            },
            barWidth: 16,
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(56,75,103,0.16)',
            },
            data: [20, 60, 40, 90, 60, 70, 10, 40],
            type: 'bar',
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

