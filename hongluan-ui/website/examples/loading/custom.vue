<template>
  <hl-table
    v-loading="loading"
    loading-text="拼命加载中"
    loading-spinner="spinner"
    loading-background="rgba(0, 0, 0, 0.8)"
    :data="tableData"
    style="width: 100%;margin-bottom: 10px"
  >
    <hl-table-column prop="date" label="日期" width="180" />
    <hl-table-column prop="name" label="姓名" width="180" />
    <hl-table-column prop="address" label="地址" />
  </hl-table>
  <hl-table
    v-loading="loading"
    :loading-svg="svg"
    class="custom-loading-svg"
    loading-svg-view-box="-10, -10, 50, 50"
    :data="tableData"
    style="width: 100%"
  >
    <hl-table-column prop="date" label="日期" width="180" />
    <hl-table-column prop="name" label="姓名" width="180" />
    <hl-table-column prop="address" label="地址" />
  </hl-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const spinner = ref({ color: 'red' })
const tableData = ref([{
  date: '2016-05-03',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄',
}, {
  date: '2016-05-02',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄',
}, {
  date: '2016-05-04',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄',
}])
const loading = ref(true)
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
</script>

