<template>
  <hv-panel title="表格面板1" body-height="calc(var(--xxl) * 7)">
    <template #action>
      <hl-radio-group v-model="alarmType" custom gap="6px" @change="changeAlarm">
        <hl-radio label="0">
          <hl-button size="sm">
            处理中 <h5 class="m-l-xxs font-arial font-black text-inherit" style="color: currentColor">{{ processList.length }}</h5>
          </hl-button>
        </hl-radio>
        <hl-radio label="1">
          <hl-button size="sm">
            已处置 <h5 class="m-l-xxs font-arial font-black text-inherit" style="color: currentColor">{{ endList.length }}</h5>
          </hl-button>
        </hl-radio>
      </hl-radio-group>
    </template>
    <hl-scrollbar ref="scrollbar">
      <hl-simple-table list :cols="cols" :data="tableData" border="borderless" padding="var(--sm)" gap-y="var(--xxs)" class="m-t-md" hover auto-height>
        <template #level="{ row }">
          <hl-tag size="sm" :type="`level${row.level}`" outline> 一级 </hl-tag>
        </template>
      </hl-simple-table>
    </hl-scrollbar>
  </hv-panel>
</template>


<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'

interface table {
  id: number
  area: string
  level: number
  type: string
  date: string
}

export default defineComponent({
  name: 'MonitorEventIndex',
  setup() {
    const tableData: Ref<table[]> = ref([])

    // 处置中
    const processList = ref([
      {
        id: 1,
        area: '经开区习友路9999号经开区习友路9999号经开区习友路9999号',
        level: 1,
        type: '燃气井',
        date: '2021-09-24 18:00',
      },
      {
        id: 2,
        area: '经开区习友路9999号',
        level: 4,
        type: '调压站',
        date: '2021-09-24 20:00',
      },
      {
        id: 3,
        area: '经开区习友路9999号',
        level: 3,
        type: '居民用户',
        date: '2021-09-24 18:00',
      },
      {
        id: 4,
        area: '经开区习友路9999号',
        level: 1,
        type: '工商用户',
        date: '2021-09-24 18:00',
      },
      {
        id: 5,
        area: '经开区习友路9999号',
        level: 2,
        type: '燃气井',
        date: '2021-09-24 18:00',
      },
    ])

    // 已处置
    const endList = ref([
      {
        id: 1,
        area: '高新区黄山路777号',
        level: 1,
        type: '燃气井',
        date: '2021-09-24 18:00',
      },
      {
        id: 2,
        area: '高新区黄山路777号',
        level: 4,
        type: '调压站',
        date: '2021-09-24 19:00',
      },
      {
        id: 3,
        area: '高新区黄山路777号',
        level: 3,
        type: '居民用户',
        date: '2021-09-24 18:00',
      },
      {
        id: 4,
        area: '高新区黄山路777号',
        level: 1,
        type: '工商用户',
        date: '2021-09-24 18:00',
      },
      {
        id: 5,
        area: '高新区黄山路777号',
        level: 2,
        type: '燃气井',
        date: '2021-09-24 18:00',
      },
      {
        id: 6,
        area: '高新区黄山路777号',
        level: 2,
        type: '燃气井',
        date: '2021-09-24 18:00',
      },
    ])

    // 表头数据
    const cols = ref([
      { title: '时间', prop: 'date', width: '10em' },
      { title: '类型', prop: 'type', width: '6em' },
      { title: '级别', prop: 'level', slotName: 'level' },
      {
        title: '位置',
        prop: 'area',
        showTooltip: true,
        tooltipProps: { width: '200px' },
      },
    ])

    tableData.value = processList.value

    const alarmType = ref('0')

    const scrollbar = ref<InstanceType<typeof HlScrollbar>>()
    const changeAlarm = (value: string) => {
      scrollbar.value?.setScrollTop(0)
      value === '0' ? (tableData.value = processList.value) : (tableData.value = endList.value)
    }

    return {
      tableData,
      cols,
      alarmType,
      changeAlarm,
      processList,
      endList,
      scrollbar,
    }
  },
})
</script>
<style lang="scss" scoped>
</style>
