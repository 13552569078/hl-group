<template>
  <fx-v-column-chart :chart-data="chartData" class="m-b-lg" />
  <fx-v-column-chart
    :chart-data="chartData2"
    :is-vertical="false"
    :show-count="5"
    :scroll-count="4"
    :bar-color="['#72F5AC', 'rgba(114,245,172,0.16)']"
  />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const chartData = [
      { label: '2002', value: 20 },
      { label: '2004', value: 60 },
      { label: '2006', value: 40 },
      { label: '2008', value: 90 },
      { label: '2010', value: 60 },
      { label: '2012', value: 70 },
      { label: '2014', value: 10 },
      { label: '2016', value: 50 },
      { label: '2018', value: 10 },
      { label: '2020', value: 50 },
    ]
    const chartData2 = [
      { label: '应急救援', value: 20 },
      { label: '消防队伍', value: 60 },
      { label: '防汛抢险', value: 40 },
      { label: '医疗救护', value: 90 },
      { label: '社会救援', value: 60 },
      { label: '应急救援1', value: 70 },
      { label: '消防队伍1', value: 10 },
      { label: '防汛抢险1', value: 50 },
      { label: '医疗救护1', value: 10 },
      { label: '社会救援1', value: 50 },
    ]
    return {
      chartData,
      chartData2,
    }
  },
})
</script>
