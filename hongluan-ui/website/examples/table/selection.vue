<template>
  <hl-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
    <hl-table-column type="selection" width="55" />
    <hl-table-column label="日期" width="120">
      <template #default="scope">{{ scope.row.date }}</template>
    </hl-table-column>
    <hl-table-column prop="name" label="姓名" width="120" />
    <hl-table-column prop="address" label="地址" show-overflow-tooltip />
  </hl-table>
  <div style="margin-top: 20px">
    <hl-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</hl-button>
    <hl-button @click="toggleSelection()">取消选择</hl-button>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const tableData = ref([
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      },
    ])
    const multipleSelection = ref([])
    const multipleTable = ref(null)

    const toggleSelection = rows => {
      if (rows) {
        rows.forEach(row => {
          multipleTable.value.toggleRowSelection(row)
        })
      } else {
        multipleTable.value.clearSelection()
      }
    }
    const handleSelectionChange = val => {
      multipleSelection.value = val
    }

    return {
      tableData,
      multipleSelection,
      multipleTable,
      toggleSelection,
      handleSelectionChange,
    }
  },
})
</script>
