<template>
  <hl-row layout="grid" count="xxl:count-4 xl:count-3 lg:count-2" gap="var(--xl)" style="z-index: 2000; position: relative; margin: 40px">
    <hl-col span="col">
      <hv-panel title="图表">
        <chart-bar1 class="m-t-md" />
      </hv-panel>
    </hl-col>
    <hl-col span="col">
      <hv-panel title="图表">
        <chart-bar4 class="m-t-md" />
      </hv-panel>
    </hl-col>
    <hl-col span="col">
      <hv-panel title="图表">
        <chart-bar5 class="m-t-md" />
      </hv-panel>
    </hl-col>
    <hl-col span="col">
      <hv-panel title="滚动图表">
        <chart-bar2 height="calc(var(--xxl) * 5 + var(--md))" />
      </hv-panel>
    </hl-col>
    <hl-col span="col">
      <hv-panel title="滚动堆叠图表">
        <chart-bar3 height="calc(var(--xxl) * 5 + var(--md))" />
      </hv-panel>
    </hl-col>
    <hl-col span="col">
      <hv-panel title="图表">
        <chart-bar6 class="m-t-md" />
      </hv-panel>
    </hl-col>
    <hl-col span="col">
      <hv-panel title="图表">
        <chart-line1 class="m-t-md" />
      </hv-panel>
    </hl-col>
    <hl-col span="col">
      <hv-panel title="图表">
        <chart-line2 class="m-t-md" />
      </hv-panel>
    </hl-col>
    <hl-col span="col">
      <hv-panel title="图表">
        <chart-line3 class="m-t-md" />
      </hv-panel>
    </hl-col>
    <hl-col span="col">
      <hv-panel title="图表">
        <chart-sankey class="m-t-md" />
      </hv-panel>
    </hl-col>
    <hl-col span="col">
      <hv-panel title="图表">
        <chart-pie1 class="m-t-md" />
      </hv-panel>
    </hl-col>
    <hl-col span="col">
      <hv-panel title="图表">
        <chart-pie2 class="m-t-md" />
      </hv-panel>
    </hl-col>
    <hl-col span="col">
      <hv-panel title="图表">
        <chart-pie4 class="m-t-md" />
      </hv-panel>
    </hl-col>
    <hl-col span="col">
      <hv-panel title="图表">
        <chart-pie3 class="m-t-md" />
      </hv-panel>
    </hl-col>
    <hl-col span="col">
      <hv-panel title="图表">
        <chart-spire class="m-t-md" />
      </hv-panel>
    </hl-col>
    <hl-col span="col">
      <hv-panel title="图表">
        <chart-pyramid class="m-t-md" />
      </hv-panel>
    </hl-col>
  </hl-row>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import ChartBar1 from './charts/chart-bar1.vue'
import ChartBar2 from './charts/chart-bar2.vue'
import ChartBar3 from './charts/chart-bar3.vue'
import ChartBar4 from './charts/chart-bar4.vue'
import ChartBar5 from './charts/chart-bar5.vue'
import ChartBar6 from './charts/chart-bar6.vue'
import ChartLine1 from './charts/chart-line1.vue'
import ChartLine2 from './charts/chart-line2.vue'
import ChartLine3 from './charts/chart-line3.vue'
import ChartPie1 from './charts/chart-pie1.vue'
import ChartPie2 from './charts/chart-pie2.vue'
import ChartPie3 from './charts/chart-pie3.vue'
import ChartPie4 from './charts/chart-pie4.vue'
import ChartSankey from './charts/chart-sankey.vue'
import ChartSpire from './charts/chart-spire-column.vue'
import ChartPyramid from './charts/chart-pyramid.vue'

export default defineComponent({
  components: {
    ChartBar1,
    ChartBar2,
    ChartBar3,
    ChartBar4,
    ChartBar5,
    ChartBar6,
    ChartLine1,
    ChartLine2,
    ChartLine3,
    ChartSankey,
    ChartSpire,
    ChartPyramid,
    ChartPie1,
    ChartPie2,
    ChartPie3,
    ChartPie4,
  },
  setup() {
    const bar2Data = ref([
      { value: 55, label: '河流湖泊' },
      { value: 69, label: '建筑工贸' },
      { value: 50, label: '工贸企业' },
      { value: 20, label: '加油站' },
      { value: 26, label: '天气站' },
      { value: 87, label: '冶金化工' },
      { value: 69, label: '尾矿煤炭' },
      { value: 50, label: '桥梁，汽车，火车，飞机' },
      { value: 20, label: '华熙LIVE' },
      { value: 26, label: '直播带货' },
      { value: 87, label: '冶金化工' },
    ])
    return {
      bar2Data,
    }
  },
})
</script>
