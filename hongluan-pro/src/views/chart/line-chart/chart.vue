<template>
  <hl-row layout="grid" count="xxl:count-3 xl:count-2 lg:count-1" gap="var(--lg)" dir="vertical">
    <hl-col span="col">
      <chart-panel title="基础折线图">
        <line-1-chart />
      </chart-panel>
    </hl-col>
    <hl-col span="col">
      <chart-panel title="多色折线图">
        <line-2-chart />
      </chart-panel>
    </hl-col>
    <hl-col span="col">
      <chart-panel title="折线面积图">
        <line-3-chart />
      </chart-panel>
    </hl-col>
    <hl-col span="col">
      <chart-panel title="预测趋势折线图">
        <line-4-chart />
      </chart-panel>
    </hl-col>
    <hl-col span="col">
      <chart-panel title="分层折线图">
        <line-5-chart />
      </chart-panel>
    </hl-col>
    <hl-col span="col">
      <chart-panel title="分层面积图">
        <line-6-chart />
      </chart-panel>
    </hl-col>
  </hl-row>
</template>

<script>
import { defineComponent } from 'vue'
import ChartPanel from '../chart-panel.vue'
import Line1Chart from './components/line1.vue'
import Line2Chart from './components/line2.vue'
import Line3Chart from './components/line3.vue'
import Line4Chart from './components/line4.vue'
import Line5Chart from './components/line5.vue'
import Line6Chart from './components/line6.vue'

export default defineComponent({
  components: {
    ChartPanel,
    Line1Chart,
    Line2Chart,
    Line3Chart,
    Line4Chart,
    Line5Chart,
    Line6Chart,
  },
  setup() {
    return {
    }
  },
})
</script>

