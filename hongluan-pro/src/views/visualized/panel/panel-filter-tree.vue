<template show-source>
  <hv-panel title="筛选树">
    <template #action>
      <hl-group full="full-x" gap="var(--sm)" align="items-middle">
        <hl-icon class="cursor-pointer" size="lg" type="primary" gradient transition>
          <fill-repeat />
        </hl-icon>
        <hl-button size="sm" type="primary" outline>新增监测事件</hl-button>
      </hl-group>
    </template>

    <hl-date-picker v-model="date" type="datetimerange" :shortcuts="shortcuts" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" block class="m-t-md" />

    <hl-input v-model="input" class="m-t-sm" placeholder="请输入查询内容" block>
      <template #suffix>
        <hl-icon>
          <two-search />
        </hl-icon>
      </template>
    </hl-input>
    <hl-group align="items-middle" full="full-x" gap="var(--sm)" class="bg-title m-t-md p-l-md p-r-md" style="height: var(--xxl)">
      <hl-checkbox v-model="checked" size="sm" class="static"><span class="text-secondary">全选</span></hl-checkbox>
      <div>已选 <span class="text-primary font-bold">12</span> 路，共 <span class="text-primary font-bold">166</span> 路</div>
    </hl-group>
    <hl-tree class="m-t-xxs" :data="data" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]" :props="defaultProps">
      <template #default="{ node, data }">
        <hl-group full gap="var(--xs)" align="items-between">
          <hl-group gap="var(--md)">
            <span>{{ node.label }}</span>
            <hl-tag size="sm">高清/GPRS</hl-tag>
          </hl-group>
          <hl-group gap="var(--md)" class="static p-r-md">
            <span class="text-secondary">共23路视频</span>
          </hl-group>
        </hl-group>
      </template>
    </hl-tree>
  </hv-panel>
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
