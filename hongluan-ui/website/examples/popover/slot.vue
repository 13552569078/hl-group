<template>
  <hl-popover placement="right" :width="400" trigger="click" class="m-r-lg">
    <template #reference>
      <hl-button class="m-r-md">打开一个Table气泡</hl-button>
    </template>
    <hl-table :data="gridData" stripe class="compact">
      <hl-table-column width="120" property="date" label="日期" />
      <hl-table-column width="100" property="name" label="姓名" />
      <hl-table-column property="address" label="地址" />
    </hl-table>
  </hl-popover>

  <hl-popover :visible="visible" placement="top">
    <hl-group align="items-top" gap="var(--md)">
      <hl-icon type="warning" size="lg" class="no-shrink">
        <two-warning />
      </hl-icon>
      <hl-group dir="vertical" gap="var(--xxs)">
        <h5>确定要删除此数据吗？</h5>
        <div>删除后可进入回收站找回此数据。</div>
        <hl-group block full align="items-right" class="m-t-md">
          <hl-button type="link" size="sm" class="static" @click="visible = false">取消</hl-button>
          <hl-button type="primary" size="sm" class="static" @click="btnClick">确定</hl-button>
        </hl-group>
      </hl-group>
    </hl-group>

    <template #reference>
      <hl-button @click="visible = true">构建一个Confirm气泡</hl-button>
    </template>
  </hl-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { HlMessage } from 'hongluan-ui'
import { TwoWarning } from '@hongluan-ui/icons'

const visible = ref(false)
const gridData = ref([
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市',
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市',
  },
  {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市',
  },
  {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市',
  },
])

const btnClick = () => {
  visible.value = false
  HlMessage('删除成功')
}

</script>
