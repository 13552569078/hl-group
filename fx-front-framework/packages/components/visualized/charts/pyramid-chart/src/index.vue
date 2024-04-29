<template>
  <div ref="chartContainer" class="echart-container"></div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import * as echarts from 'echarts'
import { useEChart } from 'hongluan-hooks'
import { useRenderChart, useResponsiveChart } from '@fx-front-framework/hooks'

import type { PyramidChartData } from './types'

export default defineComponent({
  name: 'VPyramidChart',
  props: {
    chartData: {
      type: Array as PropType<PyramidChartData[]>,
      default: () => [],
    },
  },
  setup(props) {
    const { chartContainer, setChartOption } = useEChart()
    const { updateOptionToResponsive } = useResponsiveChart()

    const renderChart = () => {
      const option = {
        // tooltip: {
        //   axisPointer: {
        //     type: 'none',
        //   },
        //   extraCssText: 'border-radius: 0;',
        //   formatter: (params: any) => {
        //     return params.componentType === 'series' ? `
        //       <div style="backgroundColor:#fff;borderRaduis:0">
        //         ${params.marker}
        //         <span>${params.data.name} <span style="font-weight: bold; margin-left: var(--md)">${params.data.value}</span></span>
        //       </div>
        //     ` : ''
        //   },
        // },
        legend: {
          data: props.chartData.map(d => d.label),
          bottom: '-5',
          icon: 'rect',
          itemHeight: 12,
          itemWidth: 12,
          itemGap: 16,
          textStyle: {
            'color': '#84A4F6',
          },
        },
        series: [{
          type: 'funnel',
          left: '10%',
          top: 0,
          bottom: 45,
          width: '80%',
          sort: 'ascending',
          // min: 0,
          // max: Math.max(...props.chartData.map(d => d.value)),
          // minSize: '0%',
          // maxSize: '100%',
          gap: 2,
          label: {
            show: false,
            position: 'inside',
          },
          emphasis: {
            label: {
              color: '#fff',
              fontSize: 14,
              formatter: '{c}',
              backgroundColor: 'transparent',
              fontWeight: 'bold',
            },
            labelLine: {
              show: false,
            },
          },
          data: props.chartData.map(d => ({
            value: d.value,
            name: d.label,
            itemStyle: {
              color: typeof d.color === 'string' ? d.color : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: d.color[0] },
                { offset: 1, color: d.color[1] },
              ]),
              borderWidth: 0,
              borderRadius: [2, 2, 0, 0],
            },
          })),
        }],
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
