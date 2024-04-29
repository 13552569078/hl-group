<template>
  <hl-scrollbar style="height: 200px" @at-end="loadMore">
    <hl-simple-table :cols="cols" :data="tableData" border="border-x" fixed-header>
      <template #tableIndex="{ rowIndex }">
        <span>{{ rowIndex + 1 }}</span>
      </template>
      <template #handle>
        <hl-button type="link">修改</hl-button>
      </template>
      <template v-if="hadMoreData" #more>
        <template v-if="loading">
          <hl-group align="items-middle" gap="var(--xs)">
            <hl-spinner size="sm" />
            <span>正在加载...</span>
          </hl-group>
        </template>
      </template>
    </hl-simple-table>
  </hl-scrollbar>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'

let count = 1
function id() {
  return count++
}
const data = [
  {
    id: id(),
    name: '王二麻子',
    sex: '男',
    org: '中国系统',
    des: '来自中国南方的温暖城市！',
  },
  { id: id(), name: '李四', sex: '男', org: '中国系统', des: '来自中国' },
  {
    id: id(),
    name: '张三',
    sex: '男',
    org: '中国系统',
    des: '来自中国北方的寒冷的城市！',
  },
]

const loading = ref(false)
const tableData = ref(JSON.parse(JSON.stringify(data)))
const cols = ref([
  { title: '#', slotName: 'tableIndex', width: '8%' },
  { title: '用户名', prop: 'name', width: '15%' },
  { title: '性别', prop: 'sex', width: '8%' },
  { title: '单位', prop: 'org', width: '20%' },
  { title: '简介', prop: 'des' },
  { title: '操作', slotName: 'handle', align: 'center', width: '10%' },
])

const hadMoreData = computed(() => tableData.value.length < 12)
const loadMore = () => {
  if (loading.value || !hadMoreData.value) return
  loading.value = true
  window.setTimeout(() => {
    const moreData = JSON.parse(JSON.stringify(data))
    moreData.forEach(d => {
      d.id = id()
      d.name = d.name + d.id
    })
    tableData.value.push(...moreData)
    loading.value = false
  }, 300)
}

</script>
