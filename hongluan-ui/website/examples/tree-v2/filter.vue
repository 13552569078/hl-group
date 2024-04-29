<template>
  <hl-input
    v-model="query"
    placeholder="Please enter keyword"
    block
    @input="onQueryChanged"
  />
  <hl-tree-v2
    ref="treeRef"
    :data="data"
    :props="props"
    :filter-method="filterMethod"
    :height="208"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const getKey = (prefix, id) => {
  return `${prefix}-${id}`
}

const createData = (
  maxDeep,
  maxChildren,
  minNodesNumber,
  deep = 1,
  key = 'node',
) => {
  let id = 0
  return new Array(minNodesNumber).fill(deep).map(() => {
    const childrenNumber =
      deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren)
    const nodeKey = getKey(key, ++id)
    return {
      id: nodeKey,
      label: nodeKey,
      children: childrenNumber
        ? createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey)
        : undefined,
    }
  })
}

const treeRef = ref(null)
const data = createData(4, 30, 5)
const query = ref('')
const props = ref({
  value: 'id',
  label: 'label',
  children: 'children',
})
const onQueryChanged = (query: string) => {
  const tree = treeRef.value
  tree?.filter(query)
}
const filterMethod = (query, node) => {
  return node.label.indexOf(query) !== -1
}
</script>
