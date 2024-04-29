<template>
  <div class="custom-tree-container">
    <div class="block">
      <p>使用 render-content</p>
      <hl-tree
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :render-content="renderContent"
      />
    </div>


    <div class="block">
      <p>使用 slot</p>
      <hl-tree
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
      >
        <template #default="{ node, data }">
          <hl-group full class="w-full overflow-hidden" gap="var(--xs)" align="items-middle items-between">
            <hl-icon size="xs" class="static">
              <two-folder />
            </hl-icon>
            <div class="text-ellipsis w-full">{{ node.label }}</div>
            <hl-group class="static p-r-sm" align="items-middle" gap="var(--xs)">
              <hl-icon type="primary" @click="append(data)">
                <two-plus />
              </hl-icon>
              <hl-icon type="primary" @click="remove(node, data)">
                <two-remove />
              </hl-icon>
            </hl-group>
          </hl-group>
        </template>
      </hl-tree>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { TwoFolder } from '@hongluan-ui/icons'

let id = 1000
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

const append = d => {
  const newChild = { id: id++, label: 'testtest', children: [] }
  if (!d.children) {
    d.children = []
  }
  d.children.push(newChild)
}
const remove = (node, d) => {
  const parent = node.parent
  const children = parent.data.children || parent.data
  const index = children.findIndex(d => d.id === d.id)
  children.splice(index, 1)
}
const renderContent = (h, { node, data, store }) => {
  return h(
    'div',
    {
      class: 'hl-group w-full items-between overflow-hidden',
    },
    h('span', {
      class: 'text-ellipsis w-full',
    }, null, node.label),
    h(
      'span',
      {
        class: 'gap-xxs',
      },
      null,
      h(
        'a',
        {
          onClick: () => append(data),
        },
        '添加 ',
      ),
      h(
        'a',
        {
          onClick: () => remove(node, data),
        },
        '删除',
      ),
    ),
  )
}
</script>


