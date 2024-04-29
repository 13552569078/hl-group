<template>
  <hl-button class="m-r-md" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</hl-button>

  <hl-dialog v-model="dialogTableVisible" title="收货地址" width="500px">
    <hl-table :data="gridData" list>
      <hl-table-column property="date" label="日期" width="150" />
      <hl-table-column property="name" label="姓名" width="200" />
      <hl-table-column property="address" label="地址" />
    </hl-table>
  </hl-dialog>

  <!-- Form -->
  <hl-button class="m-r-md" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</hl-button>

  <hl-dialog v-model="dialogFormVisible" title="收货地址" width="500px">
    <hl-form :model="form" :width="['md:col-6','md:col-18']">
      <hl-form-item label="活动名称" :label-width="formLabelWidth">
        <hl-input v-model="form.name" autocomplete="off" block />
      </hl-form-item>
      <hl-form-item label="活动区域" :label-width="formLabelWidth">
        <hl-select v-model="form.region" placeholder="请选择活动区域" block>
          <hl-option label="区域一" value="shanghai" />
          <hl-option label="区域二" value="beijing" />
        </hl-select>
      </hl-form-item>
    </hl-form>
    <template #footer>
      <span class="dialog-footer">
        <hl-button class="m-r-md" @click="dialogFormVisible = false">取 消</hl-button>
        <hl-button type="primary" @click="dialogFormVisible = false">确 定</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const gridData = ref([
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
  },
  {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
  },
  {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
  },
])
const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const form = ref({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
const formLabelWidth = ref('120px')

</script>
