<template>
  <fx-v-stacked-bar-chart :grid="grid" :legend="legend" :chart-data="data" :legendReal="legendReal" :dataZoom="dataZoom"/>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const grid = {
      top: '20',
      left: '0',
      right: '0',
      bottom: '72',
      containLabel: true,
    };
    const legend = [
      {
        label: '工业安全',
        key: 'industrialSafety',
        barWidth: 22,
        itemStyle: { color: '#FD6161' },
      },
      {
        label: '密集场所',
        key: 'densePlace',
        barWidth: 22,
        itemStyle: {
          color: '#FB7E00',
        },
      },
      {
        label: '自然灾害',
        key: 'naturalDisaster',
        barWidth: 22,
        itemStyle: {
          color: '#D6B800',
        },
      },
      {
        label: '公共设施',
        key: 'utilities',
        barWidth: 22,
        itemStyle: {
          color: '#3E7DFF',
        },
      },

      {
        label: '工业安全1',
        key: 'industrialSafety1',
        barWidth: 22,
        itemStyle: { color: '#FD6161' },
      },
      {
        label: '密集场所1',
        key: 'densePlace1',
        barWidth: 22,
        itemStyle: {
          color: '#FB7E00',
        },
      },
      {
        label: '自然灾害1',
        key: 'naturalDisaster1',
        barWidth: 22,
        itemStyle: {
          color: '#D6B800',
        },
      },
      {
        label: '公共设施1',
        key: 'utilities1',
        barWidth: 22,
        itemStyle: {
          color: '#3E7DFF',
        },
      },
    ]
    const data = [
      {
        xValue: '秦汉新城',
        industrialSafety: 20,
        densePlace: 40,
        naturalDisaster: 30,
        utilities: 11,
        industrialSafety1: 20,
        densePlace1: 40,
        naturalDisaster1: 30,
        utilities1: 11,
      },
      {
        xValue: '泾河新城',
        industrialSafety: 30,
        densePlace: 60,
        naturalDisaster: 10,
        utilities: 31,
        industrialSafety1: 30,
        densePlace1: 60,
        naturalDisaster1: 10,
        utilities1: 31,
      },
      {
        xValue: '沣西新城',
        industrialSafety: 60,
        densePlace: 40,
        naturalDisaster: 80,
        utilities: 41,
        industrialSafety1: 60,
        densePlace1: 40,
        naturalDisaster1: 80,
        utilities1: 41,
      },
      {
        xValue: '沣东新城',
        industrialSafety: 90,
        densePlace: 40,
        naturalDisaster: 10,
        utilities: 11,
        industrialSafety1: 90,
        densePlace1: 40,
        naturalDisaster1: 10,
        utilities1: 11,
      },
      {
        xValue: '空巷新城',
        industrialSafety: 40,
        densePlace: 70,
        naturalDisaster: 40,
        utilities: 21,
        industrialSafety1: 40,
        densePlace1: 70,
        naturalDisaster1: 40,
        utilities1: 21,
      },
      {
        xValue: '哈哈新城',
        industrialSafety: 90,
        densePlace: 120,
        naturalDisaster: 10,
        utilities: 31,
        industrialSafety1: 90,
        densePlace1: 120,
        naturalDisaster1: 10,
        utilities1: 31,
      },
      {
        xValue: '嘿嘿新城',
        industrialSafety: 140,
        densePlace: 30,
        naturalDisaster: 40,
        utilities: 51,
        industrialSafety1: 140,
        densePlace1: 30,
        naturalDisaster1: 40,
        utilities1: 51,
      },
    ]
    const legendReal = {
      type: 'scroll',
      pageIconColor: '#fff',
      pageTextStyle: {
        color: '#fff'
      },
      bottom: 36
    }
    const dataZoom = [
      {
        show: true,
        realtime: true,
        start: 30,
        end: 70,
        bottom: 5,
        xAxisIndex: [0, 3],
        height: 20
      },
      {
        type: 'inside',
        realtime: true,
        start: 30,
        end: 70,
        xAxisIndex: [0, 3]
      }
    ];
    return {
      legend,
      data,
      legendReal,
      dataZoom,
      grid
    }
  },
})
</script>
