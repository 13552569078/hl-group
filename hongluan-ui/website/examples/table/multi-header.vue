<template>
  <hl-table :data="tableData" style="width: 100%">
    <hl-table-column prop="date" label="日期" width="150" />
    <hl-table-column label="配送信息">
      <hl-table-column prop="name" label="姓名" width="120" />
      <hl-table-column label="地址">
        <hl-table-column prop="province" label="省份" width="120" />
        <hl-table-column prop="city" label="市区" width="120" />
        <hl-table-column prop="address" label="地址" show-overflow-tooltip />
        <hl-table-column prop="zip" label="邮编" width="120" />
      </hl-table-column>
    </hl-table-column>
  </hl-table>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const tableData = ref([
      {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
      },
      {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
      },
    ])
    return {
      tableData,
    }
  },
})
</script>
