<template>
  <hl-simple-table
    ref="tableRef"
    :cols="cols"
    :data="tableData"
    highlight-current-row
    @current-change="currentChange"
    @row-click="rowClick"
  />
  <br>
  <hl-button class="m-r-md" @click="setCurrent(tableData[0])">选中第一行</hl-button>
  <hl-button @click="setCurrent()">取消选择</hl-button>
</template>
<script setup lang="ts">
import { ref } from 'vue'


const tableRef = ref()
const tableData = ref([
  {
    id: 1,
    name: '范白露',
    sex: '女',
    org: '中国系统',
    des: '来自安全应急UED的设计师来自安全应急UED的设计',
  },
  {
    id: 2,
    name: 'xxx',
    sex: '男',
    org: '中国系统',
    des: '经验丰富的前端工程师',
  },
  {
    id: 3,
    name: '王朝阳',
    sex: '男',
    org: '中国系统',
    des: '90后交互设计师',
  },
])
const cols = ref([
  { title: '序号', prop: 'id', headerSlotName: 'index' },
  {
    title: '用户名',
    prop: 'name',
    sortable: true,
    filter: {
      slotName: 'filterSlot',
      placement: 'top',
      popperClass: 'test-filter-slot',
    },
  },
  { title: '性别', prop: 'sex' },
  { title: '单位', prop: 'org' },
  {
    title: '简介',
    prop: 'des',
    showTooltip: true,
    width: '40%',
    tooltipProps: { width: '200px', popperClass: 'test-tip' },
    filter: { slotName: 'filterSlot' },
  },
  { title: '操作', slotName: 'handle', align: 'center' },
])

const currentChange = (now, old) => {
  console.log(now, old)
}
const rowClick = () => {
  console.log('row-click')
}
const setCurrent = row => {
  tableRef.value.setCurrentRow(row)
}

</script>
