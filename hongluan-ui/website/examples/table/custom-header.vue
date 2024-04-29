<template>
  <hl-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%"
  >
    <hl-table-column label="Date" prop="date" />
    <hl-table-column label="Name" prop="name" />
    <hl-table-column align="items-right">
      <template #header>
        <hl-input v-model="search" size="sm" placeholder="输入关键字搜索" />
      </template>
      <template #default="scope">
        <hl-button size="sm" @click="handleEdit(scope.$index, scope.row)">Edit</hl-button>
        <hl-button size="sm" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</hl-button>
      </template>
    </hl-table-column>
  </hl-table>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
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
    const search = ref('')

    const handleEdit = (index, row) => {
      console.log(index, row)
    }
    const handleDelete = (index, row) => {
      console.log(index, row)
    }

    return {
      tableData,
      search,
      handleEdit,
      handleDelete,
    }
  },
})
</script>
