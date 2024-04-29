<template>
  <hl-panel class="table-panel w-full">
    <template #header>
      <div class="panel-title"><h4>消息列表</h4></div>
      <div class="panel-header-right"></div>
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
      <template #toolbar-extra>
        <hl-group merge indent>
          <hl-radio v-model="radio" label="1" custom>
            <hl-button effect="light" type="primary" equal>
              <template #icon>
                <hl-icon><two-table /></hl-icon>
              </template>
            </hl-button>
          </hl-radio>

          <hl-radio v-model="radio" label="2" custom>
            <hl-button effect="light" type="primary" equal>
              <template #icon>
                <hl-icon><two-chart-pie /></hl-icon>
              </template>
            </hl-button>
          </hl-radio>
        </hl-group>
      </template>
      <template #firstCol="{ col }">
        <hl-checkbox v-model="selectedAll" :indeterminate="isIndeterminate" @change="selectAll" />
      </template>
      <template #tableIndex="{ row }">
        <hl-checkbox v-model="selectedRows" :label="row.id" @change="selectRow(row.id)">{{ '' }}</hl-checkbox>
      </template>

      <template #name="{ row }">
        <router-link to="/inbox/detail">
          <hb-data-collect gap="var(--sm)" padding="0">
            <hl-icon type="primary" effect="light" size="lg" fill radius class="static">
              <component :is="'fill-' + row.icon" />
            </hl-icon>
            <hl-group dir="vertical" full="full-x">
              <h6 class="title">{{ row.title }}</h6>
              <span class="sub-title">{{ row.sub_title }}</span>
            </hl-group>
          </hb-data-collect>
        </router-link>
      </template>

      <template #handle="{ row }">
        <hl-button type="link">修改</hl-button>
      </template>
    </hb-simple-table-list>

    <template #footer>
      <hl-pagination
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="sizes, total, slot, prev, pager, next, jumper"
        :total="400"
        align="items-between"
        class="full"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
        <div style="width: 100%"></div>
      </hl-pagination>
    </template>
  </hl-panel>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
export default defineComponent({
  setup() {
    const radio = ref('')
    const selectedAll = ref(false)
    const selectedRows = ref([])
    const show = ref(selectedAll)
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
      {
        title: '#',
        slotName: 'tableIndex',
        headerSlotName: 'firstCol',
        width: '2%',
      },
      { title: '组件名称', slotName: 'name' },
      { title: '类型', prop: 'type', width: '10%' },
      { title: '简介', prop: 'des' },
      { title: '更新日期', prop: 'update', width: '13%' },
      { title: '操作', slotName: 'handle', align: 'center', width: '10%' },
    ])
    const pagination = reactive({
      show: false,
      pageSize: 10,
      total: 100,
      currentPage: 1,
    })
    const simpleTable = reactive({
      size: 'md',
      border: 'border-x',
      class: 'borderless-last',
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
            placeholder: '下拉测试',
            value: '4',
            name: 'prop2',
            fill: true,
            options: [
              { label: '已驳回3', value: '3' },
              { label: '已审定4', value: '4' },
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
    const rowClicked = (row, rowIndex, event) => {
      console.log('rowClicked', row, rowIndex, event)
    }
    const searchbarChanged = (...args) => {
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
      show,
      isIndeterminate,
      radio,
    }
  },
})
</script>
