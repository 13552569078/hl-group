<template>
  <hv-panel title="数据标签">
    <hl-group class="m-t-md" full="full-x" gap="var(--sm)">
      <hl-group full class="" gap="var(--xxs)">
        <hl-group align="items-middle items-center" class="p-t-xxs p-b-xxs p-l-md p-r-md bg-title border static">巡检人员</hl-group>
        <div class="p-t-xxs p-b-xxs p-l-md p-r-md bg-light display-flex items-middle font-din">
          <h3 class="text-primary">28</h3>
          <h3>/357</h3>
        </div>
      </hl-group>
      <hl-group full="full-x" class="label-number" gap="var(--xxs)">
        <hl-group align="items-middle items-center" class="p-t-xxs p-b-xxs p-l-md p-r-md bg-title border static">巡检车辆</hl-group>
        <div class="p-t-xxs p-b-xxs p-l-md p-r-md bg-light display-flex items-middle font-din">
          <h3 class="text-primary">12</h3>
          <h3>/46</h3>
        </div>
      </hl-group>
    </hl-group>

    <hl-scrollbar class="m-t-md" style="height: calc(var(--xxl) * 4)">
      <hl-group full="full-x" dir="vertical" gap="var(--xxs)">
        <hl-group dir="vertical" class="bg-light p-sm">
          <hl-group>
            <span class="ellipsis">太原市迎泽区</span>
            <hl-tag class="static m-l-sm" size="sm">待巡检</hl-tag>
          </hl-group>
          <div class="text-secondary">巡检时间：<span>2020.12.15 12:00~18:00</span></div>
        </hl-group>

        <hl-group dir="vertical" class="bg-light p-sm">
          <hl-group>
            <span class="ellipsis">燃气设备老旧燃气设备老旧，存在泄漏风险…</span>
            <hl-tag type="danger" class="static m-l-sm" size="sm"> 待巡检 </hl-tag>
          </hl-group>
          <div class="text-secondary">巡检时间：<span>2020.12.15 12:00~18:00</span></div>
        </hl-group>

        <hl-group dir="vertical" class="bg-light p-sm">
          <hl-group>
            <span class="ellipsis">太原市迎泽区九华路日常巡检</span>
            <hl-tag type="warning" class="static m-l-sm" size="sm"> 正在巡检 </hl-tag>
          </hl-group>
          <div class="text-secondary">巡检时间：<span>2020.12.15 12:00~18:00</span></div>
        </hl-group>
      </hl-group>
    </hl-scrollbar>
  </hv-panel>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MonitorEventIndex',
  setup() {
    const tableData = ref([
      {
        id: 1,
        area: '王二麻子',
        level: 1,
        type: '燃气井',
        date: '2021-09-24 18:00',
      },
      {
        id: 2,
        area: '燃气井',
        level: 4,
        type: '中国系统',
        date: '来自中国',
      },
      {
        id: 3,
        area: '张三',
        level: 3,
        type: '燃气井',
        date: '2021-09-24 18:00',
      },
      {
        id: 3,
        area: '张三',
        level: 1,
        type: '调压站',
        date: '2021-09-24 18:00',
      },
      {
        id: 3,
        area: '张三',
        level: 2,
        type: '燃气井',
        date: '2021-09-24 18:00',
      },
      {
        id: 3,
        area: '张三',
        level: 4,
        type: '调压站',
        date: '2021-09-24 18:00',
      },
    ])
    const cols = ref([
      {
        title: '位置',
        prop: 'area',
        showTooltip: true,
        tooltipProps: { width: '200px' },
      },
      { title: '级别', prop: 'level', slotName: 'level' },
      { title: '类型', prop: 'type' },
      { title: '时间', prop: 'date', width: '31%' },
    ])

    const radio2 = ref('0')

    return {
      tableData,
      cols,
      radio2,
    }
  },
})
</script>
<style lang="scss" scoped>
</style>
