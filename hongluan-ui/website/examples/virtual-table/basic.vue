<template>
  <hl-virtual-table
    :cols="cols"
    :data="tableData"
    :first-column-index="1"
    :load="load"
  >
    <template #indexExpand="{ row }">
      <p>{{ row.id }} / {{ row.des }}</p>
    </template>
    <template #handle>
      <a>修改</a>
    </template>
  </hl-virtual-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

let count = 3000
const tableData = ref([
  {
    id: 1,
    name: '姓名1',
    sex: '女',
    org: '中国系统',
    des: '来自安全应急UED的设计师来自安全应',
  },
  {
    id: 2,
    name: '姓名2',
    sex: '男',
    org: '中国系统',
    des: '经验丰富的前端工程师',
    children: [
      {
        id: 102,
        name: '姓名102',
        sex: '男',
        org: '中国系统',
        des: '经验丰富的前端工程师',
      },
      {
        id: 103,
        name: '姓名103',
        sex: '男',
        org: '中国系统',
        des: '经验丰富的前端工程师',
      },
    ],
  },
  {
    id: 3,
    name: '姓名3',
    sex: '男',
    org: '中国系统',
    des: '90后交互设计师',
  },
  ...new Array(50).fill(0).map((_, i) => {
    const d = JSON.parse(JSON.stringify({
      id: i + 4,
      name: '姓名' + (i + 4),
      sex: '女',
      org: '中国系统',
      des: '来自安全应急UED的设计师来自',
    }))
    if ((i + 4) % 5 === 0 ) {
      d.children = [
        {
          id: 1000 + d.id,
          name: '姓名',
          sex: '男',
          org: '中国系统',
          des: '经验丰富的前端工程师',
        },
      ]
    }
    if ((i + 4) % 4 === 0 ) {
      d.hasChildren = true
    }
    return d
  }),
])
const cols = ref([
  { title: '#', prop: 'id', expand: { slotName: 'indexExpand', hideLabel: true } },
  { title: '用户名', prop: 'name' },
  { title: '性别', prop: 'sex', align: 'center' },
  { title: '单位', prop: 'org' },
  {
    title: '简介',
    prop: 'des',
    showTooltip: true,
    width: '40%',
    tooltipProps: { width: '200px', popperClass: 'test-tip' },
  },
  { title: '操作', slotName: 'handle', align: 'center' },
])

const load = (row, node, resolve) => {
  window.setTimeout(() => {
    resolve([
      {
        id: count++,
        name: '姓名1',
        sex: '男',
        org: '中国系统',
        des: '来自中国南方的温暖城市！',
        hasChildren: true,
      },
      {
        id: count++,
        name: '姓名2',
        sex: '男',
        org: '中国系统',
        des: '来自中国南方的温暖城市！',
        children: [
          {
            id: count++,
            name: '王二21',
            sex: '男',
            org: '中国系统',
            des: '来自中国南方的温暖城市！',
          },
        ],
      },
    ])
  }, 3000)
}

</script>
