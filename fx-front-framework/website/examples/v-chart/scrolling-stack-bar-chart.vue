<template>
  <fx-v-scrolling-bar-chart :chart-data="chartData" height="200px" />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const chartData = [
      { value: [{ value: 23, label: '长江0', barStyle: { color: 'rgb(13, 48, 252)' } }, { value: 23, label: '长江1', barStyle: { color: 'rgb(113, 248, 252)' } }, { value: 26, label: '黄河1', barStyle: { color: 'rgb(13, 148, 252)' } }], label: '河流湖泊' },
      { value: [{ value: 13, label: '长江2', barStyle: { color: 'rgb(113, 248, 252)' } }, { value: 36, label: '黄河2', barStyle: { color: 'rgb(13, 148, 252)' } }], label: '建筑工贸' },
      { value: [{ value: 33, label: '长江3', barStyle: { color: 'rgb(113, 248, 252)' } }, { value: 46, label: '黄河3', barStyle: { color: 'rgb(13, 148, 252)' } }], label: '工贸企业' },
      { value: [{ value: 43, label: '长江4', barStyle: { color: 'rgb(113, 248, 252)' } }, { value: 56, label: '黄河4', barStyle: { color: 'rgb(13, 148, 252)' } }], label: '加油站' },
      { value: [{ value: 13, label: '长江5', barStyle: { color: 'rgb(113, 248, 252)' } }, { value: 76, label: '黄河5', barStyle: { color: 'rgb(13, 148, 252)' } }], label: '天气站' },
      { value: [{ value: 53, label: '长江6', barStyle: { color: 'rgb(113, 248, 252)' } }, { value: 16, label: '黄河6', barStyle: { color: 'rgb(13, 148, 252)' } }], label: '冶金化工' },
      { value: [{ value: 23, label: '长江7', barStyle: { color: 'rgb(113, 248, 252)' } }, { value: 54, label: '黄河7', barStyle: { color: 'rgb(13, 148, 252)' } }], label: '尾矿煤炭' },
      { value: [{ value: 43, label: '长江8', barStyle: { color: 'rgb(113, 248, 252)' } }, { value: 50, label: '黄河8', barStyle: { color: 'rgb(13, 148, 252)' } }], label: '桥梁，汽车，火车，飞机' },
    ]
    return {
      chartData,
    }
  },
})
</script>
