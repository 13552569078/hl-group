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
      { id: 1, color: 'primary', icon: 'server', title: 'zhangsan@sina.com', provider: '搜狐', des: '用于测试目的', createdAt: '2021-07-18' },
      { id: 2, color: 'warning', icon: 'Copy', title: 'lisi@chinren.com', provider: '搜狐', des: '用于开发目的', createdAt: '2021-07-18' },
      {
        id: 3,
        color: 'success',
        icon: 'Computer',
        title: 'zhaojiu@google.com',
        provider: '谷歌',
        des: '用于演示目的',
        createdAt: '2021-07-18',
      },
      { id: 4, color: 'danger', icon: 'Clock', title: 'wangwu@fb.com', provider: '脸书', des: '用于用户演示目的', createdAt: '2021-07-18' },
      { id: 5, color: 'info', icon: 'Camera', title: 'zaoliu@sohu.com', provider: '搜狐', des: '用于用户培训目的', createdAt: '2021-07-18' },
      { id: 6, color: 'warning', icon: 'Box', title: 'fengqiang@qq.com', provider: '腾讯', des: '用于测试目的', createdAt: '2021-07-18' },
      { id: 7, color: 'danger', icon: 'Book', title: 'laoma@126.com', provider: '网易', des: '用于测试目的', createdAt: '2021-07-18' },
      { id: 8, color: 'success', icon: 'Repository', title: 'xiaozhang@163.com', provider: '网易', des: '用于测试目的', createdAt: '2021-07-18' },
    ])
    const cols = ref([
      { title: '#', slotName: 'tableIndex', headerSlotName: 'firstCol', width: '2%' },
      { title: '邮件地址', slotName: 'name' },
      { title: '服务商', prop: 'provider', width: '10%' },
      { title: '用途', prop: 'des' },
      { title: '创建日期', prop: 'createdAt', width: '13%' },
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
            placeholder: '服务商',
            value: '',
            name: 'provider',
            fill: true,
            prop: {
              label: 'name',
              value: 'code',
            },
            options: [
              { name: '新浪', code: 'sina' },
              { name: '网易', code: 'netease' },
              { name: '腾讯', code: 'qq' },
              { name: '搜狐', code: 'sohu' },
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
