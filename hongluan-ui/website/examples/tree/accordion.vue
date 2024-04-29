<template>
  <hl-tree :data="data" :props="defaultProps" accordion @node-click="handleNodeClick" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const data = ref([
  {
    label: '一级 1',
    children: [
      {
        label: '二级 1-1',
        children: [
          {
            label: '三级 1-1-1',
          },
        ],
      },
    ],
  },
  {
    label: '一级 2',
    children: [
      {
        label: '二级 2-1',
        children: [
          {
            label: '三级 2-1-1',
          },
        ],
      },
      {
        label: '二级 2-2',
        children: [
          {
            label: '三级 2-2-1',
          },
        ],
      },
    ],
  },
  {
    label: '一级 3',
    children: [
      {
        label: '二级 3-1',
        children: [
          {
            label: '三级 3-1-1',
          },
        ],
      },
      {
        label: '二级 3-2',
        children: [
          {
            label: '三级 3-2-1',
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

const handleNodeClick = data => {
  console.log(data)
}

</script>
