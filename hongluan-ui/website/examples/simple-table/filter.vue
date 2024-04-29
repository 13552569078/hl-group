<template>
  <hl-simple-table
    :cols="cols"
    :data="tableData"
  >
    <template #filterSlot="{ close }">
      <hl-checkbox-group v-model="selectedItems" dir="vertical" gap="var(--md)" block>
        <hl-checkbox label="1">条件1</hl-checkbox>
        <hl-checkbox label="2">条件2</hl-checkbox>
        <hl-checkbox label="3">条件3</hl-checkbox>
      </hl-checkbox-group>
      <hl-button type="primary" size="sm" class="m-t-md" @click="close">确定</hl-button>
    </template>
    <template #index>
      自定义列
      <HlSimpleTable.FilterIcon placement="right">
        <template #default="{ close }">
          <hl-checkbox-group v-model="selectedItems" dir="vertical" gap="var(--md)" block>
            <hl-checkbox label="1">条件1</hl-checkbox>
            <hl-checkbox label="2">条件2</hl-checkbox>
            <hl-checkbox label="3">条件3</hl-checkbox>
          </hl-checkbox-group>
          <hl-button type="primary" size="sm" class="m-t-md" @click="close">确定</hl-button>
        </template>
      </HlSimpleTable.FilterIcon>
    </template>
  </hl-simple-table>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { HlSimpleTable } from 'hongluan-ui'

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

const selectedItems = ref([])

</script>
