<template>
  <div ref="chartContainer" class="echart-container"></div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useEChart } from 'hongluan-hooks'
import { useRenderChart, useResponsiveChart } from '@fx-front-framework/hooks'

import type { SpireColumnChartData } from './types'

export default defineComponent({
  name: 'VSpireColumnChart',
  props: {
    chartData: {
      type: Array as PropType<SpireColumnChartData[]>,
      default: () => [],
    },
  },
  setup(props) {
    const { chartContainer, setChartOption } = useEChart()
    const { updateOptionToResponsive } = useResponsiveChart()

    const renderChart = () => {
      const option = {
        grid: {
          left: '0',
          top: '0',
          right: '0',
          bottom: '20%',
        },
        tooltip: {
          axisPointer: {
            type: 'none',
          },
          extraCssText: 'border-radius: 0;',
          formatter: (params: any) => {
            return params.componentType === 'series' ? `
              <div class="font-md" style="background-color:#fff;border-raduis:0;">
                ${params.marker}
                <span>${params.data.name} <span style="font-weight: bold; margin-left: var(--md)">${params.data.value}</span></span>
              </div>
            ` : ''
          },
        },
        legend: {
          data: props.chartData.map(d => ({
            name: d.label,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: d.color[0],
                },
                {
                  offset: 1,
                  color: d.color[1],
                },
                ],
                global: false,
              },
            },
          })),
          bottom: '-5',
          icon: 'rect',
          itemHeight: 12,
          itemWidth: 12,
          itemGap: 16,
          textStyle: {
            'color': '#84A4F6',
          },
        },
        xAxis: {
          type: 'category',
          data: props.chartData.map(d => d.label),
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            'show': false,
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        series: [
          ...new Array(props.chartData.length).fill(0).map((_, idx) => ({
            name: props.chartData[idx].label,
            data: new Array(props.chartData.length).fill(0),
            'stack': 'a',
            'type': 'bar',
          })),
          {
            type: 'pictorialBar',
            name: '',
            data: props.chartData.map(d => ({
              name: d.label,
              value: d.value,
              label: {
                show: true,
                position: 'top',
                fontSize: 14,
                fontWeight: 'bold',
                color: '#fff',
              },
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: d.color[0],
                  },
                  {
                    offset: 1,
                    color: d.color[1],
                  },
                  ],
                  global: false,
                },
              },
            })),
            stack: 'a',
            symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
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
