<template>
  <fx-page-table-v2
    ref="tableRef"
    :cols="cols"
    :table-data="tableData"
    :search-items="searchItems"
    :data-fetcher="getData"
    :table-props="tableProps"
    @sort-change="sortChange"
  >
    <template #checkbox1>
      <span class="m-r-md">自定义Slot：</span>
      <hl-checkbox v-model="checked1" :label="1" bold>备选项</hl-checkbox>
      <hl-checkbox v-model="checked1" :label="2" bold>备选项</hl-checkbox>
      <hl-checkbox v-model="checked1" :label="0">未加粗</hl-checkbox>
    </template>
    <template #customExpand="{ row }">
      <span style="margin-left: 300px;">{{ row.title }} 我是展开自定义</span>
    </template>
    <!-- 行点击详情插槽 -->
    <template #detail="{ row }">
      <a href="javascript:">{{ row.title }}</a>
    </template>
    <template #status="{ row }">
      <a href="javascript:">{{ row.status }}</a>
    </template>
    <template #trainType="{ searchForm }">
      <hl-checkbox-group v-model="searchForm['trainType']" dir="horizontal" gap="var(--md)" wrap>
        <hl-checkbox :label="1">类型1</hl-checkbox>
        <hl-checkbox :label="2">类型2</hl-checkbox>
        <hl-checkbox :label="3">类型3</hl-checkbox>
      </hl-checkbox-group>
    </template>
    <template #toolbar-extra-after>
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
                <rect
                  fill-opacity="0.01"
                  fill="#FFFFFF"
                  x="0"
                  y="0"
                  width="32"
                  height="32"
                />
                <path d="M26,3 L26,30 L6,30 L6,3 L26,3 Z M17.5,12 L15.5,12 L15.5,15.5 L12,15.5 L12,17.5 L15.5,17.5 L15.5,21 L17.5,21 L17.5,17.5 L21,17.5 L21,15.5 L17.5,15.5 L17.5,12 Z" fill-opacity="0.5" fill="#FFFFFF" />
                <path d="M29,9 L29,28 L3,28 L3,9 L29,9 Z M17.5,12 L15.5,12 L15.5,15.5 L12,15.5 L12,17.5 L15.5,17.5 L15.5,21 L17.5,21 L17.5,17.5 L21,17.5 L21,15.5 L17.5,15.5 L17.5,12 Z" fill-opacity="0.3" fill="#FFFFFF" />
                <path d="M27,2 L27,30 L5,30 L5,11.991862 L13.0142796,2 L27,2 Z M17.5,12 L15.5,12 L15.5,15.5 L12,15.5 L12,17.5 L15.5,17.5 L15.5,21 L17.5,21 L17.5,17.5 L21,17.5 L21,15.5 L17.5,15.5 L17.5,12 Z" fill="url(#linearGradient-1)" />
              </g>
            </svg>
          </hl-icon>
        </template>
      </hl-button>
    </template>
  </fx-page-table-v2>
</template>
<script>
import { defineComponent, ref, reactive, watch } from 'vue'

const LIST_DATA = {
  title: '2021年xx电工作业',
  companyName: '某某某企业',
  areaName: '金湖县',
  person: '李晓忠',
  status: '已完成',
}

