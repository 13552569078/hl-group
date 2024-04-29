<template>
  <hl-virtual-table
    :cols="cols"
    :data="tableData"
    :total="200"
    @item-rendered="loadData"
  >
    <template #handle>
      <a>修改</a>
    </template>
    <template #loading="{ rowIndex }">
      <p class="text-center">加载数据中: 第{{ rowIndex + 1 }}条</p>
    </template>
    <template #foot>
      <td colspan="2"><strong>统计：</strong></td>
      <td colspan="4">性别（男 / 女）比例：{{ maleCount }} / {{ femaleCount }}</td>
    </template>
  </hl-virtual-table>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'

let indexCounter = 1021
const existedIndex = new Set(new Array(20).fill(0).map((_, i) => i)) // 记录已经加载数据的数组索引值
const tableData = ref([
  {
    id: 1,
    name: '姓名1',
    sex: '女',
    org: '中国系统',
    des: '来自安全应急UED的设计师来自安全应来自安全应急UED的设计师来自安全应来自安全应急UED的设计师来自安全应',
  },
  {
    id: 2,
    name: '姓名2',
    sex: '男',
    org: '中国系统',
    des: '经验丰富的前端工程师',
  },
  {
    id: 3,
    name: '姓名3',
    sex: '男',
    org: '中国系统',
    des: '90后交互设计师',
  },
  ...new Array(17).fill(0).map((_, i) => {
    const d = JSON.parse(JSON.stringify({
      id: i + 4,
      name: '姓名' + (i + 4),
      sex: '女',
      org: '中国系统',
      des: '来自安全应急UED的设计师来自',
    }))
    return d
  }),
])
const cols = ref([
  { title: '#', prop: 'id' },
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

const maleCount = computed(() => tableData.value.filter(d => d && d.sex === '男').length)
const femaleCount = computed(() => tableData.value.filter(d => d && d.sex === '女').length)

const loadData = (_, __, visibleStart, visibleEnd) => {
  window.setTimeout((start, end) => {
    for(let i = start; i <= end; i++) {
      if (existedIndex.has(i)) continue // 已经存在了，不需要再加载
      tableData.value[i] = {
        id: indexCounter++,
        name: '姓名',
        sex: i % 2 === 0 ? '男' : '女',
        org: '中国系统',
        des: i % 5 === 0 ? '来自安全应急UED的设计师来自安全应来自安全应急UED的设计师来自安全应来自安全应急UED的设计师来自安全应' : '来自中国南方的温暖城市！',
      }
      existedIndex.add(i) // 添加已加载数据索引值
    }
  }, 3000, visibleStart, visibleEnd)
}

</script>
