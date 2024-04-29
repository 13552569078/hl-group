<template>
  <hl-group full="full-x" align="items-middle" gap="var(--md)" style="height: 100%">
    <div
      ref="chartContainer"
      class="static"
      :style="`min-height: ${showLabel ? height : '100%'}; min-width: ${showLabel ? height : '100%'}`"
    ></div>
    <hl-group
      v-if="showLabel"
      dir="vertical"
      align="items-center"
      :gap="legend.gapY"
      class="static p-r-md"
      style="width: 45%; height:100%; overflow-y:auto"
    >
      <hl-group
        v-for="(item, index) in chartData"
        :key="index"
        :gap="legend.gapX"
        align="items-middle items-between"
        :class="['cursor-pointer static', isHighlights[index] ? 'is-checked' : '']"
        :style="`opacity:${isHides[index] ? 0.2 : 1}`"
        @click="hideSerie(index)"
      >
        <span class="echart-fill-rect static" :style="`background-color:${item.color}`"></span>
        <span class="text-secondary font-md w-full checked:text-link">{{ item.label }}</span>
        <h3 class="font-lg font-din static">{{ item.value }}</h3>
      </hl-group>
    </hl-group>
  </hl-group>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from 'vue'
import { useEChart } from 'hongluan-hooks'
import { HlGroup } from 'hongluan-ui'
import * as echarts from 'echarts'
import { useRenderChart, useResponsiveChart } from '@fx-front-framework/hooks'
import merge from 'lodash/merge'

import type { PieChartData } from './types'

export default defineComponent({
  name: 'VPieChart',
  components: { HlGroup },
  props: {
    chartData: {
      type: Array as PropType<PieChartData[]>,
      default: () => [],
    },
    height: {
      type: String,
      default: 'calc(var(--xxl) * 5)',
    },
    radius: {
      type: Array as PropType<string[]>,
      default: () => ['20%', '70%'],
    },
    legend: {
      type: Object as PropType<{ gap: string; }>,
      default: () => ({ gapX: 'var(--sm)', gapY: 'var(--sm)' }),
    },
    title: {
      type: String,
      default: '',
    },
    fullTitle: {
      type: Object,
      default: () => ({}),
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
    // echarts.tooltip
    tooltip: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const { chartContainer, setChartOption, addChartEvent } = useEChart()
    const { updateOptionToResponsive } = useResponsiveChart()

    const isHides = ref<boolean[]>([])
    const isHighlights = ref<boolean[]>([])
    const color = ref([] as string[])

    const setColor = () => {
      color.value = []
      props.chartData.forEach((item, index) => {
        if (item.value !== 0 && !isHides.value[index]) {
          color.value.push(item.color, 'transparent')
        }
      })
    }
    const setChartData = (data: PieChartData[]) => {
      const data1 = [] as PieChartData[]
      const sum = data.reduce((prev, cur) => prev + cur.value, 0)
      const nonZeroCount = data.filter(d => d.value).length
      // 给每个数据后添加特定的透明的数据形成间隔
      data.forEach((item, idx) => {
        if (item.value !== 0 && !isHides.value[idx]) {
          data1.push(item, {
            label: '',
            value: nonZeroCount <= 1 ? 0 : sum / 70, // 根据总值算间隔大小
            color: '',
            labelLine: {
              show: false,
              lineStyle: {
                color: 'transparent',
              },
            },
            itemStyle: {
              color: 'transparent',
            },
          })
        }
      })
      return data1
    }
    const renderChart = () => {
      setColor()
      const data1 = setChartData(props.chartData)
      // 每层圆环大小
      const radius2 = [Number(props.radius[1].split('%')[0]) - 10 + '%', Number(props.radius[1].split('%')[0]) + 4 + '%']
      const radius3 = [Number(props.radius[1].split('%')[0]) + 4 + '%', Number(props.radius[1].split('%')[0]) + 8 + '%']

      const option = {
        tooltip: merge({
          confine: true,
          axisPointer: {
            type: 'none',
          },
          extraCssText: 'border-radius: 0;',
          formatter: (params: any) => {
            return params.seriesIndex <= 1 && params.componentType === 'series' ? `
              <div class="font-md" style="background-color:#fff;border-raduis:0;">
                ${params.marker}
                <span>${params.data.label} <span style="font-weight: bold; margin-left: var(--md)">${params.data.value}</span></span>
              </div>
            ` : ''
          },
        }, props.tooltip),
        title: [
          merge({
            text: props.title,
            top: 'center',
            left: 'center',
            textStyle: {
              color: '#6F8EA8',
              fontSize: 14,
            },
           }, props.fullTitle),
        ],
        series: [
          // 最外层圆环
          {
            type: 'pie',
            radius: radius3,
            center: ['50%', '50%'],
            startAngle: 90,
            selectedMode: 'single',
            selectedOffset: 0,
            itemStyle: {
              color: (params: any) => color.value[params.dataIndex],
            },
            emptyCircleStyle: {
              color: 'rgba(47,71,110,0.12)',
            },
            label: {
              show: false,
            },
            data: data1,
            emphasis: {
              scale: true,
            },
          },
          {
            type: 'pie',
            radius: radius2,
            center: ['50%', '50%'],
            startAngle: 90,
            selectedMode: 'single',
            selectedOffset: 0,
            itemStyle: {
              color: (params: any) => color.value[params.dataIndex],
              opacity: 0.16,
            },
            emptyCircleStyle: {
              color: 'rgba(47,71,110,0.12)',
            },
            label: {
              show: false,
            },
            emphasis: {
              scale: false,
            },
            data: data1,
          },
          {
            type: 'pie',
            radius: ['49%', '50%'],
            center: ['50%', '50%'],
            startAngle: 90,
            selectedMode: 'single',
            selectedOffset: 0,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(64,83,112,0.6)' },
                { offset: 0.5, color: 'rgba(0,0,0,0.00)' },
                { offset: 1, color: 'rgba(64,83,112,0.6)' },
              ]),
            },
            label: {
              show: false,
            },
            emphasis: {
              scale: false,
            },
            data: [100],
          },
          {
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],
            startAngle: 90,
            selectedMode: 'single',
            selectedOffset: 0,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(64,83,112,0.23)' },
                { offset: 0.5, color: 'rgba(0,0,0,0)' },
                { offset: 1, color: 'rgba(64,83,112,0.23)' },
              ]),
            },
            label: {
              show: false,
            },
            emphasis: {
              scale: false,
            },
            data: [100],
          },
        ],
      }
      updateOptionToResponsive(option)
      setChartOption(option)
    }
    const hideSerie = (idx: number) => {
      isHides.value[idx] = !isHides.value[idx]
      renderChart()
    }

    useRenderChart(renderChart, props)

    onMounted(() => {
      addChartEvent('click', (params: any) => {
        if (params.componentType === 'series' && params.seriesIndex === 0) {
          const idx = props.chartData.findIndex(c => c.label === params.data.label)
          if (idx > -1) {
            isHighlights.value.fill(false)
            isHighlights.value[idx] = true
          }
        }
      })
    })

    return {
      chartContainer,
      isHides,
      isHighlights,
      hideSerie,
    }
  },
})
</script>
