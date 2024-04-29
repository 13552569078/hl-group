<template>
  <hl-scrollbar
    class="scrolling-list-chart-container"
    :style="{ height, '--bar-color': barStyle?.color }"
  >
    <div class="scrolling-list-chart">
      <div v-for="(barItem, idx) in chartData" :key="idx" class="list-item" :style="itemStyle">
        <div class="list-box m-b-xxs">
          <slot name="label" :row="barItem">
            <span class="label" :style="getLabelStyle(barItem)">
              {{
                labelFormatter(barItem.label)
              }}
            </span>
          </slot>
          <div
            :class="['list-bg', isStack ? 'stack' : '']"
            :style="{
              background: barItem?.barStyle?.background || barStyle?.background,
              height: barItem?.barStyle?.width || barStyle?.width,
            }"
          >
            <template v-if="isStack">
              <div
                v-for="(subBarItem, sidx) in barItem.value"
                :key="sidx"
                class="list"
                :style="{
                  background: subBarItem?.barStyle?.color || barStyle?.color,
                  width: `${(subBarItem.value / maxVal) * 100}%`,
                }"
              ></div>
            </template>
            <div
              v-else
              class="list"
              :style="{
                background: barItem?.barStyle?.color || barStyle?.color,
                width: `${(barItem.value / maxVal) * 100}%`,
              }"
            ></div>
            <span class="value" :style="getValueStyle(barItem)">
              {{
                valueFormatter(getBarItemTotal(barItem))
              }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </hl-scrollbar>
</template>
<script lang="ts">
import { CSSProperties, defineComponent, PropType, computed } from 'vue'
import { HlScrollbar } from 'hongluan-ui'
import { ScrollingListChartData } from './types'

export default defineComponent({
  name: 'VScrollingListChart',
  components: { HlScrollbar },
  props: {
    height: {
      type: String,
    },
    itemStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({
        margin: '4px 0 0',
        height: '44px',
        lineHeight: '44px',
      }),
    },
    barStyle: {
      type: Object as PropType<{
        width: string
        color: string
        backgroundColor: string
      }>,
      default: () => ({
        width: '1em',
        color: '#71F8FC',
        backgroundColor: 'none',
      }),
    },
    labelStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({
        fontSize: '1em',
        color: '#FFFFFF',
        width: '30%',
      }),
    },
    valueStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({
        fontSize: '1.2em',
        color: '#FFFFFF',
      }),
    },
    chartData: {
      type: Array as PropType<ScrollingListChartData[]>,
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
  },
  setup(props) {
    const isStack = computed(() => props.chartData.every(d => Array.isArray(d.value)))
    const maxVal = computed(() => {
      if (isStack.value) {
        return Math.max(
          ...props.chartData.map(d => (d.value as ScrollingListChartData[]).reduce(
            (prev, cur) => prev + (cur.value as number),
            0,
          )),
        )
      }
      return Math.max(...props.chartData.map(d => d.value as number))
    })

    const getLabelStyle = (charItem: ScrollingListChartData) => ({
      ...props.labelStyle,
      ...(charItem?.labelStyle ?? {}),
    })
    const getValueStyle = (charItem: ScrollingListChartData) => ({
      left: `${(charItem.value as number / maxVal.value) * 100}%`,
      ...props.valueStyle,
      ...(charItem?.valueStyle ?? {}),
    })
    const getBarItemTotal = (charItem: ScrollingListChartData) => (isStack.value
      ? (charItem.value as ScrollingListChartData[]).reduce(
        (prev, cur) => prev + (cur.value as number),
        0,
      )
      : charItem.value)

    return {
      maxVal,
      isStack,
      getLabelStyle,
      getValueStyle,
      getBarItemTotal,
    }
  },
})
</script>
