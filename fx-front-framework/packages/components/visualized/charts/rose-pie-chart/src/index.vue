<template>
  <hl-group full="full-x" align="items-middle" gap="var(--md)" style="height: 100%">
    <div
      ref="chartContainer"
      class="echart-container static"
      :style="`min-height: ${showLabel ? height : '100%'}; min-width: ${showLabel ? height : '100%'}`"
    ></div>
    <hl-group
      v-if="showLabel"
      dir="vertical"
      align="items-center"
      gap="var(--md)"
      class="static p-r-md"
      style="width: 45%"
    >
      <hl-group
        v-for="(item, index) in chartData"
        :key="index"
        :gap="legend.gap"
        align="items-middle items-between"
        :class="['cursor-pointer static', isHighlights[index] ? 'is-checked' : '']"
        :style="`opacity:${isHides[index] ? 0.2 : 1}`"
        @click="hideSerie(index)"
      >
        <span class="echart-fill-rect static" :style="`background-color:${item.color}`"></span>
        <span class="text-secondary font-md w-full text-link-checked">{{ item.label }}</span>
        <h3 class="font-lg font-din static">{{ item.value }}</h3>
      </hl-group>
    </hl-group>
  </hl-group>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from 'vue'
import merge from 'lodash/merge'
import { useEChart } from 'hongluan-hooks'
import { HlGroup } from 'hongluan-ui'
import { useRenderChart, useResponsiveChart } from '@fx-front-framework/hooks'

import type { PieChartData } from '../../pie-chart/src/types'

export default defineComponent({
  name: 'VRosePieChart',
  components: { HlGroup },
  props: {
    chartData: {
      type: Array as PropType<PieChartData[]>,
      default: () => [],
    },
    legend: {
      type: Object as PropType<{ gap: string; }>,
      default: () => ({ gap: 'var(--sm)' }),
    },
    height: {
      type: String,
      default: 'calc(var(--xxl) * 5)',
    },
    title: {
      type: String,
      default: '',
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

    const renderChart = () => {
      const option = {
        confine: true,
        tooltip: merge({
          axisPointer: {
            type: 'none',
          },
          extraCssText: 'border-radius: 0;',
          formatter: (params: any) => {
            return params.seriesIndex === 0 && params.componentType === 'series' ? `
              <div class="font-md" style="background-color:#fff;border-raduis:0;">
                ${params.marker}
                <span>${params.data.label} <span style="font-weight: bold; margin-left: var(--md)">${params.data.value}</span></span>
              </div>
            ` : ''
          },
        }, props.tooltip),
        title: [
          {
            text: props.title,
            top: 'center',
            left: 'center',
            textStyle: {
              color: '#6F8EA8',
              fontSize: 14,
            },
          },
        ],
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '90%'],
            center: ['50%', '50%'],
            roseType: 'radius',
            minShowLabelAngle: 60,
            left: '0',
            itemStyle: {
              color: (params: any) => props.chartData[params.dataIndex].color,
            },
            emptyCircleStyle: {
              color: 'rgba(47,71,110,0.12)',
            },
            label: {
              show: false,
            },
            labelLine: {
              length: 1,
              length2: 20,
              smooth: true,
            },
            data: props.chartData.filter((_, idx) => !isHides.value[idx]),
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
