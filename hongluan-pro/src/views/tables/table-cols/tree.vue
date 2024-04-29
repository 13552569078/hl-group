<template>
  <hl-panel class="table-panel static w-xl" body-padding="var(--xl)" borderless>
    <template #header>
      <div class="panel-title"><h4>组织机构</h4></div>
      <div class="panel-header-right">
        <hl-button no-fill equal>
          <hl-icon><two-more /></hl-icon>
        </hl-button>
      </div>
    </template>
    <hl-tree :data="orgData" :props="defaultProps" gap="0" default-expand-all draggable @node-click="handleNodeClick">
      <template #default="{ node }">
        <span class="tree-node-label">
          {{ node.label }}
        </span>
      </template>
    </hl-tree>
  </hl-panel>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const orgData = ref([
      {
        label: '山东省人民政府',
        children: [
          {
            label: '直属机构',
            children: [
              {
                label: '省教育厅',
              },
              {
                label: '省应急管理厅',
                children: [
                  {
                    label: '威海市应急管理局',
                  },
                  {
                    label: '省工业和信息化厅',
                  },
                ],
              },
            ],
          },
          {
            label: '内设机构',
            children: [
              {
                label: '防汛抗旱处',
              },
              {
                label: '安全生产监察支队',
              },
            ],
          },
          {
            label: '济南市',
            children: [
              {
                label: '防汛抗旱处',
              },
              {
                label: '安全生产监察支队',
              },
            ],
          },
          {
            label: '菏泽市',
            children: [
              {
                label: '防汛抗旱处',
              },
              {
                label: '安全生产监察支队',
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
    const handleNodeClick = (data: any) => {
      console.log(data)
    }
    return {
      orgData,
      defaultProps,
      handleNodeClick,
    }
  },
})
</script>
