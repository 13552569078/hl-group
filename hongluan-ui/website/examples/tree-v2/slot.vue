<template>
  <hl-tree-v2 :data="data" :props="props" :height="208">
    <template #default="{ node }">
      <span
        class="prefix text-primary"
        :class="{ 'is-leaf': node.isLeaf }"
      >TreeV2&nbsp;&nbsp;</span>
      <span>{{ node.label }}</span>
    </template>
  </hl-tree-v2>
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
const props = ref({
  value: 'id',
  label: 'label',
  children: 'children',
})

</script>

