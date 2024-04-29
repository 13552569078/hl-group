<template>
  <hl-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%" @current-change="handleCurrentChange">
    <hl-table-column type="index" width="50" />
    <hl-table-column property="date" label="日期" width="120" />
    <hl-table-column property="name" label="姓名" width="120" />
    <hl-table-column property="address" label="地址" />
  </hl-table>
  <div style="margin-top: 20px">
    <hl-button @click="setCurrent(tableData[1])">选中第二行</hl-button>
    <hl-button @click="setCurrent()">取消选择</hl-button>
  </div>
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
    const currentRow = ref(null)
    const singleTable = ref(null)

    const setCurrent = row => {
      singleTable.value.setCurrentRow(row)
    }
    const handleCurrentChange = val => {
      currentRow.value = val
    }

    return {
      tableData,
      currentRow,
      singleTable,
      setCurrent,
      handleCurrentChange,
    }
  },
})
</script>
