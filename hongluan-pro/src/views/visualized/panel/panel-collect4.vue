<template show-source>
  <hv-panel title="信息集成卡片4">
    <hl-row layout="grid" count="count-2" class="m-t-md" gap="var(--md)">
      <hl-col span="col">
        <hb-data-collect padding="0" gap="var(--md)" full="full-x">
          <hl-icon fill gradient start-color="#fff" color="#FFA5A5" class="symbol static icon-bg-rhombus-red" size="xl" width="calc(var(--xxs) * 18)" height="calc(var(--xxs) * 18)">
            <fill-Notice />
          </hl-icon>
          <hl-group dir="vertical">
            <hl-group align="items-middle">
              <h2 class="title font-din" style="--suffix-offset: -0.23em" data-suffix="个">1</h2>
            </hl-group>
            <span class="text-secondary font-md">重大风险</span>
          </hl-group>
        </hb-data-collect>
      </hl-col>
      <hl-col span="col">
        <hb-data-collect padding="0" gap="var(--md)" full="full-x">
          <hl-icon fill gradient start-color="#fff" color="#FFD0AB" class="symbol static icon-bg-rhombus-orange" size="xl" width="calc(var(--xxs) * 18)" height="calc(var(--xxs) * 18)">
            <fill-Notice />
          </hl-icon>
          <hl-group dir="vertical">
            <hl-group align="items-middle">
              <h2 class="title font-din" style="--suffix-offset: -0.23em" data-suffix="个">345</h2>
            </hl-group>
            <span class="text-secondary font-md">较大风险</span>
          </hl-group>
        </hb-data-collect>
      </hl-col>
      <hl-col span="col">
        <hb-data-collect padding="0" gap="var(--md)" full="full-x">
          <hl-icon fill gradient start-color="#fff" color="#FFF392" class="symbol static icon-bg-rhombus-yellow" size="xl" width="calc(var(--xxs) * 18)" height="calc(var(--xxs) * 18)">
            <fill-Notice />
          </hl-icon>
          <hl-group dir="vertical">
            <hl-group align="items-middle">
              <h2 class="title font-din" style="--suffix-offset: -0.23em" data-suffix="个">345</h2>
            </hl-group>
            <span class="text-secondary font-md">一般风险</span>
          </hl-group>
        </hb-data-collect>
      </hl-col>
      <hl-col span="col">
        <hb-data-collect padding="0" gap="var(--md)" full="full-x">
          <hl-icon fill gradient start-color="#fff" color="#9BCCFF" class="symbol static icon-bg-rhombus-blue" size="xl" width="calc(var(--xxs) * 18)" height="calc(var(--xxs) * 18)">
            <fill-Notice />
          </hl-icon>
          <hl-group dir="vertical">
            <hl-group align="items-middle">
              <h2 class="title font-din" style="--suffix-offset: -0.23em" data-suffix="个">345</h2>
            </hl-group>
            <span class="text-secondary font-md">低风险</span>
          </hl-group>
        </hb-data-collect>
      </hl-col>
    </hl-row>
    <div class="ornament-title bg-light font-xl m-t-md items-between p-r-md">
      <span>风险分布统计</span>
      <hl-radio-group v-model="showCard" custom merge indent @change="toggleCard(true)">
        <hl-radio label="0">
          <hl-button size="sm" class="w-xs">
            行政区划
          </hl-button>
        </hl-radio>
        <hl-radio label="1">
          <hl-button size="sm" class="w-xs">
            类型
          </hl-button>
        </hl-radio>
      </hl-radio-group>
    </div>
    <div class="toggle-panel m-t-md" style="height: calc(var(--xl) * 6)">
      <div :class="['card-1', showCard == '0' ? 'show' : '']">
        <chart-bar2 :chart-data="bar2Data" height="calc(var(--xl) * 6)" />
      </div>
      <div :class="['card-2', showCard == '1' ? 'show' : '']">
        <hl-button @click="toggleCard(true)">面板2</hl-button>
      </div>
    </div>
  </hv-panel>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import chartBar2 from '../charts/chart-bar2.vue'

export default defineComponent({
  components: {
    chartBar2,
  },
  setup() {
    const showCard = ref('0')
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
      showCard,
      bar2Data,
    }
  },
})
</script>
