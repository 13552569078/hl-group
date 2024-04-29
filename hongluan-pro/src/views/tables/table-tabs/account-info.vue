<template>
  <hb-simple-table-list
    :cols="cols"
    :table-data="tableData"
    :pagination="pagination"
    :searchbar="searchbar"
    :toolbar="toolbar"
    :table-props="simpleTable"
    padding="var(--xl)"
    @row-click="rowClicked"
    @searchbar-change="searchbarChanged"
  >
    <template #toolbar-extra-before>
      <hl-group merge indent>
        <hl-radio v-model="displayType" label="list" custom title="表格展示">
          <hl-button effect="light" type="primary" equal>
            <hl-icon><two-table /></hl-icon>
          </hl-button>
        </hl-radio>
        <hl-radio v-model="displayType" label="chart" custom title="图形展示">
          <hl-button effect="light" type="primary" equal>
            <hl-icon><two-chart-pie /></hl-icon>
          </hl-button>
        </hl-radio>
      </hl-group>
    </template>
    <template #firstCol>
      <hl-checkbox v-model="selectedAll" :indeterminate="isIndeterminate" @change="selectAll" />
    </template>
    <template #tableIndex="{ row }">
      <hl-checkbox v-model="selectedRows" :show-label="false" :label="row.id" @change="selectRow(row.id)" />
    </template>

    <template #name="{ row }">
      <hb-data-collect full gap="var(--sm)" padding="0" align="items-middle">
        <hl-icon type="primary" effect="light" size="lg" fill round class="symbol static">
          <component :is="'fill-' + row.icon" />
        </hl-icon>
        <hl-group dir="vertical" full="full-x" class="content">
          <h6 class="title">{{ row.title }}</h6>
          <span class="sub-title">{{ row.sub_title }}</span>
        </hl-group>
      </hb-data-collect>
    </template>

    <template #handle>
      <hl-button type="link">修改</hl-button>
    </template>
  </hb-simple-table-list>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
export default defineComponent({
  setup() {
    const displayType = ref('list')
    const selectedAll = ref(false)
    const selectedRows = ref<any>([])
    const isIndeterminate = ref(false)
    const tableData = ref([
      { id: 1, color: 'primary', icon: 'server', title: 'lisi', sub_title: '@sohu', type: '手机', des: '用户测试目的', createdAt: '2021-07-18' },
      { id: 2, color: 'warning', icon: 'Copy', title: 'zhangsan', sub_title: '@sina', type: '邮箱', des: '用户开发目的', createdAt: '2021-07-18' },
      {
        id: 3,
        color: 'success',
        icon: 'Computer',
        title: 'zhaojiu',
        sub_title: '@alibaba',
        type: '邮箱',
        des: '用户测试目的',
        createdAt: '2021-07-18',
      },
      { id: 4, color: 'danger', icon: 'Clock', title: 'wangwu', sub_title: '@ceshi', type: '手机', des: '用户演示目的', createdAt: '2021-07-18' },
      { id: 5, color: 'info', icon: 'Camera', title: 'zhaoliu', sub_title: '@csdn', type: '手机', des: '用户展示目的', createdAt: '2021-07-18' },
      { id: 6, color: 'warning', icon: 'Box', title: 'fengqiang', sub_title: '@google', type: '邮箱', des: '用户培训目的', createdAt: '2021-07-18' },
      { id: 7, color: 'danger', icon: 'Book', title: 'jackma', sub_title: '@fb', type: '手机', des: '用户测试目的', createdAt: '2021-07-18' },
      { id: 8, color: 'success', icon: 'Repository', title: 'maqiang', sub_title: '@amazon', type: '手机', des: '用户测试目的', createdAt: '2021-07-18' },
    ])
    const cols = ref([
      { title: '#', slotName: 'tableIndex', headerSlotName: 'firstCol', width: '2%' },
      { title: '账号名称', slotName: 'name' },
      { title: '类型', prop: 'type', width: '10%' },
      { title: '简介', prop: 'des' },
      { title: '注册日期', prop: 'createdAt', width: '13%' },
      { title: '操作', slotName: 'handle', align: 'center', width: '10%' },
    ])
    const pagination = reactive({
      show: false,
      pageSize: 100,
      total: 400,
      currentPage: 1,
    })
    const searchbar = reactive({
      show: true,
      searcher: {
        placeholder: '请输入搜索条件',
        fill: true,
      },
      selector: {
        colCount: 'xl:count-4 lg:count-2 md:count-1',
        items: [
          {
            placeholder: '类型',
            value: '',
            name: 'type',
            fill: true,
            prop: {
              label: 'name',
              value: 'code',
            },
            options: [
              { name: '邮箱', code: 'email' },
              { name: '手机', code: 'phone' },
            ],
          },
          {
            placeholder: '注册日期',
            value: '',
            name: 'age',
            fill: true,
            options: [
              { label: '2010', value: '10' },
              { label: '2000', value: '00' },
              { label: '1990', value: '90' },
              { label: '1980', value: '80' },
            ],
          },
          {
            span: 'lg:col-span-2 md:col-span-1',
            type: 'timepicker',
            name: 'birthday',
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
    const toolbar = reactive({
      show: true,
      showSelectionText: true,
      selectionCount: 0,
      action: {
        show: false,
        showCount: 2,
        actions: [
          { label: '删除所有', type: 'danger', show: true },
          { label: '批量转移' },
          { label: '批量审定' },
          { label: '批量修改' },
          { label: '批量通过', type: 'primary' },
          { label: '其他' },
        ],
      },
    })
    const simpleTable = reactive({
      size: 'md',
      border: 'border-x',
      class: 'borderless-last',
    })
    const selectAll = () => {
      if (selectedAll.value) {
        selectedRows.value.splice(0, selectedRows.value.length)
        selectedRows.value.push(...tableData.value.map(d => d.id))
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

    return {
      searchbar,
      toolbar,
      pagination,
      selectedAll,
      selectedRows,
      simpleTable,
      tableData,
      cols,
      selectAll,
      selectRow,
      rowClicked,
      searchbarChanged,
      isIndeterminate,
      displayType,
    }
  },
})
</script>
