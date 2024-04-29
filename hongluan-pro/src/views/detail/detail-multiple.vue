<template>
  <hl-row gap="var(--lg)">
    <hl-col span="col-24">
      <hl-panel class="card-panel" body-padding="calc(var(--xxl) + var(--md))">
        <template #header>
          <div class="panel-header-left">
            <hl-icon>
              <two-page />
            </hl-icon>
          </div>
          <div class="panel-title">
            <h4>基本信息</h4>
          </div>
          <div class="panel-header-right"></div>
        </template>
        <hl-row
          layout="grid"
          count="xl:count-4 lg:count-3 md:count-2"
          gap-x="var(--xxl)"
          gap-y="var(--lg)"
        >
          <hl-col v-for="item in desData" :key="item.label" span="col">
            <hl-group dir="vertical" class="info-description auto-height">
              <span class="label">{{ item.label }}</span>
              <span class="content ellipsis">{{ item.value }}</span>
            </hl-group>
          </hl-col>
        </hl-row>
      </hl-panel>
    </hl-col>

    <hl-col span="lg:col-12">
      <hl-panel class="card-panel" body-padding="calc(var(--xxl) + var(--md))">
        <template #header>
          <div class="panel-header-left">
            <hl-icon>
              <two-page />
            </hl-icon>
          </div>
          <div class="panel-title">
            <h4>基本信息</h4>
          </div>
          <div class="panel-header-right"></div>
        </template>
        <hl-row layout="grid" count="xl:count-2" gap-x="var(--xxl)" gap-y="var(--lg)">
          <hl-col v-for="item in desData.slice(0, 4)" :key="item.label" span="col">
            <hl-group dir="vertical" class="info-description auto-height">
              <span class="label">{{ item.label }}</span>
              <span class="content ellipsis">{{ item.value }}</span>
            </hl-group>
          </hl-col>
        </hl-row>
      </hl-panel>
    </hl-col>

    <hl-col span="lg:col-12">
      <hl-panel class="card-panel" body-padding="calc(var(--xxl) + var(--md))">
        <template #header>
          <div class="panel-header-left">
            <hl-icon>
              <two-page />
            </hl-icon>
          </div>
          <div class="panel-title">
            <h4>基本信息</h4>
          </div>
          <div class="panel-header-right"></div>
        </template>
        <template #default class="p-b-xl">
          <hl-row layout="grid" count="xl:count-2" gap-x="var(--xxl)" gap-y="var(--lg)">
            <hl-col v-for="item in desData.slice(8, 12)" :key="item.label" span="col">
              <hl-group dir="vertical" class="info-description auto-height">
                <span class="label">{{ item.label }}</span>
                <span class="content ellipsis">{{ item.value }}</span>
              </hl-group>
            </hl-col>
          </hl-row>
        </template>
      </hl-panel>
    </hl-col>

    <hl-col span="col-24">
      <hl-panel class="card-panel" body-padding="calc(var(--xxl) + var(--md))">
        <template #header>
          <div class="panel-header-left">
            <hl-icon>
              <two-table />
            </hl-icon>
          </div>
          <div class="panel-title">
            <h4>表格</h4>
          </div>
          <div class="panel-header-right"></div>
        </template>
        <hl-simple-table :cols="cols" :data="tableData" stripe border="bordered" compact>
          <template #tableIndex="{ row }">
            <span>{{ row.rowIndex + 1 }}</span>
          </template>
          <template #handle>
            <hl-group gap="var(--md)">
              <a href>编辑</a>
              <a href>删除</a>
            </hl-group>
          </template>
        </hl-simple-table>
      </hl-panel>
    </hl-col>

    <hl-col span="col-24">
      <hl-panel class="card-panel" body-padding="calc(var(--xxl) + var(--md))">
        <template #header>
          <div class="panel-header-left">
            <hl-icon>
              <two-page />
            </hl-icon>
          </div>
          <div class="panel-title">
            <h4>执法信息</h4>
          </div>
          <div class="panel-header-right"></div>
        </template>
        <hl-timeline class="m-t-lg">
          <hl-timeline-item v-for="n in 2" :hide-timestamp="true">
            <hl-group dir="vertical" full="full-x" class="p-b-lg" gap="var(--md)">
              <hl-group dir="vertical" align="items-center items-between" gap="var(--md)">
                <hl-group class="static" align="items-bottom" gap="var(--xs)">
                  <h5 class="text-primary">计划名称-{{ n }}</h5>
                  <span class="text-secondary font-sm">2020-01-01 至 2020-01-03</span>
                </hl-group>
                <hl-group gap="var(--xxl)" gap-y="var(--md)" wrap>
                  <hb-data-collect gap="var(--xs)" padding="0">
                    <hl-icon type="danger" effect="light" size="md" fill radius>
                      <fill-book />
                    </hl-icon>
                    <hl-group align="items-middle" gap="var(--xs)">
                      <span class="font-md">重大隐患</span>
                      <span class="font-bold relative text-danger" data-suffix="个">1</span>
                    </hl-group>
                  </hb-data-collect>
                  <hb-data-collect gap="var(--xs)" padding="0">
                    <hl-icon type="warning" effect="light" size="md" fill radius>
                      <fill-Layout />
                    </hl-icon>
                    <hl-group align="items-middle" gap="var(--xs)">
                      <span class="font-md">一般隐患</span>
                      <span class="font-bold relative text-warning" data-suffix="个">0</span>
                    </hl-group>
                  </hb-data-collect>
                  <hb-data-collect gap="var(--xs)" padding="0">
                    <hl-icon type="success" effect="light" size="md" fill radius>
                      <fill-RescueTeam />
                    </hl-icon>
                    <hl-group align="items-middle" gap="var(--xs)">
                      <span class="font-md">突出问题</span>
                      <span class="font-bold relative text-success" data-suffix="个">14</span>
                    </hl-group>
                  </hb-data-collect>
                </hl-group>
              </hl-group>
              <hl-panel header-height="calc(var(--lg) * 2)">这里写任意内容 {{ n }}</hl-panel>
            </hl-group>
          </hl-timeline-item>
        </hl-timeline>
      </hl-panel>
    </hl-col>
  </hl-row>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup() {
    const tableData = ref([
      { id: 1, title: 'Button 按钮', sub_title: 'HTML, JS, Scss', type: '表单', des: '钮组件也拥有统一的状态色，如：primary, danger 等', update: '2021-07-18' },
      { id: 2, title: 'Input 输入框', sub_title: 'HTML, JS, Scss', type: '表单', des: '通过鼠标或键盘输入内容，Input 为受控组件', update: '2021-07-18' },
      { id: 3, title: 'Autocomplete 输入建议', sub_title: 'HTML, JS, Scss', type: '表单', des: 'autocomplete 是一个带输入建议的输入框组件', update: '2021-07-18' },
      { id: 4, title: 'InputNumber 计数器', sub_title: 'HTML, JS, Scss', type: '表单', des: '计数器由group容器和button、input组成', update: '2021-07-18' },
    ])
    const cols = ref([
      { title: '#', slotName: 'tableIndex' },
      { title: '组件名称', prop: 'title' },
      { title: '类型', prop: 'type', width: '10%' },
      { title: '简介', prop: 'des' },
      { title: '更新日期', prop: 'update' },
      { title: '操作', slotName: 'handle', align: 'center', width: '15%' },
    ])

    const desData = ref([
      { label: '企业名称', key: '1', value: '河北某个虚拟化工股份有限公司' },
      { label: '行政区划', key: '2', value: '四川省-德阳市-绵竹市' },
      { label: '主管单位', key: '3', value: '河北省应急管理局' },
      { label: '成立日期', key: '4', value: '2005年08月30日' },
      { label: '经济行业类型', key: '5', value: '化学-有机化工' },
      { label: '法定代表人', key: '6', value: '贾明字' },
      { label: '经济类型', key: '7', value: '内资-国有全资' },
      { label: '工商注册地址', key: '8', value: '文本信息的字符长度超出一行的范围自动隐藏' },
      { label: '证件类型', key: '9', value: '营业执照' },
      { label: '邮政编码', key: '10', value: '457000' },
      { label: '经营范围', key: '11', value: '20200703_营业执照.jpg' },
      { label: '统一社会信用代码', key: '12', value: '12345200508307959D' },
    ])
    const picData = ref([
      {
        title: '',
        thumb: 'https://i0.hippopx.com/photos/298/434/513/beach-dawn-dusk-ocean-thumb.jpg',
      },
      {
        title: '',
        thumb: 'https://i0.hippopx.com/photos/738/1016/11/children-fishing-the-activity-asia-thumb.jpg',
      },
      {
        title: '',
        thumb: 'https://i0.hippopx.com/photos/264/421/89/child-children-girl-happy-thumb.jpg',
      },
      {
        title: '',
        thumb: 'https://i0.hippopx.com/photos/199/210/349/man-board-drawing-muscles-thumb.jpg',
      },
    ])
    const srcList = computed(() => picData.value.map((item) => item.thumb))

    return {
      tableData,
      cols,
      desData,
      picData,
      srcList,
    }
  },
})
</script>

<style>
</style>
