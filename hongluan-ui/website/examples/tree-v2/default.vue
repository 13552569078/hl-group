<template>
  <hl-tree-v2
    :data="data"
    :height="208"
    :props="props"
    show-checkbox
    :default-checked-keys="defaultCheckedKeys"
    :default-expanded-keys="defaultExpandedKeys"
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

const data = createData(4, 30, 40)
const checkedKeys = []
const expanedKeys = []
for (let i = 0; i < data.length; ++i) {
  const children = data[i].children
  if (children) {
    expanedKeys.push(data[i].id)
    checkedKeys.push(children[0].id)
    break
  }
}

const props = ref({
  value: 'id',
  label: 'label',
  children: 'children',
})
const defaultCheckedKeys = checkedKeys
const defaultExpandedKeys = expanedKeys

</script>
