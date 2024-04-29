<template>
  <hl-row class="m-b-lg" gap="var(--lg)">
    <hl-col v-for="item in topCard" :key="item.title" span="lg:col-6 md:col-12">
      <hb-data-collect class="box-shadow-sm bg-content" full padding="var(--xl)" gap="var(--sm)" radius="var(--radius-lg)">
        <hl-icon :type="item.type" effect="light" size="xl" fill radius>
          <component :is="'fill' + item.icon" />
        </hl-icon>
        <hl-group dir="vertical">
          <h2 class="title">{{ item.value }}</h2>
          <span class="sub-title">{{ item.title }}</span>
        </hl-group>
        <hl-progress show-as="circle" type="primary" :stroke-width="6" :percentage="Math.floor(Math.random() * (1 - 100) + 100)" class="static" style="width: 56px; height: 56px">
          <template #default="{ percentage }">
            <div class="progress-content">{{ percentage }}%</div>
          </template>
        </hl-progress>
      </hb-data-collect>
    </hl-col>
  </hl-row>

  <hl-row gap="var(--lg)" dir="vertical">
    <hl-col span="xl:col-8 lg:col-12">
      <hl-panel class="card-panel h-full">
        <template #header>
          <div class="panel-title"><h4>卡片标题</h4></div>
          <div class="panel-header-right"></div>
        </template>
        <pie-4-chart />
      </hl-panel>
    </hl-col>
    <hl-col span="xl:col-8 lg:col-12">
      <hl-panel class="card-panel h-full">
        <template #header>
          <div class="panel-title"><h4>卡片标题</h4></div>
          <div class="panel-header-right"></div>
        </template>
        <line-3-chart />
      </hl-panel>
    </hl-col>
    <hl-col span="xl:col-8">
      <hl-panel class="card-panel h-full">
        <template #header>
          <div class="panel-title"><h4>卡片标题</h4></div>
          <div class="panel-header-right"></div>
        </template>
        <column-6-chart />
      </hl-panel>
    </hl-col>
    <hl-col span="xl:col-7 lg:col-12">
      <hl-panel class="card-panel h-full">
        <template #header>
          <div class="panel-title"><h4>代办任务</h4></div>
          <div class="panel-header-right">
            <hl-button no-fill equal>
              <hl-icon><two-more /></hl-icon>
            </hl-button>
          </div>
        </template>
        <hl-group dir="vertical" gap="var(--md)" full="full-x">
          <hb-data-collect v-for="item in items" :key="item.title" gap="var(--sm)" class="bg-light cursor-pointer">
            <hl-group dir="vertical" full="full-x">
              <h6 class="ellipsis">{{ item.title }}</h6>
              <span class="sub-title">{{ item.sub_title }}</span>
            </hl-group>
            <hl-group gap="var(--sm)">
              <hl-tag size="sm">车道占用</hl-tag>
            </hl-group>
          </hb-data-collect>
        </hl-group>
      </hl-panel>
    </hl-col>
    <hl-col span="xl:col-10 lg:col-12">
      <hl-panel class="card-panel h-full">
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
        <hl-row layout="grid" count="count-2" gap-x="var(--xl)">
          <hl-col span="col">
            <hb-data-collect class="bg-primary" gap="var(--md)" padding="var(--md)" full="full-x">
              <hl-icon size="lg" fill radius class="symbol static bg-primary-light-1 text-inverse">
                <fill-airplay />
              </hl-icon>
              <hl-group dir="vertical">
                <h4 class="text-inverse drelative" data-suffix="个" style="--suffix-color: var(--pageFontColor-Inverse)">13</h4>
                <span class="text-inverse">今日新增</span>
              </hl-group>
            </hb-data-collect>
          </hl-col>
          <hl-col span="col">
            <hb-data-collect class="bg-success" gap="var(--md)" padding="var(--md)" full="full-x">
              <hl-icon size="lg" fill radius class="symbol static bg-success-light-1 text-inverse">
                <fill-assembly-area />
              </hl-icon>
              <hl-group dir="vertical">
                <h4 class="text-inverse relative" data-suffix="%" style="--suffix-color: var(--pageFontColor-Inverse)">89</h4>
                <span class="text-inverse">处置完成率</span>
              </hl-group>
            </hb-data-collect>
          </hl-col>
        </hl-row>
        <hl-simple-table class="m-t-md" :cols="cols2" :data="tableData" border="borderless" :show-header="false" padding="0" td-padding="0">
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
    <hl-col span="xl:col-7 lg:col-12">
      <hl-panel class="card-panel h-full">
        <template #header>
          <div class="panel-title"><h4>卡片标题</h4></div>
          <div class="panel-header-right"></div>
        </template>

        <hl-group v-for="(item, idx) in todos" :key="idx" dir="vertical" class="m-b-md w-full">
          <hl-group class="item-between" gap="var(--sm)">
            <hl-checkbox v-model="item.finished">
              <span :class="{ ellipsis: true, 'text-secondary': item.finished }" :title="item.title" :style="{ textDecoration: item.finished ? 'line-through' : 'none' }">
                {{ item.title }}
              </span>
            </hl-checkbox>
            <span class="font-sm text-secondary" :style="{ textDecoration: item.finished ? 'line-through' : 'none' }">
              {{ item.date }}
            </span>
          </hl-group>
        </hl-group>
      </hl-panel>
    </hl-col>
  </hl-row>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue'
