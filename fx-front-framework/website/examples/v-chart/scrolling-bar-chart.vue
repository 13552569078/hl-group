<template>
  <fx-v-scrolling-bar-chart
    :chart-data="chartData"
    height="200px"
    :bar-style="{ color: 'linear-gradient(90deg, rgba(114,245,172,0.16) 0%, #72F5AC 100%)', width: '1em', backgroundColor: 'rgba(47,71,110,0.12)' }"
    :label-click="handleClickLabel"
  />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const chartData = [
      { value: 55, label: '河流湖泊', id: '1' },
      { value: 69, label: '建筑工贸', id: '2' },
      { value: 50, label: '工贸企业', id: '3' },
      { value: 20, label: '加油站', id: '4' },
      { value: 26, label: '天气站', id: '5' },
      { value: 87, label: '冶金化工', id: '6' },
      { value: 69, label: '尾矿煤炭', id: '7' },
      { value: 50, label: '桥梁，汽车，火车，飞机', id: '8' },
      { value: 20, label: '华熙LIVE', id: '9' },
      { value: 26, label: '直播带货', id: '10' },
      { value: 87, label: '冶金化工', id: '11' },
    ]
    const handleClickLabel = (barItem) => {
      console.log(barItem);
    }
    return {
      chartData,
      handleClickLabel
    }
  },
})
</script>
