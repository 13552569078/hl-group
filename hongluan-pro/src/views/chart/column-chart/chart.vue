<template>
  <hl-row layout="grid" count="xxl:count-3 xl:count-2 lg:count-1" gap="var(--lg)" dir="vertical">
    <hl-col span="col">
      <chart-panel title="基础柱状图">
        <column-1-chart />
      </chart-panel>
    </hl-col>
    <hl-col span="col">
      <chart-panel title="基础柱状图">
        <column-2-chart />
      </chart-panel>
    </hl-col>
    <hl-col span="col">
      <chart-panel title="基础柱状图">
        <column-3-chart />
      </chart-panel>
    </hl-col>
    <hl-col span="col">
      <chart-panel title="基础排名统计图">
        <column-4-chart />
      </chart-panel>
    </hl-col>
    <hl-col span="col">
      <chart-panel title="双数据对比柱形图">
        <column-5-chart />
      </chart-panel>
    </hl-col>
    <hl-col span="col">
      <chart-panel title="渐变柱形图">
        <column-6-chart />
      </chart-panel>
    </hl-col>
    <hl-col span="col">
      <chart-panel title="突出单条数据柱形图">
        <column-7-chart />
      </chart-panel>
    </hl-col>
    <hl-col span="col">
      <chart-panel title="百分比堆叠柱形图">
        <column-8-chart />
      </chart-panel>
    </hl-col>
    <hl-col span="col">
      <chart-panel title="正负柱形图">
        <column-9-chart />
      </chart-panel>
    </hl-col>
  </hl-row>
</template>

<script>
import { defineComponent } from 'vue'
import ChartPanel from '../chart-panel.vue'
import Column1Chart from './components/column1.vue'
import Column2Chart from './components/column2.vue'
import Column3Chart from './components/column3.vue'
import Column4Chart from './components/column4.vue'
import Column5Chart from './components/column5.vue'
import Column6Chart from './components/column6.vue'
import Column7Chart from './components/column7.vue'
import Column8Chart from './components/column8.vue'
import Column9Chart from './components/column9.vue'

export default defineComponent({
  components: {
    ChartPanel,
    Column1Chart,
    Column2Chart,
    Column3Chart,
    Column4Chart,
    Column5Chart,
    Column6Chart,
    Column7Chart,
    Column8Chart,
    Column9Chart,
  },
  setup() {
    return {
    }
  },
})
</script>

