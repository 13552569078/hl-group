<template>
  <hl-panel class="table-panel">
    <template #header>
      <div class="panel-title"><h4>报警统计</h4></div>
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
        <hl-checkbox v-model="selectedRows" :label="row.id" :show-label="false" @change="selectRow(row.id)" />
      </template>

      <template #name="{ row }">
        <hb-data-collect gap="var(--sm)" padding="0">
          <hl-icon type="primary" effect="light" size="lg" fill radius class="symbol static">
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
        <div class="w-full"></div>
      </hl-pagination>
    </template>
  </hl-panel>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  setup() {
    const displayType = ref('list')
    const selectedAll = ref(false)
    const selectedRows = ref<any>([])
    const show = ref(selectedAll)
    const isIndeterminate = ref(false)
    const tableData = ref([
      {
        id: 1,
        color: 'primary',
        icon: 'server',
        title: 'xxx公司液体泄露',
        sub_title: '第一车间',
        type: 'IoT',
        des: '第一车间发生CO2泄露',
        update: '2021-07-18',
      },
      {
        id: 2,
        color: 'warning',
        icon: 'Copy',
        title: 'xxx工厂有色气体泄露',
        sub_title: '第一车间',
        type: 'IoT',
        des: '第一车间发生CO2泄露',
        update: '2021-07-18',
      },
      {
        id: 3,
        color: 'success',
        icon: 'Computer',
        title: '工业园区气体泄露',
        sub_title: '第一车间',
        type: 'Video',
        des: '第一车间发生CO2泄露',
        update: '2021-07-18',
      },
      {
        id: 4,
        color: 'danger',
        icon: 'Clock',
        title: 'xxx公司液体泄露',
        sub_title: '第一车间',
        type: 'IoT',
        des: '第一车间发生CO2泄露',
        update: '2021-07-18',
      },
      {
        id: 5,
        color: 'info',
        icon: 'Camera',
        title: 'xxx公司液体泄露',
        sub_title: '第一车间',
        type: 'Manul',
        des: '第一车间发生CO2泄露',
        update: '2021-07-18',
      },
      {
        id: 6,
        color: 'warning',
        icon: 'Box',
        title: 'xxx公司液体泄露',
        sub_title: '第一车间',
        type: 'IoT',
        des: '第一车间发生CO2泄露',
        update: '2021-07-18',
      },
      {
        id: 7,
        color: 'danger',
        icon: 'Book',
        title: 'xxx公司液体泄露',
        sub_title: '第一车间',
        type: 'IoT',
        des: '第一车间发生CO2泄露',
        update: '2021-07-18',
      },
      {
        id: 8,
        color: 'success',
        icon: 'Repository',
        title: 'xxx公司液体泄露',
        sub_title: '第一车间',
        type: 'Video',
        des: '第一车间发生CO2泄露',
        update: '2021-07-18',
      },
    ])
    const cols = ref([
      {
        title: '#',
        slotName: 'tableIndex',
        headerSlotName: 'firstCol',
        width: '2%',
      },
      { title: '警告名称', slotName: 'name' },
      { title: '类型', prop: 'type', width: '10%' },
      { title: '描述', prop: 'des' },
      { title: '告警日期', prop: 'update', width: '13%' },
      { title: '操作', slotName: 'handle', align: 'center', width: '10%' },
    ])
    const pagination = reactive({
      pageSize: 100,
      total: 400,
      currentPage: 1,
    })
    const simpleTable = reactive({
      size: 'md',
      border: 'borderless-last',
    })
    const searchbar = reactive({
      show: true,
      searcher: {
        placeholder: '请输入搜索条件',
        fill: true,
        block: true,
      },
      selector: {
        colCount: 'xl:count-4 lg:count-2 md:count-1',
        items: [
          {
            placeholder: '警告类型',
            value: '',
            name: 'prop1',
            fill: true,
            prop: {
              label: 'name',
              value: 'code',
            },
            options: [
              { name: '火警', code: 'fire' },
              { name: '泄露', code: 'leak' },
            ],
          },
          {
            placeholder: '告警来源',
            value: '',
            name: 'prop2',
            fill: true,
            options: [
              { label: 'IoT监控', value: 'iot' },
              { label: '视频监控', value: 'vidoe' },
              { label: '手工', value: 'manul' },
            ],
          },
        ],
      },
    })
    const toolbar = reactive({
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
          { label: '批量通过' },
          { label: '其他' },
        ],
      },
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
    const handleSizeChange = (size: number) => {
      pagination.pageSize = size
    }
    const handleCurrentChange = (current: number) => {
      pagination.currentPage = current
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
      handleSizeChange,
      handleCurrentChange,
      show,
      isIndeterminate,
      displayType,
    }
  },
})
</script>
