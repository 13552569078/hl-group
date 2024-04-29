<template>
  <div ref="chartContainer" class="echart-container"></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import * as echarts from 'echarts'
import merge from 'lodash/merge'
import { useEChart } from 'hongluan-hooks'
import { useRenderChart, useResponsiveChart } from '@fx-front-framework/hooks'

import type { LineSeriesDataItem, LineChartDataItem } from './types'

export default defineComponent({
  name: 'VLineChart',
  props: {
    // 指标及配置 如: [{ label: "重大风险", key: "level1", itemStyle: { color: "#FD6161" } }]
    seriesData: {
      required: true,
      type: Array as PropType<LineSeriesDataItem[]>,
    },
    // y轴数据 如：[{  xValue: "一月", level1: 20, level2: 40, level3: 30, level4: 11 }]
    chartData: {
      required: true,
      type: Array as PropType<LineChartDataItem[]>,
      default: () => [],
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
    // echarts.legend
    legend: {
      type: Object,
      default: () => ({}),
    },
    // echarts.tooltip
    tooltip: {
      type: Object,
      default: () => ({}),
    },
    showArea: {
      type: Boolean,
      default: false,
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
        color: '#F1E723',
      },
      showSymbol: false,
      symbolSize: 4,
      lineStyle: {
        width: 2,
      },
      type: 'line',
    }

    const getSeriesData = () =>
      props.seriesData.map(item => ({
        ...JSON.parse(JSON.stringify(seriesItemStyle)),
        itemStyle: item?.itemStyle ?? seriesItemStyle.itemStyle,
        name: item.label,
        data: props.chartData?.map(ele => ele[item.key]),
        areaStyle: item.areaStyleColor ? {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: item.areaStyleColor[0],
            },
            {
              offset: 1,
              color: item.areaStyleColor[1],
            },
          ]),
        } : undefined,
      }))

    const renderChart = () => {
      const option = {
        grid: props.grid,
        legend: merge({
          data: props.seriesData.map(item => item.label),
          icon: 'rect',
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 20,
          textStyle: {
            fontSize: 12,
            color: '#A1A5B7',
          },
        }, props.legend),
        tooltip: merge({
          trigger: 'axis',
          axisPointer: {
            show: false,
            lineStyle: {
              color: 'rgba(255,255,255,0)',
              type: 'solid',
            },
          },
          textStyle: {
            fontSize: 14,
          },
          extraCssText: 'border-radius: 0',
        }, props.tooltip),
        xAxis: merge({
          axisLabel: {
            fontSize: 12,
            color: '#6F8EA8',
            lineHeight: 24,
            margin: 5,
          },
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: '#34435A',
            },
          },
          type: 'category',
          data: props.chartData?.map(item => item.xValue),
        }, props.xAxis),
        yAxis: merge({
          splitLine: {
            lineStyle: {
              type: 'line',
              color: '#253346',
            },
          },
          axisLabel: {
            fontSize: 12,
            color: '#6F8EA8',
            lineHeight: 24,
          },
          type: 'value',
          nameTextStyle: {
            color: '#6F8EA8',
            align: 'left',
            padding: [0, 0, 0, -22],
          },
        }, props.yAxis),
        dataZoom: props.dataZoom,
        series: [
          ...getSeriesData(),
          {
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(56,75,103,0.16)',
            },
            itemStyle: {
              color: 'rgba(180, 180, 180, 0)',
            },
            barMaxWidth: 24,
            name: '',
            data: Array(props.chartData?.length).fill(0),
            selectedMode: false,
            type: 'bar',
            tooltip: {
              show: false,
            },
          },
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
