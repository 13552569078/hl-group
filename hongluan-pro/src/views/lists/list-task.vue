<template>
  <hl-group full align="items-between items-middle" class="p-t-lg ">
    <!-- <hl-group gap="var(--md)">
      <hl-select v-model="value1" fill>
        <hl-option value="按紧急程度">按紧急程度</hl-option>
        <hl-option value="按截止时间">按截止时间</hl-option>
        <hl-option value="按更新时间">按更新时间</hl-option>
        <hl-option value="按创建时间">按创建时间</hl-option>
      </hl-select>
      <hl-select v-model="value2" fill>
        <hl-option value="全部类型">全部类型</hl-option>
        <hl-option value="事件处置">事件处置</hl-option>
        <hl-option value="普通任务">普通任务</hl-option>
        <hl-option value="信息接报">信息接报</hl-option>
        <hl-option value="应急值守">应急值守</hl-option>
        <hl-option value="数据采集">数据采集</hl-option>
      </hl-select>
      <hl-select v-model="value3" fill>
        <hl-option value="全部状态">全部状态</hl-option>
        <hl-option value="未响应">未响应</hl-option>
        <hl-option value="执行中">执行中</hl-option>
        <hl-option value="已完成">已完成</hl-option>
        <hl-option value="已超时">已超时</hl-option>
        <hl-option value="已删除">已删除</hl-option>
      </hl-select>
    </hl-group> -->
    <hl-tabs v-model="activeName" type="line" :show-pane="false" nav-height="calc(var(--xxs) * 10)" style="--tabs-border-color: transparent">
      <hl-tab-pane label="任务清单 (1)" name="1" />
      <hl-tab-pane label="我发起 (2)" name="2" />
      <hl-tab-pane label="已完成 (0)" name="3" />
      <hl-tab-pane label="已终止 (0)" name="4" />
    </hl-tabs>
    <hl-group gap="var(--md)" class="static">
      <hl-select v-model="value1">
        <hl-option value="按紧急程度">按紧急程度</hl-option>
        <hl-option value="按截止时间">按截止时间</hl-option>
        <hl-option value="按更新时间">按更新时间</hl-option>
        <hl-option value="按创建时间">按创建时间</hl-option>
      </hl-select>
      <hb-data-filter
        ref="dataFilterRef"
        :items="searchItems"
        gap="var(--sm)"
        max-height="calc(var(--xxl) * 15)"
        :effect="false"
        class=""
        @search="searchChanged"
        @removeSelectedItem="removeSelectedItem"
      >
        <template #icon>
          <hl-icon><fill-filter /></hl-icon>
        </template>
        <template #checkbox>
          <hl-checkbox-group v-model="boxVals" @change="boxChanged">
            <hl-checkbox label="1">选项1</hl-checkbox>
            <hl-checkbox label="2">选项2</hl-checkbox>
            <hl-checkbox label="3">选项3</hl-checkbox>
          </hl-checkbox-group>
        </template>
      </hb-data-filter>

      <!-- <hl-button type="primary" icon-position="left">
        新建任务
        <template #icon>
          <hl-icon>
            <fill-task />
          </hl-icon>
        </template>
      </hl-button> -->
    </hl-group>
  </hl-group>

  <hl-row layout="grid" count="xxl:count-3 xl:count-2 lg:count-2" gap="var(--lg)" gap-y="var(--lg)" dir="vertical" class="m-t-lg">
    <hl-col v-for="item in items" :key="item.title" span="col">
      <hl-panel class="multi-card h-full" borderless header-height="calc(var(--xxs) * 18)" body-class="p-b-md h-full" footer-class="items-left bg-light p-t-lg border-top">
        <template #header>
          <div class="panel-header-left">
            <hl-icon :type="status[item.status]" size="md">
              <component is="two-archive" v-show="item.status == 1" />
              <component is="two-clock" v-show="item.status == 2" />
              <component is="two-circle-disabled" v-show="item.status == 3" />
            </hl-icon>
          </div>
          <div class="panel-title">
            <h5>{{ item.title }}</h5>
          </div>
          <span class="font-sm text-light m-r-sm">{{ item.id }}</span>
          <div class="panel-header-right">
            <hl-dropdown>
              <hl-button size="sm" type="primary" effect="light" equal>
                <template #icon>
                  <hl-icon><two-more /></hl-icon>
                </template>
              </hl-button>
              <template #dropdown>
                <hl-dropdown-menu>
                  <hl-dropdown-item> 查看详情 </hl-dropdown-item>
                  <hl-dropdown-item> 删除任务 </hl-dropdown-item>
                </hl-dropdown-menu>
              </template>
            </hl-dropdown>
          </div>
        </template>
        <hl-group dir="vertical" full class="h-full">
          <div class="bg-light text-secondary radius-sm p-y-sm p-x-md">
            {{ item.describe }}
          </div>
          <hl-group class="m-t-md p-l-xs static" gap="calc(var(--xs) * 8)">
            <hl-group align="items-middle" gap="var(--sm)">
              <hl-group align="items-middle" gap="var(--xs)">
                <hl-icon size="xs" fill round class="border bg-element text-secondary"><two-briefcase /></hl-icon>
                <span class="text-light">参与机构</span>
              </hl-group>
              <h3>{{ item.unit }}</h3>
            </hl-group>

            <hl-group align="items-middle" gap="var(--sm)">
              <hl-group align="items-middle" gap="var(--xs)">
                <hl-icon size="xs" fill round class="border bg-element text-secondary"><two-chart-bar /></hl-icon>
                <span class="text-light">已填报数</span>
              </hl-group>
              <h3 style="line-height: unset;">{{ item.report }}</h3>
              <hl-popover trigger="hover" popper-class="p-none bg-element border-none">
                <template #reference>
                  <hl-icon size="xs" type="info" class="cursor-pointer"><two-info /></hl-icon>
                </template>
                <hl-simple-table size="sm" padding="var(--lg)" border="borderless-last" :cols="cols" :data="tableData" hover />
              </hl-popover>
            </hl-group>
          </hl-group>
        </hl-group>
        <template #footer>
          <hl-group align="items-middle" full gap="var(--xl)">
            <hl-tag :type="status[item.status]" size="lg" class="static">{{ statusName[item.status] }}</hl-tag>
            <hl-group dir="vertical" full="full-x" gap="var(--xs)" align="items-middle">
              <hl-group v-show="item.status == 1" full align="items-between" class="font-sm">
                <hl-group gap="var(--sm)" class="static"><span>结束时间</span><span> {{ item.end }}</span></hl-group>
                <span class="static">3天</span>
              </hl-group>

              <hl-group v-show="item.status == 2" full align="items-between" class="font-sm">
                <hl-group gap="var(--sm)" class="static"><span>开始时间</span><span> {{ item.end }}</span></hl-group>
                <span class="static text-success">即将开始</span>
              </hl-group>

              <hl-group v-show="item.status == 3" full align="items-between" class="font-sm">
                <hl-group gap="var(--sm)" class="static"><span>开始</span><span> {{ item.end }}</span></hl-group>
                <hl-group gap="var(--sm)" class="static"><span>结束</span><span> {{ item.end }}</span></hl-group>
              </hl-group>

              <hl-progress :type="status[item.status]" :align="statusProgress[item.status]" :percentage="item.progress" stroke-width="var(--xxs)" :show-text="false" />
            </hl-group>
          </hl-group>
        </template>
      </hl-panel>
    </hl-col>
  </hl-row>

  <hl-pagination line layout="prev, pager, next" :total="50" align="items-center" class="m-t-xxl" block />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const status = {
      1: 'primary',
      2: 'warning',
      3: 'disabled',
    }
    const statusName = {
      1: '进行中',
      2: '未开始',
      3: '已结束',
    }
    const statusProgress = {
      1: 'left',
      2: 'right',
      3: 'left',
    }
    const items = ref([
      { id: '2022011', status: 1, title: '2021年度城市风险数据收集', describe: 'HTML, JS, VueJS', start: '2021-11-25 19:00', end: '2021-11-25 19:00', unit: '123', report: '345', progress: 50 },
      {
        id: '2022012',
        status: 2,
        title: '2021年度城市风险数据收集',
        describe: '请各安委办成员单位组织所辖企业完成2021年度企业风险点数据与应急资源数据的填报工作',
        start: '2021-11-25 19:00',
        end: '2021-11-25 19:00',
        unit: '123',
        report: '345',
        progress: 30,
      },
      { id: '2022013', status: 3, title: '2021年度城市风险数据收集', describe: '风险点、应急救援队伍', start: '2021-11-25 19:00', end: '2021-11-25 19:00', unit: '123', report: '345', progress: 0 },
      { id: '2022013', status: 3, title: '2021年度城市风险数据收集', describe: '风险点、应急救援队伍', start: '2021-11-25 19:00', end: '2021-11-25 19:00', unit: '123', report: '345', progress: 0 },
      { id: '2022013', status: 3, title: '2021年度城市风险数据收集', describe: '风险点、应急救援队伍', start: '2021-11-25 19:00', end: '2021-11-25 19:00', unit: '123', report: '345', progress: 0 },
      { id: '2022013', status: 3, title: '2021年度城市风险数据收集', describe: '风险点、应急救援队伍', start: '2021-11-25 19:00', end: '2021-11-25 19:00', unit: '123', report: '345', progress: 0 },
    ])

    const tableData = ref([
      {
        content: '风险点填报表单',
        count: '180',
      },
      {
        content: '应急救援队伍填报表',
        count: '65',
      },
      {
        content: '应急物质收集',
        count: '0',
      },
    ])
    const cols = ref([
      { title: '采集内容', prop: 'content' },
      { title: '填报数量', prop: 'count', align: 'right' },
    ])

    const activeName = ref('1')
    const value1 = ref('按创建时间')
    const value2 = ref('全部状态')
    const value3 = ref('全部状态')

    return {
      items,
      status,
      statusName,
      statusProgress,
      tableData,
      cols,
      value1,
      value2,
      value3,
      activeName,
    }
  },
})
</script>

