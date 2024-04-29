<template>
  <hl-row layout="grid" count="xl:count-2 lg:count-1" gap="var(--lg)" dir="vertical">
    <hl-col span="col">
      <chart-panel title="雷达图">
        <other-1-chart />
      </chart-panel>
    </hl-col>
    <hl-col span="col">
      <chart-panel title="折线柱图混合图">
        <other-2-chart />
      </chart-panel>
    </hl-col>
  </hl-row>
</template>

<script>
import { defineComponent } from 'vue'
import ChartPanel from '../chart-panel.vue'
import Other1Chart from './components/other1.vue'
import Other2Chart from './components/other2.vue'

export default defineComponent({
  components: {
    ChartPanel,
    Other1Chart,
    Other2Chart,
  },
  setup() {
    return {
    }
  },
})
</script>

