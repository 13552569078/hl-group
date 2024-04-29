<template show-source>
  <hv-modal title="监控视频目录" width="calc(var(--xxl) * 8)">
    <hl-input v-model="input" class="m-t-lg" placeholder="请输入查询内容" block>
      <template #suffix>
        <hl-icon>
          <two-search />
        </hl-icon>
      </template>
    </hl-input>
    <hl-tree class="m-t-md" :data="data" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]" :props="defaultProps">
      <template #default="{ node, data }">
        <hl-group full gap="var(--xs)" align="items-between">
          <hl-group gap="var(--md)">
            <span>{{ node.label }}</span>
          </hl-group>
          <hl-group gap="var(--md)" class="static p-r-md">
            <span class="font-din text-secondary">23</span>
          </hl-group>
        </hl-group>
      </template>
    </hl-tree>
    <template #footer>
      <hl-button type="primary" @click="dialogVisible = false">一键播放</hl-button>
    </template>
  </hv-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {},
  setup() {
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
    return {
      data,
      defaultProps,
    }
  },
})
</script>
