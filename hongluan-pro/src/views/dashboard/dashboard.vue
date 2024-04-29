<template>
  <hl-row class="m-b-lg" gap="var(--lg)">
    <hl-col v-for="item in topCard" :key="item.title" span="lg:col-6 md:col-12">
      <hb-data-collect
        class="box-shadow-sm bg-content"
        full
        padding="var(--xl)"
        gap="var(--sm)"
        radius="var(--radius-lg)"
      >
        <hl-icon :type="item.type" effect="light" size="xl" fill radius>
          <component :is="'fill' + item.icon" />
        </hl-icon>
        <hl-group dir="vertical">
          <h2 class="title">{{ item.value }}</h2>
          <span class="sub-title font-typing">{{ item.title }}</span>
        </hl-group>
        <hl-progress
          show-as="circle"
          type="primary"
          :stroke-width="6"
          :percentage="Math.floor(Math.random() * (1 - 100) + 100)"
          class="static"
          style="width: calc(var(--xs) * 7); height: calc(var(--xs) * 7);"
        >
          <template #default="{ percentage }">
            <div class="progress-content">{{ percentage }}%</div>
          </template>
        </hl-progress>
      </hb-data-collect>
    </hl-col>
  </hl-row>

  <hl-row gap="var(--lg)" dir="vertical">
    <hl-col span="lg:col-8 md:col-12">
      <hl-panel class="card-panel h-full">
        <template #header>
          <div class="panel-title">
            <h4>卡片标题</h4>
          </div>
          <div class="panel-header-right"></div>
        </template>
        <pie-4-chart />
      </hl-panel>
    </hl-col>
    <hl-col span="lg:col-8 md:col-12">
      <hl-panel class="card-panel h-full">
        <template #header>
          <div class="panel-title">
            <h4>卡片标题</h4>
          </div>
          <div class="panel-header-right"></div>
        </template>
        <line-3-chart />
      </hl-panel>
    </hl-col>
    <hl-col span="lg:col-8">
      <hl-panel class="card-panel h-full">
        <template #header>
          <div class="panel-title">
            <h4>卡片标题</h4>
          </div>
          <div class="panel-header-right"></div>
        </template>
        <column-6-chart />
      </hl-panel>
    </hl-col>
    <hl-col span="xl:col-7 md:col-12">
      <hl-panel class="card-panel h-full">
        <template #header>
          <div class="panel-title">
            <h4>代办任务</h4>
          </div>
          <div class="panel-header-right">
            <hl-tabs
              v-model="activeName"
              type="button"
              :show-pane="false"
              nav-height="var(--xl)"
              nav-padding="var(--sm)"
              gap="0"
              @tab-click="handleClick"
            >
              <hl-tab-pane label="今日" name="first" />
              <hl-tab-pane label="本周" name="second" />
              <hl-tab-pane label="本年" name="third" />
            </hl-tabs>
          </div>
        </template>
        <hl-group gap="var(--sm)" full="full-x">
          <hb-data-collect
            v-for="item in cardList"
            :key="item.title"
            full
            dir="vertical"
            align="items-center"
            gap="var(--sm)"
            padding-x="var(--sm)"
            padding-y="var(--lg)"
            class="bg-light"
          >
            <hl-group dir="vertical" gap="var(--sm)">
              <hl-icon :type="item.type" effect="light" size="xxl" class="symbol static">
                <component :is="'fill' + item.icon" />
              </hl-icon>
            </hl-group>
            <hl-group dir="vertical" align="items-middle">
              <h4>{{ item.value }}</h4>
              <span class="text-secondary">{{ item.title }}</span>
            </hl-group>
          </hb-data-collect>
        </hl-group>

        <hl-progress
          type="success"
          class="m-t-lg"
          :percentage="50"
          indicating
          active
          text="当前已完成"
          stroke-width="var(--sm)"
          :format="formatActive"
          show-as="line"
        />
      </hl-panel>
    </hl-col>

    <hl-col span="xl:col-7 md:col-12">
      <hl-panel class="card-panel h-full">
        <template #header>
          <div class="panel-title">
            <h4>卡片标题</h4>
          </div>
          <div class="panel-header-right"></div>
        </template>
        <hl-group dir="vertical" full="full-x">
          <hb-data-collect gap="var(--sm)" padding-x="0" padding-y="var(--md)">
            <hl-icon type="primary" effect="light" size="lg" fill radius class="symbol static">
              <fill-airplay />
            </hl-icon>
            <hl-group dir="vertical" full="full-x" class="content">
              <h6 class="title">马映冬</h6>
              <span class="sub-title">UED高级UI射击师</span>
            </hl-group>
            <hl-switch type="primary" />
          </hb-data-collect>
          <hb-data-collect gap="var(--sm)" padding-x="0" padding-y="var(--md)">
            <hl-icon type="danger" effect="light" size="lg" fill radius class="symbol static">
              <fill-folder-add />
            </hl-icon>
            <hl-group dir="vertical" full="full-x" class="content">
              <h6 class="title">范巧蕊</h6>
              <span class="sub-title">UED高级UI射击师</span>
            </hl-group>
            <hl-switch type="primary" />
          </hb-data-collect>
          <hb-data-collect gap="var(--sm)" padding-x="0" padding-y="var(--md)">
            <hl-icon type="warning" effect="light" size="lg" fill radius class="symbol static">
              <fill-friday />
            </hl-icon>
            <hl-group dir="vertical" full="full-x" class="content">
              <h6 class="title">王海亦</h6>
              <span class="sub-title">UED高级UI射击师</span>
            </hl-group>
            <hl-switch type="primary" />
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

    const cardList = ref([
      { icon: 'Alert', title: '已处置', value: Math.floor(Math.random() * 1000), type: 'primary', num: Math.floor(Math.random() * (1 - 100) + 100) },
      { icon: 'Pie', title: '未处置', value: Math.floor(Math.random() * 1000), type: 'warning', num: Math.floor(Math.random() * (1 - 100) + 100) },
      { icon: 'ChartBar', title: '任务总数', value: Math.floor(Math.random() * 1000), type: 'success', num: Math.floor(Math.random() * (1 - 100) + 100) },
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
    ])

    const cols2 = ref([
      { title: '用户名', slotName: 'user', align: 'left', width: '50%' },
      { title: '简介', slotName: 'progress' },
      { title: '操作', slotName: 'handle', align: 'right', width: '25%' },
    ])

    const formatActive = percentage => {
      return `${percentage}% `
    }

    const activeName = ref('second')

    return {
      items,
      tableData,
      cols2,
      topCard,
      cardList,
      activeName,
      formatActive,
    }
  },
})
</script>
