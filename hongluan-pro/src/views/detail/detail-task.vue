<template>
  <hl-panel padding="var(--xxl)" footer-padding="0" footer-class="items-left" class="main-panel texture-bg-circuit">
    <hl-row>
      <hl-col span="col-16" dir="vertical" class="border-right p-r-xxl">
        <hl-group gap="var(--xxs)">
          <h4>2021年度历下区城市风险数据收集</h4>
          <hl-button type="primary" size="sm" equal round effect="light" no-fill>
            <hl-icon>
              <two-edit />
            </hl-icon>
          </hl-button>
        </hl-group>
        <div class="bg-light text-secondary radius-xxs p-y-sm p-x-md m-t-md" style="min-height: calc(var(--xxs) * 17)">
          请各安委办成员单位组织所辖企业完成2021年度企业风险点数据与应急资源数据的填报工作
        </div>
        <hl-group class="m-t-lg static" gap="calc(var(--xs) * 8)">
          <hl-group align="items-middle" gap="var(--sm)">
            <hl-group align="items-middle" gap="var(--xs)">
              <hl-icon size="xs" fill round class="border bg-element text-secondary"><two-briefcase /></hl-icon>
              <span class="text-light">参与机构</span>
            </hl-group>
            <h3 style="line-height: unset">136</h3>
          </hl-group>
          <hl-group align="items-middle" gap="var(--sm)">
            <hl-group align="items-middle" gap="var(--xs)">
              <hl-icon size="xs" fill round class="border bg-element text-secondary"><two-chart-bar /></hl-icon>
              <span class="text-light">已填报数</span>
            </hl-group>
            <h3 style="line-height: unset">835</h3>
          </hl-group>
        </hl-group>
        <hl-group align="items-middle" full gap="var(--xl)" class="m-t-lg">
          <hl-tag type="primary" size="lg" class="static">进行中</hl-tag>
          <hl-group dir="vertical" full="full-x" gap="var(--xs)" align="items-middle">
            <hl-group full align="items-between" class="font-sm">
              <hl-group gap="var(--sm)" class="static"><span>开始时间</span><span>2022-01-16</span></hl-group>
              <hl-group gap="var(--sm)" class="static"><span>结束时间</span><span>2022-03-16</span><span class="static text-danger">3天</span></hl-group>
            </hl-group>
            <hl-progress type="primary" :percentage="60" stroke-width="var(--xxs)" :show-text="false" />
          </hl-group>
        </hl-group>
      </hl-col>

      <hl-col span="col-8" class="p-l-xxl">
        <hl-group dir="vertical" gap="var(--md)" block>
          <hl-group gap="var(--xxs)">
            <h4>采集内容</h4>
            <hl-button type="primary" size="sm" equal round effect="light" no-fill>
              <hl-icon>
                <two-edit />
              </hl-icon>
            </hl-button>
          </hl-group>
          <hl-scrollbar height="calc(var(--xxs) * 44)">
            <hl-group dir="vertical" align="items-left" gap="var(--sm)">
              <hl-tag type="primary" effect="light">风险点填报表单</hl-tag>
              <hl-tag type="primary" effect="light">应急救援队伍填报表单</hl-tag>
              <hl-tag type="primary" effect="light">应急救援队伍</hl-tag>
            </hl-group>
          </hl-scrollbar>
        </hl-group>
      </hl-col>
    </hl-row>
  </hl-panel>

  <hl-panel class="table-panel m-t-lg" body-class="p-t-none">
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
              <hl-icon><two-storage /></hl-icon>
            </template>
          </hl-button>
          <hl-button type="primary" icon-position="left">
            新增数据
            <template #icon>
              <hl-icon><two-plus /></hl-icon>
            </template>
          </hl-button>
        </hl-group>
      </div>
    </template>
    <hl-group full="full-x">
      <hl-group dir="vertical" block gap="var(--sm)" class="w-xl static p-xl border-right">
        <h5 class="m-l-md">采集内容</h5>
        <hl-list hover>
          <hl-list-item>
            风险点填报表单
            <template #suffix><hl-tag type="primary" size="sm" effect="light">180</hl-tag></template>
          </hl-list-item>
          <hl-list-item>
            应急救援队伍填报表
            <template #suffix><hl-tag type="primary" size="sm" effect="light">65</hl-tag></template>
          </hl-list-item>
          <hl-list-item>
            应急物质收集
            <template #suffix><hl-tag type="danger" size="sm" effect="light">0</hl-tag></template>
          </hl-list-item>
        </hl-list>
      </hl-group>
      <hl-panel class="table-panel" padding="0" footer-class="p-y-lg p-x-xl border-top" style="height: calc(var(--xl) * 20); box-shadow: none" full-body>
        <hl-scrollbar>
          <hb-table-searchbar class="p-x-xl p-y-lg border-bottom" :selector="selector" :searcher="searcher" padding="0" gap="var(--md)" />
          <hl-simple-table class="borderless-last" border="border-x" padding="var(--xl)" fixed-header hover stripe :cols="cols" :data="tableData">
            <template #firstCol>
              <hl-checkbox v-model="selectedAll" @change="selectAll" />
            </template>
            <template #tableIndex="{ row }">
              <hl-checkbox v-model="selectedRows" :label="row.id" @change="selectRow(row.id)">
                {{ '' }}
              </hl-checkbox>
            </template>

            <template #handle>
              <hl-group gap="var(--xxs)">
                <hl-popover trigger="hover" content="编辑" placement="top" tooltip>
                  <template #reference>
                    <hl-button type="primary" equal radius no-fill effect="light" hover="prmary">
                      <hl-icon> <two-edit /> </hl-icon>
                    </hl-button>
                  </template>
                </hl-popover>
                <hl-popover trigger="hover" content="删除" placement="top" tooltip>
                  <template #reference>
                    <hl-button type="primary" equal radius no-fill effect="light" hover="prmary">
                      <hl-icon> <two-delete /> </hl-icon>
                    </hl-button>
                  </template>
                </hl-popover>
              </hl-group>
            </template>
          </hl-simple-table>
        </hl-scrollbar>
        <template #footer>
          <hl-pagination layout="slot, prev, pager, next, jumper, sizes" :total="50" :gap="gapValue" :pager-gap="pagerGapValue" block class="w-full">
            <hl-group class="w-full" gap="var(--lg)">
              <hl-checkbox v-model="selectedAll" @change="selectAll" />
              <hl-group gap="var(--sm)">
                <hl-button type="primary" effect="light">批量删除</hl-button>
                <hl-button type="primary" effect="light">批量审核</hl-button>
              </hl-group>
            </hl-group>
          </hl-pagination>
        </template>
      </hl-panel>
    </hl-group>
  </hl-panel>
