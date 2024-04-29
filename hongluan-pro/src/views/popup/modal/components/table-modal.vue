<template>
  <hl-panel padding="var(--xl)" class="card-panel">
    <template #header>
      <div class="panel-title"><h4>表格模态窗</h4></div>
      <div class="panel-header-right">
        <hl-button no-fill equal>
          <hl-icon><two-more /></hl-icon>
        </hl-button>
      </div>
    </template>
    <hl-group full="full-x" class="p-b-lg">在不离开当前页面的情况下，快速查看一些表格类数据，以便于的对接下来的操作有更好的引导。</hl-group>
    <hl-button class="m-r-md" @click="outerVisible = true">点击查看</hl-button>
  </hl-panel>

  <hl-dialog v-model="outerVisible" title="云服务列表" width="calc(var(--xxl) * 15)" padding="var(--xl)">
    <hl-simple-table :cols="cols" :data="tableData" :show-header="false" border="borderless" padding="0">
      <template #icon="{ row }">
        <hl-icon :name="row.icon" :type="row.type" effect="light" fill size="lg" radius>
          <component :is="'two' + row.icon" />
        </hl-icon>
      </template>
      <template #user="{ row }">
        <hb-data-collect gap="var(--md)" full="full-x" padding="0">
          <hl-group dir="vertical">
            <span class="title">{{ row.name }}</span>
            <span class="sub-title">{{ row.en }}</span>
          </hl-group>
        </hb-data-collect>
      </template>
      <template #tags="{ row }">
        <hb-data-collect gap="var(--md)" full="full-x" padding="0">
          <hl-group dir="vertical" align="items-right">
            <span class="title">{{ row.num }}</span>
            <span class="sub-title">{{ row.icon }}</span>
          </hl-group>
        </hb-data-collect>
      </template>
      <template #handle>
        <hl-button effect="light" equal>
          <template #icon>
            <hl-icon><two-arrow-right /></hl-icon>
          </template>
        </hl-button>
      </template>
    </hl-simple-table>
  </hl-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const outerVisible = ref(false)
    const cols = ref([
      { title: 'icon', slotName: 'icon', align: 'left', width: '3.5rem' },
      { title: '用户名', slotName: 'user', align: 'left' },
      { title: '简介', slotName: 'tags' },
      { title: '数量', slotName: 'number', align: 'right' },
      { title: '操作', slotName: 'handle', align: 'right', width: '10%' },
    ])
    const tableData = ref([
      { id: 1, icon: 'Server', type: 'primary', num: '2234.43', name: '云服务器ECS', en: 'Infrastructure as a Service' },
      { id: 2, icon: 'Box', type: 'success', num: '866.25', name: '裸金属服务器 BMS', en: 'Bare Metal Server' },
      { id: 3, icon: 'ChartDoughnut', type: 'warning', num: '1025.08', name: '云容器引擎 CKS', en: 'Cloud Kubernetes Service' },
      { id: 4, icon: 'Database', type: 'danger', num: '399.65', name: '云硬盘EBS', en: 'Elastic Block Storage' },
      { id: 4, icon: 'Shield', type: 'danger', num: '399.65', name: '负载均衡SLB', en: 'Server Load Balancer' },
    ])

    return {
      outerVisible,
      cols,
      tableData,
    }
  },
})
</script>
<style>
</style>
