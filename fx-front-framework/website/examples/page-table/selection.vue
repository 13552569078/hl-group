<template>
  <hl-panel
    borderless
    padding="var(--xl)"
    body-padding="0"
    body-class="m-t-lg"
  >
    <fx-page-table
      ref="tableRef"
      :cols="cols"
      :table-data="tableData"
      :search-items="searchItems"
      :data-fetcher="getData"
      :selection-actions="selectionActions"
      :default-pagination="defaultPagination"
      right-search-height="400px"
      search-placement="right"
      @selected-row-keys="selectedRowKeys"
    >
      <template #customExpand="{ row }">
        <span style="margin-left: 300px;">{{ row.id }} 我是展开自定义</span>
      </template>
      <!-- 行点击详情插槽 -->
      <template #detail="{ row }">
        <a href="javascript:">{{ row.title }}</a>
      </template>
    </fx-page-table>
  </hl-panel>
</template>
<script>
import { defineComponent, ref, reactive } from 'vue'

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
    tableData.value = new Array(5).fill('').map((_, i) => { return { ...LIST_DATA, id:i + 1 + '' } })
    const cols = ref([
      { title: '#', slotName: 'tableSelection', headerSlotName: 'selectionCol' },
      { title: '培训主题', slotName: 'detail', prop: 'title' },
      { title: '企业名称', prop: 'companyName' },
      { title: '所属区域', prop: 'areaName' },
      { title: '企业培训负责人', prop: 'person' },
      { title: '完成状态', prop: 'status' },
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
        value: '',
        name: 'industry',
        prop: {
          label: 'name',
          value: 'code',
        },
        options: [
          { name: '软件', code: 'Java' },
        ],
      },
      {
        type: 'select',
        label: '培训完成状态',
        placeholder: '培训完成状态',
        value: '',
        name: 'status',
        prop: {
          label: 'name',
          value: 'code',
        },
        options: [
          { name: '已完成', code: '1' },
          { name: '未完成', code: '0' },
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
        type: 'input',
        label: '培训主题',
        placeholder: '培训主题',
        value: '',
        name: 'trainTitle',
      },
      {
        type: 'input',
        label: '培训机构名称',
        placeholder: '培训机构名称',
        value: '',
        name: 'trainInstitutionName',
      },
      {
        type: 'year',
        label: '培训年度',
        placeholder: '培训年度',
        value: '',
        name: 'trainYear',
        format: 'YYYY',
        'value-format': 'YYYY',
      },
    ])

    const showDetail = row => {
      console.log('添加路由去详情页' + row)
    }

    const getData = ({ pageSize, currentPage, params }) => {
      console.log(pageSize, currentPage, params)
      console.log('这里调用接口，返回的列表总数需要回调调用setTotal(totalRow)')
    }

    const rowKeys = ref([])
    const selectedRowKeys = keys => {
      console.log('keys', keys)
      rowKeys.value = keys
    }

    const selectionActions = reactive(
      [
        { label: '删除所有', icon: 'TwoDel', noFill: false, show: true, onClick: () => { alert(rowKeys.value) } },
        // { label: '批量转移', icon: 'TwoFolderIn', noFill: true, show: true },
        // { label: '批量审定', icon: 'TwoExamine' },
        // { label: '批量修改', icon: 'TwoEdit' },
        // { label: '批量通过', icon: 'TwoCircleCheck' },
      ],
    )
    const defaultPagination = { pageSize:10, currentPage:1, total: 60 }

    return {
      cols,
      tableData,
      searchItems,
      showDetail,
      getData,
      selectedRowKeys,
      selectionActions,
      defaultPagination,
    }
  },
})
</script>
