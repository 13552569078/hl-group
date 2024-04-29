<template>
  <hl-scrollbar
    class="scrolling-bar-chart-container"
    :style="{ height, '--bar-color': barStyle?.color }"
  >
    <div class="scrolling-bar-chart">
      <div
        v-for="(barItem, idx) in chartData"
        :key="idx"
        class="bar-item"
        :style="{ margin }"
      >
        <div class="label-value m-b-xxs">
          <span class="label" :style="getLabelStyle(barItem)">{{ labelFormatter(barItem.label) }}</span>
          <span class="value font-din" :style="getValueStyle(barItem)">{{ valueFormatter(getBarItemTotal(barItem)) }}</span>
        </div>
        <div
          :class="['bar-bg', isStack ? 'stack' : '']"
          :style="{
            background: barItem?.barStyle?.background || barStyle?.background,
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

export default defineComponent({
  name: 'ScrollingBarChart',
  props: {
    height: {
      type: String,
      required: true,
    },
    margin: {
      type: String,
      default: '20px 0 0',
    },
    barStyle: {
      type: Object as PropType<{ width: string; color: string; backgroundColor: string; }>,
      default: () => ({
        width: '1em',
        color: '#71F8FC',
        background: 'rgba(47,71,110,0.12)',
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
  },
  setup(props) {
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

    const getLabelStyle = (charItem: ScrollingBarChartData) => ({ ...props.labelStyle, ...(charItem?.labelStyle ?? {}) })
    const getValueStyle = (charItem: ScrollingBarChartData) => ({ ...props.valueStyle, ...(charItem?.valueStyle ?? {}) })
    const getBarItemTotal = (charItem: ScrollingBarChartData) => isStack.value ? (charItem.value as ScrollingBarChartData[]).reduce((prev, cur) => prev + (cur.value as number), 0) : charItem.value

    return {
      maxVal,
      isStack,
      getLabelStyle,
      getValueStyle,
      getBarItemTotal,
    }
  },
})
export interface ScrollingBarChartData {
  value: number | ScrollingBarChartData[]
  label: string
  barStyle?: Record<string, unknown>
  valueStyle?: CSSProperties
  labelStyle?: CSSProperties
}
</script>
<style lang="scss" scoped>
.scrolling-bar-chart-container {
  ::v-deep(.scrollbar-bar.is-vertical) {
    width: 2px;
  }
  .scrolling-bar-chart {
    .bar-item {
      .label-value {
        display: flex;
        justify-content: space-between;
      }
      .bar-bg {
        width: 100%;
        position: relative;
        .bar {
          position: absolute;
          top: 0;
          height: 100%;
          width: 0;
        }
        &.stack {
          .bar {
            position: static;
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
