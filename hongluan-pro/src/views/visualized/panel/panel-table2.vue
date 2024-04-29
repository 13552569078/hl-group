<template>
  <hv-panel title="表格面板2" body-height="calc(var(--xxl) * 7)">
    <template #action> </template>
    <hl-scrollbar ref="scrollbar">
      <hl-simple-table list :cols="cols" :data="tableData" border="borderless" padding="var(--sm)" cell-padding="var(--xs)" gap-y="var(--xxs)" class="m-t-md" hover auto-height>
        <template #top="{ row }">
          <hl-icon size="xl" class="symbol" :type="`level${row.top}`" style="position:relative;">
            <span style="position: absolute;" class="text-inverse font-md font-din">{{ row.top }}</span>
            <inline-svg v-show="row.top < 4" :src="NumberBg" />
          </hl-icon>
        </template>
        <template #level="{ row }">
          <hl-tag v-show="row.level == 1" size="sm" style="width: calc(var(--xxs) * 17)" type="red"> 重大风险 </hl-tag>
          <hl-tag v-show="row.level == 2" size="sm" style="width: calc(var(--xxs) * 17)" type="orange"> 较大风险 </hl-tag>
          <hl-tag v-show="row.level == 3" size="sm" style="width: calc(var(--xxs) * 17)" type="yellow"> 一般风险 </hl-tag>
          <hl-tag v-show="row.level == 4" size="sm" style="width: calc(var(--xxs) * 17)" type="blue"> 低风险 </hl-tag>
        </template>
        <template #number="{ row }">
          <h4 class="font-din">{{ row.number }}</h4>
        </template>
      </hl-simple-table>
    </hl-scrollbar>
  </hv-panel>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue'
import NumberBg from '../../../assets/public/images/number-bg.svg?url'

interface table {
  top: number
  name: string
  level: number
  number: string
}

export default defineComponent({
  setup() {
    // 处置中
    const tableData = ref([
      {
        top: 1,
        level: 1,
        name: '燃气井',
        number: '43',
      },
      {
        top: 2,
        level: 4,
        name: '调压站',
        number: '65',
      },
      {
        top: 3,
        level: 3,
        name: '居民用户',
        number: '70',
      },
      {
        top: 4,
        level: 1,
        name: '工商用户',
        number: '96',
      },
      {
        top: 5,
        level: 2,
        name: '燃气井',
        number: '135',
      },
    ])

    // 表头数据
    const cols = ref([
      { title: '排名', prop: 'date', slotName: 'top', width: 'calc(var(--xxs) * 12)' },
      { title: '区域名称', prop: 'name' },
      { title: '风险等级', prop: 'level', slotName: 'level', width: '8em' },
      { title: '数值', prop: 'number', slotName: 'number', align: 'right' },
    ])

    return {
      tableData,
      cols,
      NumberBg,
    }
  },
})
</script>
<style lang="scss" scoped>
</style>
