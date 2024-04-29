<template>
  <hl-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
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
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      },
    ])

    const tableRowClassName = ({ rowIndex }) => {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    }
    return {
      tableData,
      tableRowClassName,
    }
  },
})
</script>

<style>
  .hl-table .warning-row {
    background: oldlace;
  }

  .hl-table .success-row {
    background: #f0f9eb;
  }
</style>