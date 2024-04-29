<template>
  <hl-panel class="table-panel full-page" full-body>
    <template #header>
      <div class="panel-title"><h4>基础表单</h4></div>
      <div class="panel-header-right">
      </div>
    </template>
    <hl-group dir="vertical" full class="h-full">
      <hl-group full class="border-bottom static md:flex-row flex-col md:gap-xxl gap-md" align="items-bottom" style="padding: var(--lg) var(--xl)">
        <hl-row layout="grid" count="md:count-2 lg:count-4" gap-x="var(--lg)" gap-y="var(--sm)" class="w-full">
          <hl-col span="col">
            <hl-input v-model="formInline.name" placeholder="事件名称" block fill />
          </hl-col>
          <hl-col span="col">
            <hl-select v-model="formInline.type" placeholder="事件类型" block fill>
              <hl-option label="重大突发事件" value="1" />
              <hl-option label="重大活动" value="2" />
            </hl-select>
          </hl-col>
          <hl-col span="col md:col-span-2">
            <hl-date-picker v-model="formInline.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" block fill />
          </hl-col>
        </hl-row>
        <hl-group align="items-middle items-right" class="w-lg" gap="var(--md)">
          <hl-button class="w-xs">重置</hl-button>
          <hl-button type="primary" class="gradual-button w-xs">查询</hl-button>
        </hl-group>
      </hl-group>
      <hl-group full class="overflow-hidden">
        <hl-scrollbar>
          <hl-simple-table class="borderless-last" border="border-x" padding="var(--xl)" fixed-header hover :cols="cols" :data="tableData" @row-click="rowClicked" @cell-click="cellClicked">
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
                <hl-button type="primary" no-fill effect="light" hover="prmary">编辑</hl-button>
                <hl-button type="primary" no-fill effect="light" hover="prmary">删除</hl-button>
              </hl-group>
            </template>
          </hl-simple-table>
        </hl-scrollbar>
      </hl-group>
    </hl-group>
    <template #footer>
      <hl-pagination layout="slot, prev, pager, next, jumper, sizes" :total="50" :gap="gapValue" :pager-gap="pagerGapValue" block class="w-full">
        <hl-group class="w-full" gap="var(--lg)">
          <hl-checkbox v-model="selectedAll" @change="selectAll" />
          <hl-group gap="var(--sm)">
            <hl-button type="danger" effect="light">批量删除</hl-button>
            <hl-button type="primary" effect="light">批量审核</hl-button>
          </hl-group>
        </hl-group>
      </hl-pagination>
    </template>
  </hl-panel>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

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

const formInline = ref({
  name: '',
  type: '',
  date: '',
})

</script>