export default defineComponent({
  setup () {
    const tableData = ref([])
    tableData.value = new Array(10).fill('').map((_, i) => { return { ...LIST_DATA, id:i + 1 } })
    const cols = ref([
      {
        title: '',
        width: '4em',
        align: 'center',
        expand: { slotName: 'customExpand', hideLabel: false },
      },
      {
        title: '序号',
        align: 'center',
        slotName: 'tableIndex',
        prop: 'tableIndex',
        width: '4em',
      },
      { title: '培训主题', slotName: 'detail', prop: 'title', sortable: true, width: '16em' },
      { title: '企业名称', prop: 'companyName', width: '16em' },
      { title: '所属区域', prop: 'areaName', width: '16em' },
      { title: '企业培训负责人', prop: 'person', width: '8em' },
      { title: '完成状态', slotName: 'status', prop: 'status', width: '8em', align: 'center', fixed: 'right' },
    ])

    const searchItems = reactive([
      {
        type: 'select',
        label: '企业所属区域',
        placeholder: '企业所属区域',
        value: '',
        name: 'area',
        prop: {
          label: 'name',
          value: 'code',
        },
        options: [
          { name: '清江浦区', code: '10000' },
        ],
      },
      {
        type: 'select',
        label: '企业所属行业',
        placeholder: '企业所属行业',
        value: ['Java1', 'Java'],
        name: 'industry',
        multiple: true,
        prop: {
          label: 'name',
          value: 'code',
        },
        options: [
          { name: '软件', code: 'Java' },
          { name: '软件2', code: 'Java1' },
          { name: '软件3', code: 'Java2' },
          { name: '软件4', code: 'Java3' },
        ],
      },
      {
        type: 'input',
        label: '企业名称',
        placeholder: '企业名称',
        value: '',
        name: 'companyName',
      },
      {
        type: 'datetime',
        label: '培训time',
        placeholder: '培训time',
        value: '',
        name: 'trainTime',
      },
      {
        type: 'datetimerange',
        label: '培训timeRange',
        placeholder: '培训timerange',
        value: [],
        name: 'trainTimeRange',
      },
      {
        type: 'slot',
        slotName: 'trainType',
        label: '培训类型',
        value: '',
        name: 'trainType',
        display: item => {
          console.log('item:', item)
          return '类型1，类型2'
        },
      },
    ])
    const selectionActions = reactive(
      [
        { label: '删除所有', icon: 'TwoDel', noFill: false, show: true, onClick: () => { alert(rowKeys.value) } },
        // { label: '批量转移', icon: 'TwoFolderIn', noFill: true, show: true },
        // { label: '批量审定', icon: 'TwoExamine' },
        // { label: '批量修改', icon: 'TwoEdit' },
        // { label: '批量通过', icon: 'TwoCircleCheck' },
      ],
    )

    const showDetail = row => {
      console.log('添加路由去详情页' + row)
    }

    const getData = ({ pageSize, currentPage, params, setTotal }) => {
      console.log(pageSize, currentPage, params)
      console.log('这里调用接口，返回的列表总数需要回调调用setTotal(totalRow)')
      // example 这里是接口案例
      // const result = await apiGeologicObj.postFindRiskGeologicHazardPageGeologic({
      //   pageSize,
      //   currentPage,
      //   resName: params.search,
      //   ...params
      // });
      // if (+result.code === 0) {
      //   tableData.value = result.data.list; 注意这里
      //   setTotal(+result.data.totalRow); 注意这里
      // }
      tableData.value = new Array(10).fill('').map((_, i) => { return { ...LIST_DATA, id: Math.random() } })
      setTotal(100)
    }

    const defaultPagination = { pageSize:10, currentPage:1, total: 0 }

    // 自定义手动触发
    const checked1 = ref(false)
    const tableRef = ref()
    watch(checked1, () => {
      tableRef.value.searchSlotChanged({ checked1: checked1.value })
    })
    const tableProps = reactive({
      'row-class-name': ({ row, rowIndex }) => {
        console.log('行', row)
        if (rowIndex === 1) {
          return 'bg-warning opacity-4'
        } else if (rowIndex === 3) {
          return 'bg-info opacity-3'
        }
        return ''
      },
    })
    const tableRowClassName = ({ rowIndex }) => {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    }

    const sortChange = (prop, sort) => {
      console.log(prop, sort)
    }

    return {
      cols,
      tableData,
      searchItems,
      selectionActions,
      showDetail,
      defaultPagination,
      getData,
      checked1,
      tableRef,
      tableProps,
      tableRowClassName,

      sortChange,
    }
  },
})
</script>
