<template>
  <hl-tree-v2
    :data="data"
    :props="props"
    show-checkbox
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
      disabled: Math.random() > 0.6,
      children: childrenNumber
        ? createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey)
        : undefined,
    }
  })
}

const data = createData(4, 30, 40)
const props = ref({
  value: 'id',
  label: 'label',
  children: 'children',
  disabled: 'disabled',
})

</script>
