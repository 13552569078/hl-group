<template>
  <hl-simple-table
    :cols="cols"
    :data="tableData"
    @row-click="rowClicked"
    @cell-click="cellClicked"
  >
    <template #firstCol>
      <hl-checkbox v-model="selectedAll" :indeterminate="isIndeterminate" @change="selectAll" />
    </template>
    <template #tableIndex="{ row }">
      <hl-checkbox v-model="selectedRows" :label="row.id" @change="selectRow(row.id)">{{ '' }}</hl-checkbox>
    </template>

    <template #handle>
      <a>修改</a>
    </template>
  </hl-simple-table>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const selectedAll = ref(false)
const selectedRows = ref([])
const isIndeterminate = ref(false)

const tableData = ref([
  {
    id: 1,
    name: '范柏庐',
    sex: '女',
    org: '中国系统',
    des: '来自UED的设计师来自UED的设计来自UED的设计师来自UED的设计',
  },
  {
    id: 2,
    name: '姜军结',
    sex: '男',
    org: '中国系统',
    des: '经验丰富的前端工程师',
  },
  {
    id: 3,
    name: '王钞洋',
    sex: '男',
    org: '中国系统',
    des: '90后交互设计师',
  },
])
const cols = ref([
  { title: '#', slotName: 'tableIndex', headerSlotName: 'firstCol', width: '3em' },
  { title: '用户名', prop: 'name' },
  { title: '性别', prop: 'sex' },
  { title: '单位', prop: 'org', align: 'center' },
  {
    title: '简介',
    prop: 'des',
    showTooltip: true,
    width: '40%',
    tooltipProps: { width: '200px', popperClass: 'test-tip' },
  },
  { title: '操作', slotName: 'handle', align: 'center' },
])

const selectAll = () => {
  if (selectedAll.value) {
    selectedRows.value.splice(0, selectedRows.value.length)
    selectedRows.value.push(...tableData.value.map(d => d.id))
    isIndeterminate.value = false
  } else {
    selectedRows.value.splice(0, selectedRows.value.length)
  }
}
const selectRow = () => {
  selectedAll.value = selectedRows.value.length === tableData.value.length
  if (selectedRows.value.length > 0 && selectedAll.value == false) {
    isIndeterminate.value = true
  } else {
    isIndeterminate.value = false
  }
}
const rowClicked = (row, rowIndex, event) => {
  console.log('rowClicked', row, rowIndex, event)
}
const cellClicked = (row, col, rowIndex, colIndex, event) => {
  console.log('cellClicked', row, col, rowIndex, colIndex, event)
}

</script>
