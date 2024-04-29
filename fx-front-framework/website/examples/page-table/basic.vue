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
      selector-col-count="count-xl-2 count-lg-1 count-md-1"
      search-placement="top"
      :table-props="tableProps"
      @sort-change="sortChange"
    >
      <template #searchbar-prefix>
        <hl-button effect="light" @click="resetFields">清空</hl-button>
      </template>
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
    </fx-page-table>
  </hl-panel>
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
        width: '66px',
        align: 'center',
        expand: { slotName: 'customExpand', hideLabel: false },
      },
      {
        title: '序号',
        align: 'center',
        slotName: 'tableIndex',
        prop: 'tableIndex',
      },
      { title: '培训主题', slotName: 'detail', prop: 'title', sortable: true },
      { title: '企业名称', prop: 'companyName' },
      { title: '所属区域', prop: 'areaName' },
      { title: '企业培训负责人', prop: 'person' },
      { title: '完成状态', slotName: 'status', prop: 'status' },
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
        span: 'grid-col-span-xl-2',
        type: 'slot',
        slotName: 'checkbox1',
        value: '',
      },
      // {
      //   type: 'input',
      //   label: '培训主题',
      //   placeholder: '培训主题',
      //   value: '',
      //   name: 'trainTitle',
      // },
      // {
      //   type: 'input',
      //   label: '培训机构名称',
      //   placeholder: '培训机构名称',
      //   value: '',
      //   name: 'trainInstitutionName',
      // },
      // {
      //   type: 'year',
      //   label: '培训年度',
      //   placeholder: '培训年度',
      //   value: '',
      //   name: 'trainYear',
      //   format: 'YYYY',
      //   'value-format': 'YYYY',
      // },
    ])

    const resetFields = () => {
      tableRef.value?.resetFields()
    }

    // 这里示例再增加一项，主要用于动态渲染搜索条件
    searchItems.splice(1, 0, {
      type: 'input',
      label: '培训机构名称',
      placeholder: '培训机构名称',
      value: '',
      name: 'trainInstitutionName',
    })

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
      showDetail,
      defaultPagination,
      getData,
      checked1,
      tableRef,
      tableProps,
      tableRowClassName,

      resetFields,
      sortChange,
    }
  },
})
</script>
