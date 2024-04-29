<template>
  <hl-group full class="full-page" gap="var(--lg)">
    <hl-panel class="table-panel h-full static w-xl" full-body borderless>
      <template #header>
        <div class="panel-title">
          <h4>组织机构</h4>
        </div>
        <div class="panel-header-right">
          <hl-button no-fill equal>
            <hl-icon>
              <two-more />
            </hl-icon>
          </hl-button>
        </div>
      </template>
      <hl-scrollbar>
        <hl-tree :data="orgData" :props="defaultProps" class="p-x-lg" gap="0" default-expand-all draggable @node-click="handleNodeClick">
          <template #default="{ node }">
            <span class="tree-node-label">
              {{ node.label }}
            </span>
          </template>
        </hl-tree>
      </hl-scrollbar>
      <template #footer> </template>
    </hl-panel>

    <hl-panel class="table-panel h-full w-xl" full-body>
      <template #header>
        <div class="panel-header-left">
          <hl-tabs v-model="activeName" type="line" :show-pane="false" style="flex-grow: 1" nav-height="calc(var(--xxs) * 18)">
            <hl-tab-pane label="机构信息" name="first" />
            <hl-tab-pane label="机构账户" name="second" />
            <hl-tab-pane label="机构人员" name="third" />
            <hl-tab-pane label="所属机构设备" name="last" />
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
      <hl-scrollbar>
        <hb-simple-table-list
          :cols="cols"
          :table-data="tableData"
          :pagination="pagination"
          :searchbar="searchbar"
          :toolbar="toolbar"
          :table-props="tableProps"
          padding="var(--xl)"
          @row-click="rowClicked"
          @searchbar-change="searchbarChanged"
        >
          <template #toolbar-extra-before>
            <hl-group merge indent>
              <hl-radio v-model="displayType" label="list" custom title="表格展示">
                <hl-button effect="light" type="primary" equal>
                  <hl-icon>
                    <two-table />
                  </hl-icon>
                </hl-button>
              </hl-radio>
              <hl-radio v-model="displayType" label="chart" custom title="图形展示">
                <hl-button effect="light" type="primary" equal>
                  <hl-icon>
                    <two-chart-pie />
                  </hl-icon>
                </hl-button>
              </hl-radio>
            </hl-group>
          </template>
          <template #firstCol>
            <hl-checkbox v-model="selectedAll" :indeterminate="isIndeterminate" :show-label="false" @change="selectAll" />
          </template>
          <template #tableIndex="{ row }">
            <hl-checkbox v-model="selectedRows" :label="row.id" :show-label="false" @change="selectRow(row.id)" />
          </template>

          <template #name="{ row }">
            <a href="">{{ row.title }}</a>
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
        </hb-simple-table-list>
      </hl-scrollbar>
      <template #footer>
        <hl-pagination
          :current-page="pagination.currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="pagination.pageSize"
          layout="sizes, total, slot, prev, pager, next, jumper"
          :total="pagination.total"
          align="items-between"
          class="full"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
          <div style="width: 100%"></div>
        </hl-pagination>
      </template>
    </hl-panel>
  </hl-group>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
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

    const displayType = ref('list')
    const selectedAll = ref(false)
    const selectedRows = ref<any>([])
    const activeName = ref('first')

    const isIndeterminate = ref(false)
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
    ])
    const cols = ref([
      {
        title: '#',
        slotName: 'tableIndex',
        headerSlotName: 'firstCol',
        width: '70px',
      },
      { title: 'ID', prop: 'id' },
      { title: '组件名称', slotName: 'name', width: '500px' },
      { title: '类型', prop: 'type', width: '500px' },
      { title: '更新日期', prop: 'update', width: '500px' },
      { title: '操作', slotName: 'handle', align: 'center', width: '10%', fixed: 'right' },
    ])
    const pagination = reactive({
      pageSize: 100,
      total: 400,
      currentPage: 1,
      show: false,
    })
    const searchbar = reactive({
      show: false,
      searcher: {
        placeholder: '请输入搜索条件',
        fill: true,
      },
      selector: {
        colCount: 'xl:count-4 lg:count-2 md:count-1',
        items: [
          {
            placeholder: '下拉测试',
            value: '4',
            name: 'prop1',
            fill: true,
            prop: {
              label: 'name',
              value: 'code',
            },
            options: [
              { name: '已驳回3', code: '3' },
              { name: '已审定4', code: '4' },
            ],
          },
          {
            placeholder: '下拉测试',
            value: '4',
            name: 'prop2',
            fill: true,
            options: [
              { label: '已驳回3', value: '3' },
              { label: '已审定4', value: '4' },
            ],
          },
          {
            span: 'lg:col-span-2 md:col-span-1',
            type: 'timepicker',
            name: 'prop5',
            fill: true,
            value: [],
            'is-range': true,
            'range-separator': '至',
            'start-placeholder': '开始时间',
            'end-placeholder': '结束时间',
            placeholder: '选择时间范围',
          },
        ],
      },
    })
    const tableProps = reactive({
      size: 'md',
      border: 'border-x',
      class: 'borderless-last',
    })
    const toolbar = reactive({
      showSelectionText: true,
      selectionCount: 0,
      action: {
        show: false,
        showCount: 2,
        actions: [
          { label: '删除所有', icon: 'Star', type: '', show: true },
          { label: '批量转移' },
          { label: '批量审定', icon: 'Star' },
          { label: '批量修改' },
          { label: '批量通过' },
          { label: '其他' },
        ],
      },
    })

    const selectAll = () => {
      if (selectedAll.value) {
        selectedRows.value.splice(0, selectedRows.value.length)
        selectedRows.value.push(...tableData.value.map((d) => d.id))
        toolbar.showSelectionText = true
        toolbar.action.show = true
        toolbar.selectionCount = selectedRows.value.length
        isIndeterminate.value = false
      } else {
        selectedRows.value.splice(0, selectedRows.value.length)
        toolbar.showSelectionText = true
        toolbar.action.show = false
        toolbar.selectionCount = 0
      }
    }
    const selectRow = () => {
      selectedAll.value = selectedRows.value.length === tableData.value.length
      toolbar.showSelectionText = true
      toolbar.action.show = selectedRows.value.length > 0
      toolbar.selectionCount = selectedRows.value.length
      if (selectedRows.value.length > 0 && selectedAll.value == false) {
        isIndeterminate.value = true
      } else {
        isIndeterminate.value = false
      }
    }
    const rowClicked = (row: any, rowIndex: number, event: any) => {
      console.log('rowClicked', row, rowIndex, event)
    }
    const searchbarChanged = (...args: any[]) => {
      console.log('searchbarChanged', ...args)
    }
    const handleSizeChange = (size: number) => {
      pagination.pageSize = size
    }
    const handleCurrentChange = (current: number) => {
      pagination.currentPage = current
    }
    return {
      orgData,
      defaultProps,
      handleNodeClick,
      searchbar,
      toolbar,
      pagination,
      selectedAll,
      selectedRows,
      tableData,
      cols,
      selectAll,
      selectRow,
      rowClicked,
      searchbarChanged,
      isIndeterminate,
      displayType,
      tableProps,
      activeName,
      handleSizeChange,
      handleCurrentChange,
    }
  },
})
</script>

<style lang="scss">
</style>
