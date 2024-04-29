<template>
  <hl-row layout="grid" count="xl:count-3 lg:count-1" gap="var(--lg)" dir="vertical">
    <hl-col span="col">
      <chart-panel title="饼图">
        <pie-1-chart />
      </chart-panel>
    </hl-col>
    <hl-col span="col">
      <chart-panel title="环形图">
        <pie-2-chart />
      </chart-panel>
    </hl-col>
    <hl-col span="col">
      <chart-panel title="百分比圆环">
        <pie-3-chart />
      </chart-panel>
    </hl-col>
    <hl-col span="col">
      <chart-panel title="双色环形图">
        <pie-4-chart />
      </chart-panel>
    </hl-col>
    <hl-col span="col">
      <chart-panel title="双色环形图">
        <pie-5-chart />
      </chart-panel>
    </hl-col>
    <hl-col span="col">
      <chart-panel title="玉珏图">
        <pie-6-chart />
      </chart-panel>
    </hl-col>
  </hl-row>
</template>

<script>
import { defineComponent } from 'vue'
import ChartPanel from '../chart-panel.vue'
import Pie1Chart from './components/pie1.vue'
import Pie2Chart from './components/pie2.vue'
import Pie3Chart from './components/pie3.vue'
import Pie4Chart from './components/pie4.vue'
import Pie5Chart from './components/pie5.vue'
import Pie6Chart from './components/pie6.vue'

export default defineComponent({
  components: {
    ChartPanel,
    Pie1Chart,
    Pie2Chart,
    Pie3Chart,
    Pie4Chart,
    Pie5Chart,
    Pie6Chart,
  },
  setup() {
    return {
    }
  },
})
</script>

