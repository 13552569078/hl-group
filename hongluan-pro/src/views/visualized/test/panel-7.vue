<template>
  <hv-panel title="研判结果">
    <template #action> </template>
    <hl-group align="items-between" class="ornament-title bg-light m-t-lg p-r-md">
      <span>今日研判</span>
    </hl-group>
    <hl-row layout="grid" count="count-2" class="m-t-md" gap="var(--md)">
      <hl-col span="col">
        <hb-data-collect padding="0" gap="var(--md)" full="full-x">
          <hl-icon fill color="#FFA5A5" class="symbol static icon-bg-rhombus-red" size="xl" width="calc(var(--xxs) * 18)" height="calc(var(--xxs) * 18)">
            <h5 class="font-din self-top m-t-sm">87.1%</h5>
          </hl-icon>
          <hl-group dir="vertical">
            <hl-group align="items-middle" gap="var(--xs)">
              <h3 class="title font-din text-warning">60</h3>
              <span>/</span>
              <h3 class="title font-din">69</h3>
            </hl-group>
            <span class="text-secondary font-md">研判率</span>
          </hl-group>
        </hb-data-collect>
      </hl-col>
      <hl-col span="col">
        <hb-data-collect padding="0" gap="var(--md)" full="full-x">
          <hl-icon fill color="#FFD0AB" class="symbol static icon-bg-rhombus-orange" size="xl" width="calc(var(--xxs) * 18)" height="calc(var(--xxs) * 18)">
            <h5 class="font-din self-top m-t-sm">3.1%</h5>
          </hl-icon>
          <hl-group dir="vertical">
            <hl-group align="items-middle" gap="var(--xs)">
              <h3 class="title font-din text-danger">5</h3>
              <span>/</span>
              <h3 class="title font-din">69</h3>
            </hl-group>
            <span class="text-secondary font-md">误报率</span>
          </hl-group>
        </hb-data-collect>
      </hl-col>
    </hl-row>

    <hl-group align="items-between" class="ornament-title bg-light m-t-lg p-r-md">
      <span>近期研判结果统计</span>
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
    </hl-group>

    <hl-radio-group v-model="radio" full custom gap="var(--sm)" class="m-t-md">
      <hl-radio label="按研判结果">
        <hl-button size="sm" block>按研判结果</hl-button>
      </hl-radio>
      <hl-radio label="按研判方式">
        <hl-button size="sm" block>按研判方式</hl-button>
      </hl-radio>
    </hl-radio-group>
    <hl-group full="full-x">
      <chart-pie1 />
    </hl-group>
  </hv-panel>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import chartPie1 from '../charts/chart-pie1.vue'

export default defineComponent({
  components: {
    chartPie1,
  },

  setup() {
    return {}
  },
})
</script>
