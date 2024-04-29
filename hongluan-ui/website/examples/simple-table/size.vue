<template>
  <hl-select v-model="value" clearable placeholder="请选择" class="m-b-md">
    <template v-for="item in options">
      <hl-option v-if="item.divider" :key="item.value" divider />
      <hl-option
        v-else
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </template>
  </hl-select>

  <hl-simple-table
    :cols="cols"
    :data="tableData"
    :size="value"
    class="borderless-last"
  >
    <template #tableIndex="{ rowIndex }">
      <span>{{ rowIndex + 1 }}</span>
    </template>
    <template #handle>
      <a>修改</a>
    </template>
  </hl-simple-table>
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
  },
  { id: 2, name: '李四', sex: '男', org: '中国系统', des: '来自中国' },
  {
    id: 3,
    name: '张三',
    sex: '男',
    org: '中国系统',
    des: '来自中国北方的寒冷的城市！',
  },
])
const cols = ref([
  { title: '#', slotName: 'tableIndex' },
  { title: '用户名', prop: 'name' },
  { title: '性别', prop: 'sex' },
  { title: '单位', prop: 'org' },
  { title: '简介', prop: 'des' },
  { title: '操作', slotName: 'handle', align: 'center' },
])
const options = ref([
  {
    value: 'sm',
    label: 'sm',
  },
  {
    value: 'md',
    label: 'md',
  },
  {
    value: 'lg',
    label: 'lg',
  },
])
const value = ref('md')

</script>
