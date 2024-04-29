<template>
  <hv-panel title="当前报警">
    <template #action>
      <h3 class="font-din text-danger">10</h3>
    </template>
    <hl-scrollbar style="height: calc(var(--xl) * 4)">
      <hl-group full="full-x" dir="vertical" gap="var(--xxs)">
        <hl-group v-for="(item, index) in data" :key="index" class="bg-light p-sm" align="items-middle items-between" gap="var(--md)">
          <hl-group dir="vertical">
            <hl-group align="items-middle" gap="var(--sm)">
              <span class="ellipsis font-md cursor-pointer">{{ item.eventTitle }}</span>
              <hl-tag size="sm">{{ item.level }}</hl-tag>
            </hl-group>
            <hl-group gap="var(--md)">
              <span class="font-sm text-secondary cursor-pointer" @click="dialogTableVisible = true">消防通道占用</span>
              <span class="font-sm text-secondary cursor-pointer" @click="dialogTableVisible = true">北环家园</span>
            </hl-group>
          </hl-group>
          <hl-group class="static" align="items-right items-middle" gap="var(--xs)">
            <div class="text-secondary font-sm">{{ item.eventTime }}</div>
            <hl-button size="sm">{{ item.statusName }}</hl-button>
          </hl-group>
        </hl-group>
      </hl-group>
    </hl-scrollbar>
  </hv-panel>

  <hl-dialog v-model="dialogTableVisible" title="收货地址" width="calc(var(--xxs) * 300)">
    <hl-simple-table :cols="cols" :data="tableData" padding="var(--lg)" hover>
      <template #progress="{ row }">
        <hl-tag>{{ row.progress }}</hl-tag>
      </template>
      <template #level="{ row }">
        <hl-tag size="sm" :type="`level${row.level}`">{{ row.levelName }}</hl-tag>
      </template>
      <template #titles="{ row }">
        <hl-group dir="vertical" full="full-x" class="content">
          <h6 class="title">{{ row.name }}</h6>
          <span class="text-secondary">{{ row.address }}</span>
        </hl-group>
      </template>
      <template #handle>
        <a>详情</a>
      </template>
    </hl-simple-table>
    <hl-pagination
      :current-page="pagination.currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="pagination.pageSize"
      layout="sizes, total, slot, prev, pager, next, jumper"
      :total="pagination.total"
      align="items-between"
      class="w-full m-t-lg"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <div class="w-full"></div>
    </hl-pagination>
  </hl-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  components: {},

  setup() {
    const visible = ref(false)

    const show = () => {
      visible.value = !visible.value
    }
    const pagination = reactive({
      pageSize: 100,
      total: 400,
      currentPage: 1,
      show: false,
    })
    const data = ref([
      {
        id: 1,
        eventTitle: '迎泽区新建路二社区燃气泄漏',
        eventTime: '16:30:16',
        statusName: '待研判',
        level: '一级',
      },
      {
        id: 2,
        eventTitle: '解放路韶九巷燃气泄漏',
        eventTime: '16:30:16',
        statusName: '处置中',
        level: '二级',
      },
      {
        id: 3,
        eventTitle: '前所街住宅小区燃气泄漏',
        eventTime: '16:30:16',
        statusName: '待研判',
        level: '四级',
      },
      {
        id: 4,
        eventTitle: '崔家巷羊肉汤馆燃气泄漏',
        eventTime: '16:30:16',
        statusName: '处置中',
        level: '三级',
      },
    ])
    const cols = ref([
      { title: '#', prop: 'id' },
      { title: '进展', slotName: 'progress' },
      { title: '标题', slotName: 'titles' },
      { title: '类型', prop: 'type' },
      { title: '监测点', prop: 'point' },
      { title: '等级', slotName: 'level' },
      { title: '报警时间', prop: 'date' },
      { title: '操作', slotName: 'handle', align: 'center' },
    ])
    const tableData = ref([
      {
        id: '1',
        date: '2016-05-02 16:30:16',
        name: '北环家园小区消防通道占用',
        address: '上海市普陀区金沙江路 1518 弄',
        type: '消防通道占用',
        point: '倍海家园',
        level: '1',
        levelName: '一级',
        progress: '待研判',
      },
      {
        id: '2',
        date: '2016-05-04 16:30:16',
        name: '北环家园小区东门消防通道占用',
        address: '北环家园小区西门',
        type: '消防通道占用',
        point: '倍海家园',
        level: '2',
        levelName: '二级',
        progress: '待研判',
      },
      {
        id: '3',
        date: '2016-05-01 16:30:16',
        name: '大明湖南门人员异常聚集',
        address: '上海市普陀区金沙江路 1518 弄',
        type: '消防通道占用',
        point: '倍海家园',
        level: '3',
        levelName: '三级',
        progress: '待研判',
      },
      {
        id: '4',
        date: '2016-05-03 16:30:16',
        name: '北环家园小区北门消防通道占用',
        address: '北环家园小区北门',
        type: '消防通道占用',
        point: '倍海家园',
        level: '4',
        levelName: '四级',
        progress: '待研判',
      },
    ])
    const dialogTableVisible = ref(false)

    return {
      visible,
      show,
      data,
      cols,
      tableData,
      dialogTableVisible,
      pagination,
    }
  },
})
</script>