</template>


<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  setup() {
    const activeName = ref('first')

    const tableData = ref([
      {
        id: 1,
        color: 'primary',
        icon: 'server',
        title: 'Button 按钮',
        sub_title: 'HTML, JS, Scss',
        type: '表单',
        des: '钮组件也拥有统一的状态色，如：primary, danger 等',
        update: '2021-07-18',
      },
      {
        id: 2,
        color: 'warning',
        icon: 'Copy',
        title: 'Input 输入框',
        sub_title: 'HTML, JS, Scss',
        type: '表单',
        des: '通过鼠标或键盘输入内容，Input 为受控组件',
        update: '2021-07-18',
      },
      {
        id: 3,
        color: 'success',
        icon: 'Computer',
        title: 'Autocomplete 输入建议',
        sub_title: 'HTML, JS, Scss',
        type: '表单',
        des: 'autocomplete 是一个带输入建议的输入框组件',
        update: '2021-07-18',
      },
      {
        id: 4,
        color: 'danger',
        icon: 'Clock',
        title: 'InputNumber 计数器',
        sub_title: 'HTML, JS, Scss',
        type: '表单',
        des: '计数器由group容器和button、input组成',
        update: '2021-07-18',
      },
      {
        id: 5,
        color: 'info',
        icon: 'Camera',
        title: 'Select 选择器',
        sub_title: 'HTML, JS, Scss',
        type: '表单',
        des: '当选项过多时，使用下拉菜单展示并选择内容',
        update: '2021-07-18',
      },
      {
        id: 6,
        color: 'warning',
        icon: 'Box',
        title: 'Radio 单选框',
        sub_title: 'HTML, JS, Scss',
        type: '表单',
        des: '用于在多个备选项中选中单个状态',
        update: '2021-07-18',
      },
      {
        id: 7,
        color: 'danger',
        icon: 'Book',
        title: 'Checkbox 复选框',
        sub_title: 'HTML, JS, Scss',
        type: '表单',
        des: '使用checkbox来创建跨浏览器的复选框',
        update: '2021-07-18',
      },
      {
        id: 8,
        color: 'success',
        icon: 'Repository',
        title: 'Switch 开关',
        sub_title: 'HTML, JS, Scss',
        type: '表单',
        des: '表示两种相互对立的状态间的切换',
        update: '2021-07-18',
      },
      {
        id: 8,
        color: 'success',
        icon: 'Repository',
        title: 'Switch 开关',
        sub_title: 'HTML, JS, Scss',
        type: '表单',
        des: '表示两种相互对立的状态间的切换',
        update: '2021-07-18',
      },
      {
        id: 8,
        color: 'success',
        icon: 'Repository',
        title: 'Switch 开关',
        sub_title: 'HTML, JS, Scss',
        type: '表单',
        des: '表示两种相互对立的状态间的切换',
        update: '2021-07-18',
      },
      {
        id: 8,
        color: 'success',
        icon: 'Repository',
        title: 'Switch 开关',
        sub_title: 'HTML, JS, Scss',
        type: '表单',
        des: '表示两种相互对立的状态间的切换',
        update: '2021-07-18',
      },
    ])
    const cols = ref([
      { title: '#', slotName: 'tableIndex', headerSlotName: 'firstCol', width: '66px' },
      { title: '组件名称', prop: 'title' },
      { title: '类型', prop: 'type', width: '10%' },
      { title: '简介', prop: 'des' },
      { title: '更新日期', prop: 'update', width: '13%' },
      { title: '操作', slotName: 'handle', align: 'center', width: '10%' },
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
        fill: true,
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
        fill: true,
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
      fill: true,
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
