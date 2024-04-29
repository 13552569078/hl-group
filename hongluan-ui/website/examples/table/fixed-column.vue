<template>
  <hl-table :data="tableData" border style="width: 100%">
    <hl-table-column fixed prop="date" label="日期" width="120" />
    <hl-table-column prop="name" label="姓名" />
    <hl-table-column prop="province" label="省份" />
    <hl-table-column prop="city" label="市区" />
    <hl-table-column prop="address" label="地址" width="600" />
    <hl-table-column prop="zip" label="邮编" />
    <hl-table-column fixed="right" label="操作" width="160">
      <template #default="scope">
        <hl-button size="sm" @click="handleClick(scope.row)">查看</hl-button>
        <hl-button size="sm">编辑</hl-button>
      </template>
    </hl-table-column>
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
      },
      {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333,
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333,
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333,
      },
    ])

    const handleClick = row => {
      console.log(row)
    }
    return {
      tableData,
      handleClick,
    }
  },
})
</script>
