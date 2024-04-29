<template>
  <hv-panel panel-class="h-full" title="待研判报警信息">
    <template #action> </template>
    <hl-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="报警开始日期" end-placeholder="报警结束日期" class="m-t-md static" block />
    <hl-group class="m-t-md static" full="full-x" gap="var(--md)">
      <hl-select v-model="value" placeholder="报警类型">
        <hl-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </hl-select>
      <hl-select v-model="value" placeholder="报警等级">
        <hl-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </hl-select>
    </hl-group>
    <hl-input v-model="input" class="m-t-md static" placeholder="请输入监测主体" block>
      <template #suffix>
        <hl-icon>
          <two-search />
        </hl-icon>
      </template>
    </hl-input>

    <hl-scrollbar class="m-t-md" style="height: calc(var(--xxs) * 160)">
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
    <hl-pagination layout="prev, pager, next" :total="50" class="m-t-lg" line block align="items-center" />
  </hv-panel>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  components: {},

  setup() {
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
      {
        id: 5,
        eventTitle: '崔家巷羊肉汤馆燃气泄漏',
        eventTime: '16:30:16',
        statusName: '处置中',
        level: '三级',
      },
      {
        id: 6,
        eventTitle: '崔家巷羊肉汤馆燃气泄漏',
        eventTime: '16:30:16',
        statusName: '处置中',
        level: '三级',
      },
      {
        id: 7,
        eventTitle: '崔家巷羊肉汤馆燃气泄漏',
        eventTime: '16:30:16',
        statusName: '处置中',
        level: '三级',
      },
      {
        id: 8,
        eventTitle: '崔家巷羊肉汤馆燃气泄漏',
        eventTime: '16:30:16',
        statusName: '处置中',
        level: '三级',
      },
      {
        id: 9,
        eventTitle: '崔家巷羊肉汤馆燃气泄漏',
        eventTime: '16:30:16',
        statusName: '处置中',
        level: '三级',
      },
      {
        id: 10,
        eventTitle: '崔家巷羊肉汤馆燃气泄漏',
        eventTime: '16:30:16',
        statusName: '处置中',
        level: '三级',
      },
      {
        id: 11,
        eventTitle: '崔家巷羊肉汤馆燃气泄漏',
        eventTime: '16:30:16',
        statusName: '处置中',
        level: '三级',
      },
    ])

    return {
      data,
    }
  },
})
</script>
