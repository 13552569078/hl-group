<template show-source>
  <hv-modal title="表格模态窗" style="width: calc(var(--xxs) * 300); height: calc(var(--xxs) * 150)" full-body>
    <template #header>
      <div class="panel-header-left">
        <hl-tabs v-model="activeName" type="line" :show-pane="false" style="flex-grow: 1" nav-height="calc(var(--xxs) * 18)">
          <hl-tab-pane label="填报详情" name="first" />
          <hl-tab-pane label="机构详情" name="second" />
        </hl-tabs>
      </div>
      <div class="panel-title"></div>
      <div class="panel-header-right">
        <hl-group gap="var(--sm)">
          <hl-button type="primary" effect="light" icon-position="left">
            导出列表
            <template #icon>
              <hl-icon>
                <two-storage />
              </hl-icon>
            </template>
          </hl-button>
          <hl-button type="primary" icon-position="left">
            新增数据
            <template #icon>
              <hl-icon>
                <two-plus />
              </hl-icon>
            </template>
          </hl-button>
        </hl-group>
      </div>
    </template>
    <hl-group gap="var(--lg)" full class="h-full p-lg">
      <hl-group dir="vertical" align="items-between" style="width: calc(var(--xxs) * 100)">
        <hl-scrollbar>
          <hl-group dir="vertical" full gap="var(--md)">
            <hl-group v-for="n in 4" dir="vertical" full class="p-md bg-light">
              <hl-group full align="items-top">
                <hl-group dir="vertical" gap="var(--xxs)">
                  <h5>监测因子1</h5>
                  <span class="text-secondary">计量单位：人/10平方米</span>
                </hl-group>
                <hl-tag size="sm" class="static">大客流</hl-tag>
              </hl-group>
              <hl-group full class="m-t-md border-top p-t-md">
                <hl-row layout="grid" count="count-3" gap-x="var(--md)" gap-y="var(--xxs)" dir="horizontal">
                  <hl-col span="col">
                    <hl-group full align="items-left">
                      <span class="static text-secondary">下区间：</span>
                      <span class="content">≥5000</span>
                    </hl-group>
                  </hl-col>
                  <hl-col span="col">
                    <hl-group full align="items-left">
                      <span class="static text-secondary">下区间：</span>
                      <span class="content">≥5000</span>
                    </hl-group>
                  </hl-col>
                  <hl-col span="col">
                    <hl-group full align="items-left">
                      <span class="static text-secondary">下区间：</span>
                      <span class="content">≥5000</span>
                    </hl-group>
                  </hl-col>
                  <hl-col span="col">
                    <hl-group full align="items-left">
                      <span class="static text-secondary">上区间：</span>
                      <span class="content">≥5000</span>
                    </hl-group>
                  </hl-col>
                  <hl-col span="col">
                    <hl-group full align="items-left">
                      <span class="static text-secondary">上区间：</span>
                      <span class="content">≥5000</span>
                    </hl-group>
                  </hl-col>
                  <hl-col span="col">
                    <hl-group full align="items-left">
                      <span class="static text-secondary">上区间：</span>
                      <span class="content">≥5000</span>
                    </hl-group>
                  </hl-col>
                </hl-row>
              </hl-group>
            </hl-group>
          </hl-group>
        </hl-scrollbar>
      </hl-group>
      <hl-group full dir="vertical" class="h-full">
        <hb-table-searchbar class="p-b-lg border-bottom" :selector="selector" :searcher="searcher" padding="0" gap="var(--md)" />
        <hl-scrollbar>
          <hl-simple-table class="borderless-last" border="border-x" padding="var(--xl)" hover stripe :cols="cols" :data="tableData">
            <template #handle>
              <hl-group gap="var(--xxs)">
                <a href="">编辑</a>
              </hl-group>
            </template>
          </hl-simple-table>
        </hl-scrollbar>
        <hl-group class="p-y-lg border-top">
          <hl-pagination full align="items-right" layout="slot, prev, pager, next, jumper, sizes" :total="50" :gap="gapValue" :pager-gap="pagerGapValue" block class="w-full">
          </hl-pagination>
        </hl-group>
      </hl-group>
    </hl-group>
  </hv-modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
export default defineComponent({
  setup() {
    const activeName = ref('first')

    const tableData = ref([
      {
        id: 1,
        main: 'Button 按钮',
        type: '表单',
        date: '2021-07-18',
      },
      {
        id: 2,
        main: 'Input 输入框',
        type: '表单',
        date: '2021-07-18',
      },
      {
        id: 3,
        main: 'Autocomplete 输入建议',
        type: '表单',
        date: '2021-07-18',
      },
      {
        id: 4,
        main: 'InputNumber 计数器',
        type: '表单',
        date: '2021-07-18',
      },
      {
        id: 5,
        main: 'Select 选择器',
        type: '表单',
        date: '2021-07-18',
      },
      {
        id: 6,
        main: 'Radio 单选框',
        type: '表单',
        date: '2021-07-18',
      },
      {
        id: 7,
        color: 'danger',
        main: 'Checkbox 复选框',
        type: '表单',
        date: '2021-07-18',
      },
      {
        id: 8,
        main: 'Switch 开关',
        type: '表单',
        date: '2021-07-18',
      },
    ])
    const cols = ref([
      { title: '#', prop: 'id', width: '6em' },
      { title: '监测时间', prop: 'date', width: '13%' },
      { title: '监测主体', slotName: 'main' },
      { title: '事件类型', slotName: 'handle', align: 'center', width: '10%' },
      { title: '监测因子', slotName: 'factor' },
    ])

    const pagination = reactive({
      pageSize: 100,
      total: 400,
      currentPage: 1,
      show: false,
    })

    const originItems = [
      {
        placeholder: '选择填报状态',
        fill: false,
        value: '',
        name: 'prop1',
        prop: {
          label: 'name',
          value: 'code',
        },
        options: [
          { name: '审核完成', code: '1' },
          { name: '审核中', code: '2' },
          { name: '草稿', code: '3' },
          { name: '审核驳回', code: '4' },
        ],
      },
      {
        placeholder: '选择同步状态',
        fill: false,
        value: '',
        name: 'prop2',
        options: [
          { label: '已同步', value: '1' },
          { label: '未同步', value: '2' },
        ],
      },
    ]
    const searcher = reactive({
      show: true,
      fill: false,
      placeholder: '输入关键词搜索',
    })
    const selector = reactive({
      colCount: 'md:count-3 sm:count-2',
      items: originItems,
    })

    return {
      activeName,
      tableData,
      cols,
      pagination,
      searcher,
      selector,
    }
  },
})
</script>

<style lang="scss">
</style>
