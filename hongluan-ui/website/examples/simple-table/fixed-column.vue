<template>
  <div class="table-scroll scroll-column">
    <hl-simple-table :cols="cols" :data="tableData" border="border-x">
      <template #tableIndex="{ rowIndex }">
        <span>{{ rowIndex + 1 }}</span>
      </template>
      <template #handle>
        <hl-button type="link">修改</hl-button>
      </template>
    </hl-simple-table>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  {
    id: 1,
    name: '王二麻子',
    sex: '男',
    org: '中国系统',
    des: '来自中国南方的温暖城市！',
    no: '478343',
    level: 'P8',
    years: 10,
  },
  {
    id: 2,
    name: '李四',
    sex: '男',
    org: '中国系统',
    des: '来自中国',
    no: '238343',
    level: 'P6',
    years: 3,
  },
  {
    id: 3,
    name: '张三',
    sex: '男',
    org: '中国系统',
    des: '来自中国北方的寒冷的城市！',
    no: '178343',
    level: 'P7',
    years: 5,
  },
])
// 序号 slot名称唯一 tableIndex。 width: 设置宽度。align: 对齐方式。showTooltip: td是否一行显示,超出tooptip
const cols = ref([
  { title: '序号', prop: '', slotName: 'tableIndex', fixed: 'left', minWidth: '50px' },
  { title: '姓名', prop: 'name', showTooltip: true, minWidth: '150px' },
  { title: '性别', prop: 'sex', width: '50px' },
  { title: '工号', prop: 'no', showTooltip: true, minWidth: '120px', fixed: { position: 'left', distance: '50px' } },
  { title: '职级', prop: 'level', showTooltip: true },
  { title: '司龄', prop: 'years', showTooltip: true },
  { title: '描述', prop: 'des', showTooltip: true, minWidth: '400px' },
  { title: '单位', prop: 'org', showTooltip: true, minWidth: '150px', fixed: { position: 'right', distance: '70px' } },
  {
    title: '操作',
    prop: '',
    slotName: 'handle',
    align: 'center',
    fixed: 'right',
  },
])

</script>
