<template>
  <div ref="chartContainer" class="echart-container"></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import merge from 'lodash/merge'
import { useEChart } from 'hongluan-hooks'
import { useRenderChart, useResponsiveChart } from '@fx-front-framework/hooks'

import type { StackBarLegendItem, StackBarChartDataItem } from './types'

export default defineComponent({
  name: 'VStackedBarChart',
  props: {
    // 指标及配置 如: [{ label: "重大风险", key: "greatRisk", itemStyle: { color: "#FD6161" } }]
    legend: {
      required: true,
      type: Array as PropType<StackBarLegendItem[]>,
    },
    // y轴数据 如：[{  xValue: "一月", greatRisk: 20, biggerRisk: 40, normalRisk: 30, lowRisk: 11 }]
    chartData: {
      required: true,
      type: Array as PropType<StackBarChartDataItem[]>,
      deflautl: () => [],
    },
    xAxis: {
      type: Object,
      default: () => ({}),
    },
    yAxis: {
      type: Object,
      default: () => ({}),
    },
    grid: {
      type: Object,
      default: () => ({
        top: '20',
        left: '0',
        right: '0',
        bottom: '40',
        containLabel: true,
      }),
    },
    // echarts.tooltip
    tooltip: {
      type: Object,
      default: () => ({}),
    },
    // echarts.legend
    legendReal: {
      type: Object,
      default: () => ({}),
    },
    // echarts.dataZoom
    dataZoom: {
      type: Array,
      default: () => ([]),
    },
  },
  setup(props) {
    const { chartContainer, setChartOption } = useEChart()
    const { updateOptionToResponsive } = useResponsiveChart()

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

    const getSeriesData = () => props.legend.map(item => ({
      ...JSON.parse(JSON.stringify(seriesItemStyle)),
      itemStyle: item?.itemStyle ?? seriesItemStyle.itemStyle,
      barWidth: item?.barWidth ?? seriesItemStyle.barWidth,
      name: item.label,
      data: props.chartData?.map(ele => ele[item.key]),
    }))

    const renderChart = () => {
      const option = {
        grid: props.grid,
        legend: merge({
          data: props.legend.map(item => item.label),
          bottom: '3%',
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 16,
          textStyle: {
            fontSize: 12,
            color: '#A1A5B7',
          },
        }, props.legendReal),
        tooltip: merge({
          trigger: 'axis',
          axisPointer: {
            show: false,
            lineStyle: {
              color: 'rgba(255,255,255,0)',
              type: 'solid',
            },
          },
          extraCssText: 'border-radius: 0',
          textStyle: {
            fontSize: 14,
          },
        }, props.tooltip),
        xAxis: merge({
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
          data: props.chartData?.map(item => item.xValue),
        }, props.xAxis),
        yAxis: merge({
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
        }, props.yAxis),
        dataZoom: props.dataZoom,
        series: [
          ...getSeriesData(),
        ],
      }
      updateOptionToResponsive(option)
      setChartOption(option)
    }

    useRenderChart(renderChart, props)

    return {
      chartContainer,
    }
  },
})
</script>
