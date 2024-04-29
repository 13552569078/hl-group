<template>
  <hl-scrollbar class="scrolling-bar-chart-container" :style="{ height, '--bar-color': barStyle?.color }">
    <div class="scrolling-bar-chart">
      <div
        v-for="(barItem, idx) in chartData"
        :key="idx"
        class="bar-item"
        :style="`${margin ? 'margin: ' + margin : ''}`"
      >
        <div class="label-value m-b-xxs">
          <span class="label" :class="isEmptyFunction ? '' : 'cursor-pointer'" :style="getLabelStyle(barItem)" @click="labelClick(barItem)">{{
            labelFormatter (barItem.label)
          }}</span>
          <span class="value" :style="getValueStyle(barItem)">{{ valueFormatter (getBarItemTotal(barItem)) }}</span>
        </div>
        <div
          :class="['bar-bg', isStack ? 'stack' : '']"
          :style="{
            backgroundColor: barItem?.barStyle?.backgroundColor || barStyle?.backgroundColor,
            height: barItem?.barStyle?.width || barStyle?.width
          }"
        >
          <template v-if="isStack">
            <div
              v-for="(subBarItem, sidx) in barItem.value"
              :key="sidx"
              class="bar"
              :style="{
                background: subBarItem?.barStyle?.color || barStyle?.color,
                width: `${subBarItem.value / maxVal * 100}%`
              }"
            ></div>
          </template>
          <div
            v-else
            class="bar"
            :style="{
              background: barItem?.barStyle?.color || barStyle?.color,
              width: `${barItem.value / maxVal * 100}%`
            }"
          ></div>
        </div>
      </div>
    </div>
  </hl-scrollbar>
</template>
<script lang="ts">
import { CSSProperties, defineComponent, PropType, computed } from 'vue'
import { HlScrollbar } from 'hongluan-ui'
import type { ScrollingBarChartData } from './types'

export default defineComponent({
  name: 'VScrollingBarChart',
  components: { HlScrollbar },
  props: {
    height: {
      type: String,
      required: true,
    },
    margin: {
      type: String,
      default: '',
    },
    barStyle: {
      type: Object as PropType<{ width: string; color: string; backgroundColor: string; }>,
      default: () => ({
        width: '1em',
        color: '#71F8FC',
        backgroundColor: 'rgba(47,71,110,0.12)',
      }),
    },
    labelStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({
        fontSize: '1em',
        color: '#B5CEE3',
      }),
    },
    valueStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({
        fontSize: '1.2em',
        color: '#B5CEE3',
      }),
    },
    chartData: {
      type: Array as PropType<ScrollingBarChartData[]>,
      default: () => [],
    },
    labelFormatter: {
      type: Function as PropType<(label: string) => string>,
      default: (label: string) => label,
    },
    valueFormatter: {
      type: Function as PropType<(value: number) => string>,
      default: (value: number) => value,
    },
    labelClick: {
      type: Function as PropType<(barItem: ScrollingBarChartData) => void>,
      default: () => ({}),
    },
  },
  setup (props) {
    const isStack = computed(() => props.chartData.every(d => Array.isArray(d.value)))
    const maxVal = computed(() => {
      if (isStack.value) {
        return Math.max(
          ...props.chartData.map(d =>
            (d.value as ScrollingBarChartData[]).reduce((prev, cur) => prev + (cur.value as number), 0),
          ),
        )
      } else {
        return Math.max(...props.chartData.map(d => (d.value as number)))
      }
    })
    const isEmptyFunction = computed(() => {
      return props.labelClick && props.labelClick.toString().includes('({})')
    })
    const getLabelStyle = (charItem: ScrollingBarChartData) => ({ ...props.labelStyle, ...(charItem?.labelStyle ?? {}) })
    const getValueStyle = (charItem: ScrollingBarChartData) => ({ ...props.valueStyle, ...(charItem?.valueStyle ?? {}) })
    const getBarItemTotal = (charItem: ScrollingBarChartData) => isStack.value ? (charItem.value as ScrollingBarChartData[]).reduce((prev, cur) => prev + (cur.value as number), 0) : charItem.value

    return {
      maxVal,
      isStack,
      getLabelStyle,
      getValueStyle,
      getBarItemTotal,
      isEmptyFunction,
    }
  },
})
</script>