import Line3Chart from '../chart/line-chart/components/line3.vue'
import Column6Chart from '../chart/column-chart/components/column6.vue'
import Pie4Chart from '../chart/pie-chart/components/pie4.vue'

export default defineComponent({
  components: {
    Line3Chart,
    Column6Chart,
    Pie4Chart,
  },
  setup() {
    const topCard = ref([
      { icon: 'Alert', title: '报警次数统计', value: Math.floor(Math.random() * 10000), type: 'primary', num: Math.floor(Math.random() * (1 - 100) + 100) },
      { icon: 'UserGroup', title: '报警次数统计', value: Math.floor(Math.random() * 10000), type: 'danger', num: Math.floor(Math.random() * (1 - 100) + 100) },
      { icon: 'Pie', title: '报警次数统计', value: Math.floor(Math.random() * 10000), type: 'warning', num: Math.floor(Math.random() * (1 - 100) + 100) },
      { icon: 'ChartBar', title: '报警次数统计', value: Math.floor(Math.random() * 10000), type: 'success', num: Math.floor(Math.random() * (1 - 100) + 100) },
    ])

    const items = ref([
      { icon: 'Calendar', title: '车辆高频占用事件', sub_title: '2021-11-18 13:30:45', type: 'primary' },
      { icon: 'Briefcase', title: '业主举报一辆快递车占用消防车道', sub_title: '2021-11-18 13:30:45', type: 'danger' },
      { icon: 'Inbox', title: '小区东门有私家车占道', sub_title: '2021-11-18 13:30:45', type: 'warning' },
      { icon: 'Application', title: '消防通道入口地面损坏', sub_title: '2021-11-18 13:30:45', type: 'success' },
      { icon: 'Print', title: '5号监控摄像头故障', sub_title: '2021-11-18 13:30:45', type: 'danger' },
    ])

    const tableData = ref([
      { id: 1, icon: 'Server', type: 'primary', num: '2234.43', name: '云服务器ECS', en: 'Infrastructure as a Service' },
      { id: 2, icon: 'Box', type: 'success', num: '866.25', name: '裸金属服务器 BMS', en: 'Bare Metal Server' },
      { id: 3, icon: 'ChartDoughnut', type: 'warning', num: '1025.08', name: '云容器引擎 CKS', en: 'Cloud Kubernetes Service' },
      { id: 4, icon: 'Database', type: 'danger', num: '399.65', name: '云硬盘EBS', en: 'Elastic Block Storage' },
    ])

    const cols2 = ref([
      { title: '用户名', slotName: 'user', align: 'left', width: '50%' },
      { title: '简介', slotName: 'progress' },
      { title: '操作', slotName: 'handle', align: 'right', width: '25%' },
    ])

    const todos = ref([
      { title: '完成Hongluan UI基础设计', date: '2021-09-09', finished: false },
      { title: '完成Hongluan Pro页面开发"', date: '2021-11-09', finished: false },
      { title: '完成监测预警App开发"', date: '2021-11-10', finished: false },
      { title: '完成应急微前端拆分', date: '2021-11-11', finished: false },
      { title: '优化Hongluan UI样式', date: '2021-12-09', finished: false },
      { title: '同步更新Hongluan Pro代码', date: '2021-12-10', finished: false },
      { title: '完成连云港一张图开发', date: '2021-12-21', finished: false },
      { title: '一张图新版组件库设计', date: '2021-12-31', finished: false },
    ])

    return {
      items,
      tableData,
      cols2,
      topCard,
      todos,
    }
  },
})
</script>
