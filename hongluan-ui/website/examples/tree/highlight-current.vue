<template>
  <hl-tree
    ref="tree"
    :data="data"
    show-checkbox
    default-expand-all
    node-key="id"
    highlight-current
    :props="defaultProps"
  />

  <hl-group gap-x="var(--md)" class="buttons">
    <hl-button @click="getCheckedNodes">通过 node 获取</hl-button>
    <hl-button @click="getCheckedKeys">通过 key 获取</hl-button>
    <hl-button @click="setCheckedNodes">通过 node 设置</hl-button>
    <hl-button @click="setCheckedKeys">通过 key 设置</hl-button>
    <hl-button @click="resetChecked">清空</hl-button>
  </hl-group>
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
      },
    ],
  },
])
const defaultProps = ref({
  children: 'children',
  label: 'label',
})
const tree = ref(null)

const getCheckedNodes = () => {
  console.log(tree.value.getCheckedNodes())
}
const getCheckedKeys = () => {
  console.log(tree.value.getCheckedKeys())
}
const setCheckedNodes = () => {
  tree.value.setCheckedNodes([
    {
      id: 5,
      label: '二级 2-1',
    },
    {
      id: 9,
      label: '三级 1-1-1',
    },
  ])
}
const setCheckedKeys = () => {
  tree.value.setCheckedKeys([3])
}
const resetChecked = () => {
  tree.value.setCheckedKeys([])
}

</script>
