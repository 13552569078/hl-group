<template>
  <hl-row>
    <hl-col span="col-24" class="m-t-xxl">
      <hl-pagination
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="pageSize"
        layout="total, slot, prev, pager, next, sizes, jumper"
        :total="400"
        align="items-between"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
        <div style="width:100%; padding: 0 12px">
          <a>自定义元素</a>
        </div>
      </hl-pagination>
    </hl-col>
  </hl-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const currentPage = ref(1)
const pageSize = ref(100)

const handleSizeChange = val => {
  console.log(`每页 ${val} 条`)
  pageSize.value = val
}
const handleCurrentChange = val => {
  console.log(`当前页: ${val}`)
  currentPage.value = val
}
</script>
