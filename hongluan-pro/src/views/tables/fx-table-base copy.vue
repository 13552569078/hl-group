<template>
  <hl-panel class="full-page bg-transparent" full-body borderless padding="0" panel-header="">
    <template #header>
      <hl-group full block class="bg-content border-top border-primary m-b-lg" gap="var(--xxl)" style="padding: calc(var(--xxs) * 5)">
        <hl-form
          :model="formInline"
          :width="['6em', 'col']"
          :label-position="['items-right', 'items-top']"
          style="--row-gap-y: var(--md); --row-gap-x: var(--md)"
          class="hl-row grid grid-direction-vertical lg:count-2 xxl:count-4"
        >
          <hl-form-item label="事件名称" class="gap-md">
            <hl-input v-model="formInline.name" placeholder="事件名称" block />
          </hl-form-item>
          <hl-form-item label="事件类型" class="gap-md">
            <hl-select v-model="formInline.type" placeholder="事件类型" block>
              <hl-option label="重大突发事件" value="1" />
              <hl-option label="重大活动" value="2" />
            </hl-select>
          </hl-form-item>
          <hl-form-item label="发生时间" class="gap-md lg:col-span-2">
            <hl-date-picker
              v-model="formInline.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              block
            />
          </hl-form-item>
        </hl-form>
        <hl-group align="items-middle items-right" class="static w-lg" gap="var(--md)">
          <hl-button class="w-xs">重置</hl-button>
          <hl-button type="primary" class="gradual-button w-xs" @click="onSubmit">查询</hl-button>
        </hl-group>
      </hl-group>
    </template>
    <hl-panel class="h-full table-page" full-body>
      <template #header>
        <div class="panel-header-left">
          <hl-tabs v-model="activeName" type="line" :show-pane="false">
            <hl-tab-pane label="个人信息" name="person" />
            <hl-tab-pane label="账户信息" name="account" />
            <hl-tab-pane label="邮箱列表" name="email" />
          </hl-tabs>
        </div>
        <div class="panel-title"><h4></h4></div>
        <div class="panel-header-right">
          <hl-group gap="var(--sm)">
            <hl-button type="primary" class="gradual-button" icon-position="left" style="--button-height: calc(var(--xs) * 6); --button-padding-x: calc(var(--xs) * 2); --form-icon-size: var(--xl);">
              新增干部信息
              <template #icon>
                <hl-icon>
                  <svg viewBox="0 0 32 32">
                    <defs>
                      <linearGradient id="linearGradient-1" x1="50%" y1="0%" x2="50%" y2="99.889147%">
                        <stop stop-color="#FFFFFF" offset="0%" />
                        <stop stop-color="#BAE0FF" offset="100%" />
                      </linearGradient>
                    </defs>
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <rect fill-opacity="0.01" fill="#FFFFFF" x="0" y="0" width="32" height="32" />
                      <path d="M26,3 L26,30 L6,30 L6,3 L26,3 Z M17.5,12 L15.5,12 L15.5,15.5 L12,15.5 L12,17.5 L15.5,17.5 L15.5,21 L17.5,21 L17.5,17.5 L21,17.5 L21,15.5 L17.5,15.5 L17.5,12 Z" fill-opacity="0.5" fill="#FFFFFF" />
                      <path d="M29,9 L29,28 L3,28 L3,9 L29,9 Z M17.5,12 L15.5,12 L15.5,15.5 L12,15.5 L12,17.5 L15.5,17.5 L15.5,21 L17.5,21 L17.5,17.5 L21,17.5 L21,15.5 L17.5,15.5 L17.5,12 Z" fill-opacity="0.3" fill="#FFFFFF" />
                      <path d="M27,2 L27,30 L5,30 L5,11.991862 L13.0142796,2 L27,2 Z M17.5,12 L15.5,12 L15.5,15.5 L12,15.5 L12,17.5 L15.5,17.5 L15.5,21 L17.5,21 L17.5,17.5 L21,17.5 L21,15.5 L17.5,15.5 L17.5,12 Z" fill="url(#linearGradient-1)" />
                    </g>
                  </svg>
                </hl-icon>
              </template>
            </hl-button>
          </hl-group>
        </div>
      </template>
      <hl-scrollbar>
        <hl-simple-table border="border-x" fixed-header padding="var(--sm)" :cols="cols" :data="tableData">
          <template #firstCol>
            <hl-checkbox v-model="selectedAll" @change="selectAll" />
          </template>
          <template #tableIndex="{ row }">
            <hl-checkbox v-model="selectedRows" :label="row.id" @change="selectRow(row.id)">
              {{ '' }}
            </hl-checkbox>
          </template>
          <template #id="{ row }">
            <span class="text-light">{{ row.id }}</span>
          </template>
          <template #name="{ row }">
            {{ row.title }}
          </template>
          <template #handle>
            <hl-group gap="var(--xxs)">
              <span>
                <hl-button type="link">编辑</hl-button>
                <hl-button type="link">删除</hl-button>
              </span>
            </hl-group>
          </template>
        </hl-simple-table>
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
          <div class="w-full"></div>
        </hl-pagination>
      </template>
    </hl-panel>
  </hl-panel>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

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
  { title: '', slotName: 'id', width: '3em' },
  { title: '#', slotName: 'tableIndex', headerSlotName: 'firstCol', width: 'calc(var(--xxs) * 15.5)' },
  { title: '组件名称', slotName: 'name' },
  { title: '类型', prop: 'type', width: '10%' },
  { title: '简介', prop: 'des' },
  { title: '更新日期', prop: 'update', width: '13%' },
  { title: '操作', slotName: 'handle', align: 'center', width: '10em' },
])

const selectedAll = ref(false)
const selectedRows = ref<any>([])
const activeName = ref('person')

const isIndeterminate = ref(false)

const pagination = reactive({
  pageSize: 100,
  total: 400,
  currentPage: 1,
  show: false,
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
const handleSizeChange = (size: number) => {
  pagination.pageSize = size
}
const handleCurrentChange = (current: number) => {
  pagination.currentPage = current
}

const formInline = ref({
  name: '',
  type: '',
  date: '',
})
const onSubmit = () => {
  console.log('submit!')
}

</script>
