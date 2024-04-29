<template>
  <hl-panel padding="var(--xl)" class="card-panel">
    <template #header>
      <div class="panel-title"><h4>表单类模态窗</h4></div>
      <div class="panel-header-right">
        <hl-button no-fill equal>
          <hl-icon><two-more /></hl-icon>
        </hl-button>
      </div>
    </template>
    <hl-group full="full-x" class="p-b-lg">表单类模态窗通常用于：在不离开当前页面的情况下，对本页数据进行操作的使用场景。</hl-group>
    <hl-button class="m-r-md" @click="formModal = true">点击查看</hl-button>
    <hl-button class="m-r-md" @click="formModal1 = true">点击查看</hl-button>
    <hl-button class="m-r-md" @click="formModal2 = true">点击查看</hl-button>
  </hl-panel>

  <hl-dialog v-model="formModal" title="详细信息" :borderless="true" width="calc(var(--xxl) * 13)" padding="var(--xl)">
    <hl-form
      ref="form"
      :model="formData"
      :width="['col-24', 'col-24']"
      :label-position="['left', 'top']"
      class="hl-row grid grid-direction-vertical lg:count-2"
      style="--row-gap-y: var(--md); --row-gap-x: var(--lg)"
    >
      <hl-form-item label="名称">
        <hl-input placeholder="名称" block />
      </hl-form-item>
      <hl-form-item label="职业">
        <hl-input placeholder="职业" block />
      </hl-form-item>
      <hl-form-item label="证件类型">
        <hl-select v-model="formData.credentials" placeholder="请选择" class="w-full-xl" block>
          <hl-option label="身份证" value="IdCard" />
          <hl-option label="护照" value="Passport" />
        </hl-select>
      </hl-form-item>
      <hl-form-item label="生日">
        <hl-date-picker v-model="formData.birthday" type="date" placeholder="选择日期" class="w-full-xl" block />
      </hl-form-item>
      <hl-form-item label="职业描述" class="col-span-2">
        <hl-input v-model="formData.description" native-type="textarea" rows="3" block />
      </hl-form-item>
    </hl-form>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="formModal = false">取 消</hl-button>
        <hl-button type="primary" class="m-l-md">确 定</hl-button>
      </span>
    </template>
  </hl-dialog>

  <hl-dialog v-model="formModal1" title="设备信息" :borderless="true" width="calc(var(--xxl) * 10)" padding="var(--xl)">
    <hl-row layout="grid" count="count-2" gap-x="var(--xxl)" gap-y="var(--xxs)">
      <hl-col span="col">
        <hl-group dir="vertical" class="info-description">
          <span class="label">设备编号</span>
          <span class="content">20200311</span>
        </hl-group>
      </hl-col>
      <hl-col span="col">
        <hl-group dir="vertical" class="info-description">
          <span class="label">设备名称</span>
          <span class="content">广场西南角设备1号</span>
        </hl-group>
      </hl-col>
      <hl-col span="col">
        <hl-group dir="vertical" class="info-description">
          <span class="label">维护负责人</span>
          <span class="content">贾明志</span>
        </hl-group>
      </hl-col>
      <hl-col span="col">
        <hl-group dir="vertical" class="info-description">
          <span class="label">联系电话</span>
          <span class="content">13231123221</span>
        </hl-group>
      </hl-col>
    </hl-row>

    <hl-form ref="form" :model="formData" :width="['col-24', 'col-24']" :label-position="['left', 'top']">
      <hl-form-item label="证件类型">
        <hl-select v-model="formData.credentials" placeholder="请选择" class="w-full-xl" block>
          <hl-option label="身份证" value="IdCard" />
          <hl-option label="护照" value="Passport" />
        </hl-select>
      </hl-form-item>
      <hl-form-item label="生日">
        <hl-date-picker v-model="formData.birthday" type="date" placeholder="选择日期" class="w-full-xl" block />
      </hl-form-item>
    </hl-form>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="formModal1 = false">取 消</hl-button>
        <hl-button type="primary" class="m-l-md">确 定</hl-button>
      </span>
    </template>
  </hl-dialog>

  <hl-dialog v-model="formModal2" title="选择人员" body-class="p-none" :borderless="false" width="calc(var(--xxl) * 20)" padding="var(--xl)">
    <hl-row>
      <hl-col span="col-8" class="border-right">
        <hl-tree gap="0" :data="orgData" :props="defaultProps" class="p-l-md p-t-lg" draggable accordion @node-click="handleNodeClick">
          <template #default="{ node }">
            <span class="tree-node-label">
              {{ node.label }}
            </span>
          </template>
        </hl-tree>
      </hl-col>
      <hl-col span="col-16">
        <hl-group full dir="vertical">
          <hl-group full="full-x" gap="var(--md)" class="p-x-lg p-y-md border-bottom">
            <hl-group merge indent>
              <hl-select v-model="selectValue" placeholder="请选择">
                <hl-option label="姓名" value="name" />
                <hl-option label="手机号" value="tel" />
              </hl-select>

              <hl-autocomplete v-model="states" block clearable :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect">
                <template #default="{ item }">
                  <hl-group full align="items-between">
                    <span>{{ item.value }}</span>
                    <span class="text-secondary static">{{ item.tel }}</span>
                  </hl-group>
                </template>
              </hl-autocomplete>
            </hl-group>
            <hl-button type="primary" class="static" icon-position="right">
              搜索
              <template #icon>
                <hl-icon>
                  <two-search />
                </hl-icon>
              </template>
            </hl-button>
          </hl-group>
          <hl-scrollbar height="calc(var(--xxl) * 6)">
            <hl-simple-table padding="var(--lg)" size="sm" border="borderless-last" :cols="cols" :data="tableData" stripe fixed-header @row-click="rowClicked" @cell-click="cellClicked">
              <template #firstCol>
                <hl-checkbox v-model="selectedAll" :indeterminate="isIndeterminate" :show-label="false" @change="selectAll" />
              </template>
              <template #tableIndex="{ row }">
                <hl-checkbox v-model="selectedRows" :label="row.id" :show-label="false" @change="selectRow(row.id)" />
              </template>
            </hl-simple-table>
          </hl-scrollbar>
          <hl-pagination layout="prev, pager, next" :total="40" class="border-top full p-x-lg p-y-md" />
        </hl-group>
      </hl-col>
    </hl-row>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="formModal1 = false">取 消</hl-button>
        <hl-button type="primary" class="m-l-md">确 定</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue'
