<template show-source>
  <hv-modal title="" width="calc(var(--xxl) * 14)">
    <hl-tabs v-model="activeName" type="line" nav-height="calc(var(--lg) * 2)" @tab-click="handleClick">
      <hl-tab-pane label="预警事件" name="1">
        <hl-simple-table :cols="cols" :data="tableData" size="auto-height" stripe="even" class="m-t-md">
          <template #tableIndex="{ row }">
            <span>{{ row.rowIndex + 1 }}</span>
          </template>
          <template #handle> 修改 </template>
        </hl-simple-table>
      </hl-tab-pane>
      <hl-tab-pane label="处置进展" name="2">火狐浏览器</hl-tab-pane>
      <hl-tab-pane label="监测事件" name="3">欧朋浏览器</hl-tab-pane>
      <hl-tab-pane label="监测设备" name="4">欧朋浏览器</hl-tab-pane>
      <hl-tab-pane label="监测数据" name="5">欧朋浏览器</hl-tab-pane>
    </hl-tabs>
  </hv-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {},
  setup() {
    const activeName = ref('1')

    const tableData = ref([
      {
        id: 1,
        name: '王二麻子',
        sex: '男',
        org: '中国系统',
        des: '来自中国南方的温暖城市！',
      },
      { id: 2, name: '李四', sex: '男', org: '中国系统', des: '来自中国' },
      {
        id: 3,
        name: '张三',
        sex: '男',
        org: '中国系统',
        des: '来自中国北方的寒冷的城市！',
      },
    ])
    const cols = ref([
      { title: '#', slotName: 'tableIndex' },
      { title: '用户名', prop: 'name' },
      { title: '性别', prop: 'sex' },
      { title: '单位', prop: 'org' },
      { title: '简介', prop: 'des' },
      { title: '操作', slotName: 'handle', align: 'center' },
    ])
    return {
      tableData,
      cols,
      activeName,
    }
  },
})
</script>
