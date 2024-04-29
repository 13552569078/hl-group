<template>
  <hl-tree
    :data="data"
    node-key="id"
    default-expand-all
    draggable
    :allow-drop="allowDrop"
    :allow-drag="allowDrag"
    @node-drag-start="handleDragStart"
    @node-drag-enter="handleDragEnter"
    @node-drag-leave="handleDragLeave"
    @node-drag-over="handleDragOver"
    @node-drag-end="handleDragEnd"
    @node-drop="handleDrop"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const data = ref([
  {
    id: 1,
    label: '一级 1',
    children: [
      {
        id: 4,
        label: '二级 1-1',
        children: [
          {
            id: 9,
            label: '三级 1-1-1',
          },
          {
            id: 10,
            label: '三级 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: '一级 2',
    children: [
      {
        id: 5,
        label: '二级 2-1',
      },
      {
        id: 6,
        label: '二级 2-2',
      },
    ],
  },
  {
    id: 3,
    label: '一级 3',
    children: [
      {
        id: 7,
        label: '二级 3-1',
      },
      {
        id: 8,
        label: '二级 3-2',
        children: [
          {
            id: 11,
            label: '三级 3-2-1',
          },
          {
            id: 12,
            label: '三级 3-2-2',
          },
          {
            id: 13,
            label: '三级 3-2-3',
          },
        ],
      },
    ],
  },
])
const defaultProps = ref({
  children: 'children',
  label: 'label',
})

const handleDragStart = (node, ev) => {
  console.log('drag start', node)
}
const handleDragEnter = (draggingNode, dropNode, ev) => {
  console.log('tree drag enter: ', dropNode.label)
}
const handleDragLeave = (draggingNode, dropNode, ev) => {
  console.log('tree drag leave: ', dropNode.label)
}
const handleDragOver = (draggingNode, dropNode, ev) => {
  console.log('tree drag over: ', dropNode.label)
}
const handleDragEnd = (draggingNode, dropNode, dropType, ev) => {
  console.log('tree drag end: ', dropNode && dropNode.label, dropType)
}
const handleDrop = (draggingNode, dropNode, dropType, ev) => {
  console.log('tree drop: ', dropNode.label, dropType)
}
const allowDrop = (draggingNode, dropNode, type) => {
  if (dropNode.data.label === '二级 3-1') {
    return type !== 'inner'
  } else {
    return true
  }
}
const allowDrag = draggingNode => {
  return draggingNode.data.label.indexOf('三级 3-2-2') === -1
}

</script>