export default defineComponent({
  setup() {
    const formModal = ref(false)
    const formModal1 = ref(false)
    const formModal2 = ref(false)
    const formData = ref({
      name: '',
      sex: '',
      credentials: '',
      birthday: '',
      description: '',
      address: '',
    })
    const selectedAll = ref(false)
    const selectedRows = ref<any>([])
    const isIndeterminate = ref(false)

    const orgData = ref([
      {
        id: 1,
        label: '直属机构',
        children: [
          {
            id: 1100,
            label: '省教育厅',
          },
          {
            id: 1101,
            label: '省应急管理厅',
            children: [
              {
                id: 1111,
                label: '威海市应急管理局',
              },
              {
                id: 1112,
                label: '省工业和信息化厅',
              },
            ],
          },
        ],
      },
      {
        id: 2,
        label: '内设机构',
        children: [
          {
            label: '防汛抗旱处',
          },
          {
            label: '安全生产监察支队',
          },
        ],
      },
      {
        id: 3,
        label: '济南市',
        children: [
          {
            label: '防汛抗旱处',
          },
          {
            label: '安全生产监察支队',
          },
        ],
      },
      {
        id: 4,
        label: '菏泽市',
        children: [
          {
            label: '防汛抗旱处',
          },
          {
            label: '安全生产监察支队',
          },
        ],
      },
    ])
    const defaultProps = ref({
      children: 'children',
      label: 'label',
    })

    const handleNodeClick = (data: any) => {
      console.log(data)
    }

    const selectAll = () => {
      if (selectedAll.value) {
        selectedRows.value.splice(0, selectedRows.value.length)
        selectedRows.value.push(...tableData.value.map(d => d.id))
        isIndeterminate.value = false
      } else {
        selectedRows.value.splice(0, selectedRows.value.length)
      }
    }
    const selectRow = () => {
      if (selectedRows.value.length > 0 && selectedAll.value == false) {
        isIndeterminate.value = true
      } else {
        isIndeterminate.value = false
      }
    }
    const rowClicked = (row: any, rowIndex: number, event: any) => {
      console.log('rowClicked', row, rowIndex, event)
    }

    const tableData = ref([
      { id: 1, name: '夏宏博', tel: '13912345678' },
      { id: 2, name: '赵志强', tel: '13912345678' },
      { id: 3, name: '夏元龙', tel: '13912345678' },
      { id: 4, name: '赵鸿祯', tel: '13912345678' },
      { id: 5, name: '焦美玲', tel: '13912345678' },
      { id: 6, name: '向倩秀', tel: '13912345678' },
      { id: 7, name: '池欣艳', tel: '13912345678' },
      { id: 8, name: '冷溪蓝', tel: '13912345678' },
    ])
    const cols = ref([
      {
        title: '#',
        slotName: 'tableIndex',
        headerSlotName: 'firstCol',
        width: '5em',
      },
      { title: '用户名', prop: 'name' },
      { title: '手机号', prop: 'tel' },
    ])

    const pagination = reactive({
      pageSize: 100,
      total: 400,
      currentPage: 1,
      show: false,
    })

    const restaurants = ref([])

    const querySearch = (queryString, cb) => {
      var results = queryString ? restaurants.value.filter(createFilter(queryString)) : restaurants.value
      // 调用 callback 返回建议列表的数据
      cb(results)
    }
    const createFilter = queryString => {
      return restaurant => {
        return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    }
    const states = ref('')
    const selectValue = ref('')

    const loadAll = () => {
      return [
        { value: '夏宏博', tel: '13912345678' },
        { value: '赵志强', tel: '13912345678' },
        { value: '夏元龙', tel: '13912345678' },
        { value: '赵鸿祯', tel: '13912345678' },
        { value: '焦美玲', tel: '13912345678' },
        { value: '向倩秀', tel: '13912345678' },
        { value: '池欣艳', tel: '13912345678' },
        { value: '冷溪蓝', tel: '13912345678' },
      ]
    }
    const handleSelect = item => {
      console.log(item)
    }

    onMounted(() => {
      restaurants.value = loadAll()
    })

    return {
      formData,
      formModal,
      formModal1,
      formModal2,
      orgData,
      defaultProps,
      handleNodeClick,
      tableData,
      cols,
      pagination,
      selectAll,
      selectedAll,
      selectedRows,
      selectRow,
      rowClicked,
      isIndeterminate,
      restaurants,
      querySearch,
      createFilter,
      loadAll,
      handleSelect,
      states,
      selectValue,
    }
  },
})
</script>

