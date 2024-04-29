<template>
  <hl-row layout="grid" count="xl:count-2 lg:count-1" gap="var(--lg)" dir="vertical">
    <hl-col span="col">
      <hl-panel class="card-panel">
        <template #header>
          <div class="panel-title"><h4>卡片标题</h4></div>
          <div class="panel-header-right">
            <hl-button no-fill equal>
              <template #icon>
                <hl-icon><two-more /></hl-icon>
              </template>
            </hl-button>
          </div>
        </template>

        <hl-simple-table :cols="cols" :data="tableData" border="borderless" padding="0">
          <template #user="{ row }">
            <hb-data-collect gap="var(--md)" full="full-x" padding="0">
              <hl-thumb round type="primary" effect="light" size="lg" class="static">
                <strong>WS</strong>
              </hl-thumb>
              <hl-group dir="vertical">
                <span class="title">{{ row.name }}</span>
              </hl-group>
            </hb-data-collect>
          </template>
          <template #handle>
            <hl-button type="link">修改</hl-button>
          </template>
        </hl-simple-table>
      </hl-panel>
    </hl-col>

    <hl-col span="col">
      <hl-panel class="card-panel">
        <template #header>
          <div class="panel-title"><h4>卡片标题</h4></div>
          <div class="panel-header-right">
            <hl-button no-fill equal>
              <template #icon>
                <hl-icon><two-more /></hl-icon>
              </template>
            </hl-button>
          </div>
        </template>

        <hl-simple-table :cols="cols2" :data="tableData" border="borderless" padding="0">
          <template #user="{ row }">
            <hb-data-collect gap="var(--md)" full="full-x" padding="0">
              <hl-icon fill size="lg" radius>
                <component :is="'two' + row.icon" />
              </hl-icon>
              <hl-group dir="vertical">
                <span class="title">{{ row.name }}</span>
                <span class="sub-title">{{ row.en }}</span>
              </hl-group>
            </hb-data-collect>
          </template>
          <template #progress>
            <hl-progress :percentage="Math.floor(Math.random() * (5 - 100) + 100)" stroke-width="var(--xxs)" :show-text="false" line />
          </template>
          <template #handle>
            <hl-group gap="var(--xs)">
              <hl-button type="" effect="light" equal>
                <hl-icon>
                  <two-edit />
                </hl-icon>
              </hl-button>
              <hl-button type="" effect="light" equal>
                <hl-icon>
                  <two-delete />
                </hl-icon>
              </hl-button>
            </hl-group>
          </template>
        </hl-simple-table>
      </hl-panel>
    </hl-col>

    <hl-col span="col">
      <hl-panel class="card-panel">
        <template #header>
          <div class="panel-title"><h4>卡片标题</h4></div>
          <div class="panel-header-right">
            <hl-button no-fill equal>
              <template #icon>
                <hl-icon><two-more /></hl-icon>
              </template>
            </hl-button>
          </div>
        </template>

        <hl-simple-table :cols="cols3" :data="tableData" :show-header="false" border="borderless" padding="0">
          <template #icon="{ row }">
            <hl-icon :name="row.icon" :type="row.type" effect="light" fill size="lg" radius>
              <component :is="'fill' + row.icon" />
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
            <hl-tag :type="row.type" effect="light">标签名称</hl-tag>
          </template>
          <template #number="{ row }">
            {{ row.num }}
          </template>
          <template #handle>
            <hl-button effect="light" equal>
              <template #icon>
                <hl-icon><two-arrow-right /></hl-icon>
              </template>
            </hl-button>
          </template>
        </hl-simple-table>
      </hl-panel>
    </hl-col>

    <hl-col span="col">
      <hl-panel class="card-panel">
        <template #header>
          <div class="panel-title"><h4>卡片标题</h4></div>
          <div class="panel-header-right">
            <hl-button no-fill equal>
              <template #icon>
                <hl-icon><two-more /></hl-icon>
              </template>
            </hl-button>
          </div>
        </template>

        <hl-simple-table :cols="cols3" :data="tableData" :show-header="false" border="borderless" padding="0">
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
      </hl-panel>
    </hl-col>
  </hl-row>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const tableData = ref([
      { id: 1, icon: 'Server', type: 'primary', num: '2234.43', name: '云服务器ECS', en: 'Infrastructure as a Service' },
      { id: 2, icon: 'Box', type: 'success', num: '866.25', name: '裸金属服务器 BMS', en: 'Bare Metal Server' },
      { id: 3, icon: 'ChartDoughnut', type: 'warning', num: '1025.08', name: '云容器引擎 CKS', en: 'Cloud Kubernetes Service' },
      { id: 4, icon: 'Database', type: 'danger', num: '399.65', name: '云硬盘EBS', en: 'Elastic Block Storage' },
      { id: 4, icon: 'Shield', type: 'danger', num: '399.65', name: '负载均衡SLB', en: 'Server Load Balancer' },
    ])

    const cols = ref([
      { title: '用户名', slotName: 'user', align: 'left' },
      { title: '简介', prop: 'en' },
      { title: '操作', slotName: 'handle', align: 'center' },
    ])
    const cols2 = ref([
      { title: '用户名', slotName: 'user', align: 'left', width: '50%' },
      { title: '简介', slotName: 'progress' },
      { title: '操作', slotName: 'handle', align: 'right', width: '25%' },
    ])
    const cols3 = ref([
      { title: 'icon', slotName: 'icon', align: 'left', width: '3.8rem' },
      { title: '用户名', slotName: 'user', align: 'left' },
      { title: '简介', slotName: 'tags' },
      { title: '数量', slotName: 'number', align: 'right' },
      { title: '操作', slotName: 'handle', align: 'right', width: '10%' },
    ])

    return {
      tableData,
      cols,
      cols2,
      cols3,
    }
  },
})
</script>

