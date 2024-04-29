<template>
  <hl-button class="m-r-md" @click="resetDateFilter">清除日期过滤器</hl-button>
  <hl-button @click="clearFilter">清除所有过滤器</hl-button>
  <hl-table ref="filterTable" row-key="date" :data="tableData" style="width: 100%">
    <hl-table-column
      prop="date"
      label="日期"
      sortable
      width="180"
      column-key="date"
      :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
      :filter-method="filterHandler"
    />
    <hl-table-column prop="name" label="姓名" width="180" />
    <hl-table-column prop="address" label="地址" :formatter="formatter" />
    <hl-table-column
      prop="tag"
      label="标签"
      width="100"
      :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end"
    >
      <template #default="scope">
        <hl-tag :type="scope.row.tag === '家' ? 'primary' : 'success'" size="sm" disable-transitions>{{ scope.row.tag }}</hl-tag>
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
        address: '上海市普陀区金沙江路 1518 弄',
        tag: '家',
      },
      {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        tag: '公司',
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '家',
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        tag: '公司',
      },
    ])
    const filterTable = ref(null)

    const resetDateFilter = () => {
      filterTable.value.clearFilter('date')
    }
    const clearFilter = () => {
      filterTable.value.clearFilter()
    }
    const formatter = row => {
      return row.address
    }
    const filterTag = (value, row) => {
      return row.tag === value
    }
    const filterHandler = (value, row, column) => {
      const property = column['property']
      return row[property] === value
    }

    return {
      tableData,
      filterTable,
      resetDateFilter,
      clearFilter,
      formatter,
      filterTag,
      filterHandler,
    }
  },
})
</script>
