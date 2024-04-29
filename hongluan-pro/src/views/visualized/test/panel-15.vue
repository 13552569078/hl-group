<template>
  <hv-panel title="报警分析">
    <template #action>
      <hl-radio-group v-model="radio" custom merge indent>
        <hl-radio label="近7天">
          <hl-button size="sm">近7天</hl-button>
        </hl-radio>
        <hl-radio label="近30天">
          <hl-button size="sm">近30天</hl-button>
        </hl-radio>
        <hl-radio label="近一年">
          <hl-button size="sm">近一年</hl-button>
        </hl-radio>
      </hl-radio-group>
    </template>

    <hb-data-collect gap="var(--sm)" full class="border m-t-lg">
      <cite class="dom-frame"><cite class="dom-frame"></cite></cite>
      <hl-icon type="level1`" effect="light" fill class="symbol static" size="lg" padding="var(--sm)">
        <fill-Firm />
      </hl-icon>
      <span class="text-level1 w-full">监测点</span>
      <hl-group class="static" gap="var(--xs)">
        <h2 class="font-din relative" data-suffix="个">125</h2>
      </hl-group>
    </hb-data-collect>


    <hl-group align="items-between" class="ornament-title bg-light m-t-lg p-r-md">
      <span>报警信息</span>
      <hl-group align="items-middle" class="static" gap="var(--sm)">
        <hl-group align="items-middle" gap="var(--sm)">
          <span>共</span>
          <span class="text-primary relative" data-suffix="个">125</span>
        </hl-group>
      </hl-group>
    </hl-group>
    <hl-group full class="m-t-md">
      <scrolling-bar-chart
        :chart-data="chartData"
        height="calc(var(--xxs) * 100)"
        :bar-style="{
          color: 'linear-gradient(90deg, rgba(114,245,172,0.16) 0%, #72F5AC 100%)',
          width: '8px',
          background: 'rgba(47,71,110,0.12)'
        }"
      />
    </hl-group>

    <hl-group align="items-between" class="ornament-title bg-light m-t-lg p-r-md">
      <span>报警研判</span>
      <hl-group align="items-middle" class="static" gap="var(--sm)">
        <hl-group align="items-middle" gap="var(--sm)">
          <span>共</span>
          <span class="text-primary relative" data-suffix="个">125</span>
        </hl-group>
      </hl-group>
    </hl-group>

    <hl-group class="m-t-md" full="full-x" gap="var(--sm)">
      <hl-group dir="vertical" align="items-middle" full class="p-xxs border border-dark transition">
        <h2 class="font-din m-b-xxs text-warning">67</h2>
        <hl-group full align="items-center" class="p-t-xxs p-b-xxs text-secondary" style="background-color: rgba(var(--rgb-bg-light), 0.24)" gap="var(--xxs)"> 故障 </hl-group>
      </hl-group>
      <hl-group dir="vertical" align="items-middle" full class="p-xxs border border-dark transition">
        <h2 class="font-din m-b-xxs text-success">23</h2>
        <hl-group full align="items-center" class="p-t-xxs p-b-xxs text-secondary" style="background-color: rgba(var(--rgb-bg-light), 0.24)" gap="var(--xxs)"> 正常 </hl-group>
      </hl-group>
      <hl-group dir="vertical" align="items-middle" full class="p-xxs border border-dark transition">
        <h2 class="font-din m-b-xxs text-danger">10</h2>
        <hl-group full align="items-center" class="p-t-xxs p-b-xxs text-secondary" style="background-color: rgba(var(--rgb-bg-light), 0.24)" gap="var(--xxs)"> 报警 </hl-group>
      </hl-group>
    </hl-group>

    <hl-group align="items-between" class="ornament-title bg-light m-t-lg p-r-md">
      <span>报警处置</span>
      <hl-group align="items-middle" class="static" gap="var(--sm)">
        <hl-group align="items-middle" gap="var(--sm)">
          <span>共</span>
          <span class="text-primary relative" data-suffix="条">304</span>
        </hl-group>
      </hl-group>
    </hl-group>

    <hl-group class="m-t-md" full="full-x" gap="var(--sm)">
      <hl-group dir="vertical" align="items-middle" full class="p-xxs border border-dark transition">
        <h2 class="font-din m-b-xxs text-warning">67</h2>
        <hl-group full align="items-center" class="p-t-xxs p-b-xxs text-secondary" style="background-color: rgba(var(--rgb-bg-light), 0.24)" gap="var(--xxs)"> 故障 </hl-group>
      </hl-group>
      <hl-group dir="vertical" align="items-middle" full class="p-xxs border border-dark transition">
        <h2 class="font-din m-b-xxs text-success">23</h2>
        <hl-group full align="items-center" class="p-t-xxs p-b-xxs text-secondary" style="background-color: rgba(var(--rgb-bg-light), 0.24)" gap="var(--xxs)"> 正常 </hl-group>
      </hl-group>
      <hl-group dir="vertical" align="items-middle" full class="p-xxs border border-dark transition">
        <h2 class="font-din m-b-xxs text-danger">10</h2>
        <hl-group full align="items-center" class="p-t-xxs p-b-xxs text-secondary" style="background-color: rgba(var(--rgb-bg-light), 0.24)" gap="var(--xxs)"> 报警 </hl-group>
      </hl-group>
    </hl-group>
  </hv-panel>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ScrollingBarChart from '../charts/custom-charts/scrolling-bar-chart.vue'

export default defineComponent({
  components: {
    ScrollingBarChart,
  },

  setup() {
    const chartData = [
      { value: 55, label: '大客流' },
      { value: 69, label: '人员聚集' },
      { value: 50, label: '明火烟雾' },
      { value: 20, label: '打架斗殴' },
      { value: 26, label: '小孩走失' },
      { value: 87, label: '非法越界' },
    ]
    return {
      chartData,
    }
  },
})
</script>
