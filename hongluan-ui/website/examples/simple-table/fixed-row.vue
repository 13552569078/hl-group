<template>
  <div class="table-scroll" style="height: 200px">
    <hl-simple-table
      :cols="cols"
      :data="tableData"
      border="border-x"
      fixed-header
      :cell-style="cellStyle"
    >
      <template #tableIndex="{ rowIndex }">
        <span>{{ rowIndex }}</span>
      </template>
      <template #handle>
        <hl-button type="link">修改</hl-button>
      </template>
    </hl-simple-table>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

let idx = 0
const row = {
  name: '王二麻子',
  sex: '男',
  org: '中国系统',
  des: '来自中国南方的温暖城市！',
}
const tableData = ref(new Array(22).fill(0).map(_ => Object.assign(JSON.parse(JSON.stringify(row)), { id: idx++ })))
const cols = ref([
  { title: '序号', prop: '', slotName: 'tableIndex' },
  { title: '姓名', prop: 'name', showTooltip: true, width: '100px' },
  { title: '性别', prop: 'sex', width: '50px' },
  { title: '单位', prop: 'org', showTooltip: true, width: '150px' },
  { title: '描述', prop: 'des', showTooltip: true, width: '400px' },
  { title: '操作', prop: '', slotName: 'handle', align: 'center' },
])

// 固定5倍数的行
const cellStyle = ({ rowIndex }) => {
  return rowIndex % 5 === 0 ? {
    backgroundColor: 'var(--bg-light)',
    zIndex: 10,
    position: 'sticky',
    top: `48px`, // 48为表格头的高度
  } : {}
}
</script>
