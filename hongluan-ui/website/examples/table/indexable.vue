<template>
  <hl-table :data="tableData" style="width: 100%">
    <hl-table-column type="index" :index="indexMethod" />
    <hl-table-column prop="date" label="日期" width="180" />
    <hl-table-column prop="name" label="姓名" width="180" />
    <hl-table-column prop="address" label="地址" />
  </hl-table>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const tableData = ref([
      {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
        tag: '家',
      },
      {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333,
        tag: '公司',
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333,
        tag: '家',
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333,
        tag: '公司',
      },
    ])

    const indexMethod = index => {
      return index * 2
    }

    return {
      tableData,
      indexMethod,
    }
  },
})
</script>
