<template>
  <hl-panel class="table-panel full-page" full-body>
    <template #header>
      <div class="panel-title"><h4>基础表单</h4></div>
      <div class="panel-header-right">
        <hb-data-filter ref="dataFilterRef" class="m-r-xl" :items="searchItems" gap="var(--sm)" max-height="calc(var(--xxl) * 14)" @search="searchChanged" @removeSelectedItem="removeSelectedItem">
          <template #checkbox>
            <hl-checkbox-group v-model="boxVals" @change="boxChanged">
              <hl-checkbox label="1">选项1</hl-checkbox>
              <hl-checkbox label="2">选项2</hl-checkbox>
              <hl-checkbox label="3">选项3</hl-checkbox>
            </hl-checkbox-group>
          </template>
        </hb-data-filter>
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
    <hl-scrollbar>
      <hl-simple-table class="borderless-last" border="border-x" padding="var(--xl)" fixed-header hover stripe :cols="cols" :data="tableData" @row-click="rowClicked" @cell-click="cellClicked">
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
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
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

    const selectedAll = ref(false)
    const selectedRows = ref([])

    const selectAll = () => {
      if (selectedAll.value) {
        selectedRows.value.splice(0, selectedRows.value.length)
        selectedRows.value.push(...tableData.value.map((d) => d.id))
      } else {
        selectedRows.value.splice(0, selectedRows.value.length)
      }
    }
    const selectRow = () => {
      selectedAll.value = selectedRows.value.length === tableData.value.length
    }
    const rowClicked = (row: any, rowIndex: any, event: any) => {
      console.log('rowClicked', row, rowIndex, event)
    }
    const cellClicked = (row: any, col: any, rowIndex: any, colIndex: any, event: any) => {
      console.log('cellClicked', row, col, rowIndex, colIndex, event)
    }

    // 数据筛选
    const dataFilterRef = ref(null)
    const boxVals = ref([])
    const searchItems = [
      {
        type: 'select',
        label: '企业类型',
        placeholder: '下拉测试',
        value: '4',
        name: 'prop1',
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
        label: '查询日期',
        type: 'daterange',
        name: 'prop2',
        value: [],
        placeholder: '请选择日期',
        display: () => 'date1~date2',
      },
      {
        type: 'input',
        label: '企业名称',
        placeholder: '请输入关键字查询',
        value: '',
        name: 'prop3',
      },
    ]

    const searchChanged = (urlParams: any, mapParams: any, originalParams: any) => {
      console.log(urlParams, mapParams, originalParams)
    }

    return {
      tableData,
      cols,
      selectedAll,
      selectedRows,
      selectAll,
      selectRow,
      rowClicked,
      cellClicked,

      boxVals,
      dataFilterRef,
      searchItems,
      searchChanged,
    }
  },
})
</script>
