<template>
  <div ref="chartContainer" class="echart-container"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType } from 'vue'
import merge from 'lodash/merge'
import * as echarts from 'echarts'
import { useEChart, useScrollEChartData } from 'hongluan-hooks'

export default defineComponent({
  props: {
    chartData: {
      type: Array as PropType<BarChartData[]>,
      default: () => [],
    },
    barWidth: {
      type: Number,
      default: 16,
    },
    barColor: {
      type: [String, Array] as PropType<string | [string, string]>,
      default: () => ['#71F8FC', 'rgba(0,250,255,0.16)'],
    },
    backgroundColor: {
      type: String,
      default: 'rgba(56,75,103,0.16)',
    },
    // 每次滚动个数
    scrollCount: {
      type: Number,
      default: 4,
    },
    // 每次展示个数
    showCount: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER,
    },
    // 定时器时间间隔
    interval: {
      type: Number,
      default: 5000,
    },
    xAxis: {
      type: Object,
      default: () => ({}),
    },
    yAxis: {
      type: Object,
      default: () => ({}),
    },
    hoverStop: Boolean,
    isVertical: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const { chartContainer, setChartOption, addChartEvent } = useEChart()
    const renderChart = (chartData: BarChartData[]) => {
      const colorDir: [number, number, number, number] = props.isVertical ? [0, 0, 0, 1] : [1, 0, 0, 0]
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
        xAxis: merge({
          type: props.isVertical ? 'category' : 'value',
          splitLine: {
            show: props.isVertical ? false : true,
            lineStyle: {
              type: 'solid',
              color: '#2B394E',
            },
          },
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
          data: props.isVertical ? chartData.map(d => d.label) : null,
        }, props.xAxis),
        yAxis: merge({
          type: props.isVertical ? 'value' : 'category',
          splitNumber: 3,
          splitLine: {
            show: props.isVertical ? true : false,
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
          data: props.isVertical ? null : chartData.map(d => d.label),
        }, props.yAxis),
        series: [
          {
            itemStyle: {
              color: typeof props.barColor === 'string' ? props.barColor : new echarts.graphic.LinearGradient(...colorDir, [
                { offset: 0, color: props.barColor[0] },
                { offset: 1, color: props.barColor[1] },
              ]),
              borderRadius: [2, 2, 0, 0],
            },
            barWidth: props.barWidth,
            showBackground: true,
            backgroundStyle: {
              color: props.backgroundColor,
            },
            data: chartData.map(d => d.value),
            type: 'bar',
          },
        ],
      }
      setChartOption(option)
    }

    const { startScroll, stopScroll } = useScrollEChartData({
      showCount: props.showCount,
      scrollCount: props.scrollCount,
      interval: props.interval,
      chartData: props.chartData,
    }, renderChart as (params: unknown[]) => void)

    onMounted(() => {
      startScroll()
      if (props.hoverStop) {
        addChartEvent('mouseover', stopScroll)
        addChartEvent('mouseout', startScroll)
      }
    })

    return {
      chartContainer,
    }
  },
})
export interface BarChartData {
  label: string
  value: number
}
</script>
