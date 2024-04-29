<template>
  <div ref="chartContainer" class="echart-container"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useEChart } from 'hongluan-hooks'
import { Indexable } from '@/types'

export default defineComponent({
  setup() {
    const { chartContainer, setChartOption } = useEChart()

    const seriesItemStyle = {
      itemStyle: {
        borderRadius: [2, 2, 0, 0],
      },
      barWidth: 22,
      type: 'bar',
      stack: 'one',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(56,75,103, 0.1)',
      },
    }

    const getSeriesData = () => chartLegend.map(item => ({
      ...seriesItemStyle,
      itemStyle: item?.itemStyle ?? seriesItemStyle.itemStyle,
      barWidth: item?.barWidth ?? seriesItemStyle.barWidth,
      name: item.label,
      data: chartData?.map(ele => ele[item.key]),
    }))

    const renderChart = () => {
      const option = {
        grid: {
          top: '20',
          left: '0%',
          right: '0%',
          bottom: '40',
          containLabel: true,
        },
        legend: {
          data: chartLegend.map(item => item.label),
          bottom: '3%',
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 16,
          textStyle: {
            fontSize: 12,
            color: '#A1A5B7',
          },
        },
        xAxis: {
          axisLabel: {
            interval: 0,
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
          type: 'category',
          data: chartData?.map(item => item.xValue),
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
          ...getSeriesData(),
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
const chartLegend = [
  {
    label: '工业安全',
    key: 'industrialSafety',
    barWidth: 22,
    itemStyle: { color: '#FD6161' },
  },
  {
    label: '密集场所',
    key: 'densePlace',
    barWidth: 22,
    itemStyle: {
      color: '#FB7E00',
    },
  },
  {
    label: '自然灾害',
    key: 'naturalDisaster',
    barWidth: 22,
    itemStyle: {
      color: '#D6B800',
    },
  },
  {
    label: '公共设施',
    key: 'utilities',
    barWidth: 22,
    itemStyle: {
      color: '#3E7DFF',
    },
  },
]
const chartData: Array<Indexable<any>> = [
  {
    xValue: '秦汉',
    industrialSafety: 20,
    densePlace: 40,
    naturalDisaster: 30,
    utilities: 11,
  },
  {
    xValue: '泾河',
    industrialSafety: 30,
    densePlace: 60,
    naturalDisaster: 10,
    utilities: 31,
  },
  {
    xValue: '沣西',
    industrialSafety: 60,
    densePlace: 40,
    naturalDisaster: 80,
    utilities: 41,
  },
  {
    xValue: '沣东',
    industrialSafety: 90,
    densePlace: 40,
    naturalDisaster: 10,
    utilities: 11,
  },
  {
    xValue: '空巷',
    industrialSafety: 40,
    densePlace: 70,
    naturalDisaster: 40,
    utilities: 21,
  },
  {
    xValue: '新城',
    industrialSafety: 90,
    densePlace: 120,
    naturalDisaster: 10,
    utilities: 31,
  },
  {
    xValue: '新城2',
    industrialSafety: 140,
    densePlace: 30,
    naturalDisaster: 40,
    utilities: 51,
  },
]
</script>
<style lang="scss" scoped>
.echart-container {
  min-height: 200px;
}
</style>
