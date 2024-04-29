<template>
  <hl-table
    v-loading="loading"
    :data="tableData"
    style="width: 100%"
  >
    <hl-table-column
      prop="date"
      label="日期"
      width="180"
    />
    <hl-table-column
      prop="name"
      label="姓名"
      width="180"
    />
    <hl-table-column
      prop="address"
      label="地址"
    />
  </hl-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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

</script>

