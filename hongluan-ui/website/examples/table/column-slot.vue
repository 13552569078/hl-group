<template>
  <hl-table :data="tableData" style="width: 100%">
    <hl-table-column label="日期" width="180">
      <template #default="scope">
        <hl-icon><two-more /></hl-icon>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </hl-table-column>
    <hl-table-column label="姓名" width="180">
      <template #default="scope">
        <hl-popover effect="light" trigger="hover" placement="top">
          <template #default>
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
          </template>
          <template #reference>
            <div class="name-wrapper">
              <hl-tag size="sm">{{ scope.row.name }}</hl-tag>
            </div>
          </template>
        </hl-popover>
      </template>
    </hl-table-column>
    <hl-table-column label="操作">
      <template #default="scope">
        <hl-button size="sm" @click="handleEdit(scope.$index, scope.row)">编辑</hl-button>
        <hl-button size="sm" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</hl-button>
      </template>
    </hl-table-column>
  </hl-table>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { TwoMore } from '@hongluan-ui/icons'

export default defineComponent({
  components: { TwoMore },
  setup() {
    const tableData = ref([
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      },
    ])

    const handleEdit = (index, row) => {
      console.log(index, row)
    }
    const handleDelete = (index, row) => {
      console.log(index, row)
    }
    return {
      tableData,
      handleEdit,
      handleDelete,
    }
  },
})
</script>
