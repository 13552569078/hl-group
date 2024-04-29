<template>
  <hl-panel class="table-panel full-page" full-body>
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
    <hl-group full class="h-full">
      <hl-group dir="vertical" full class="w-xl static border-right scrollable">
        <hl-group full class="p-x-xl p-y-lg">
          <hl-button>固定在上面的按钮</hl-button>
        </hl-group>
        <hl-scrollbar>
          <hl-tree :data="orgData" :props="defaultProps" gap="0" default-expand-all draggable class="p-x-xl" @node-click="handleNodeClick">
            <template #default="{ node }">
              <span class="tree-node-label">
                {{ node.label }}
              </span>
            </template>
          </hl-tree>
        </hl-scrollbar>
        <hl-group full class="p-x-xl p-y-lg">
          <hl-button>固定在下面的按钮</hl-button>
        </hl-group>
      </hl-group>
      <hl-panel class="table-panel" footer-class="p-y-lg p-x-xl border-top" style="box-shadow: none" full-body>
        <hl-group full dir="vertical" class="h-full">
          <hb-table-searchbar class="p-x-xl p-y-lg border-bottom" :selector="selector" :searcher="searcher" padding="0" gap="var(--md)" />
          <hl-scrollbar>
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
                        <hl-icon>
                          <two-edit />
                        </hl-icon>
                      </hl-button>
                    </template>
                  </hl-popover>
                  <hl-popover trigger="hover" content="删除" placement="top" tooltip>
                    <template #reference>
                      <hl-button type="primary" equal radius no-fill effect="light" hover="prmary">
                        <hl-icon>
                          <two-delete />
                        </hl-icon>
                      </hl-button>
                    </template>
                  </hl-popover>
                </hl-group>
              </template>
            </hl-simple-table>
          </hl-scrollbar>
        </hl-group>
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
      activeName,
      tableData,
      cols,
      pagination,
      searcher,
      selector,
      orgData,
      defaultProps,
      handleNodeClick,
    }
  },
})
</script>

<style lang="scss">
</style>
