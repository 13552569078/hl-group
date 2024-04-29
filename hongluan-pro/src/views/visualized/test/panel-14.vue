<template>
  <hv-panel title="监测设备">
    <template #action>
      <hl-group merge indent>
        <hl-button size="sm">按监测类型</hl-button>
        <hl-button size="sm">按设备类型</hl-button>
      </hl-group>
    </template>
    <hl-group full dir="vertical" gap="var(--md)" class="m-t-md">
      <hl-input v-model="filterText" placeholder="输入关键字进行过滤" />
      <hl-scrollbar style="height: calc(var(--xxs) * 62)">
        <hl-tree
          ref="tree"
          :data="data"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
        />
      </hl-scrollbar>
    </hl-group>
  </hv-panel>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  components: {},

  setup() {
    const filterText = ref('')
    const tree = ref(null)
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

    const filterNode = (value, data) => {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }

    watch(filterText, val => {
      tree.value.filter(val)
    })


    return {
      data,
      tree,
      defaultProps,
      filterText,
      filterNode,
    }
  },
})
</script>
