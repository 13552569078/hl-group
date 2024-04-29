<template>
  <hv-panel title="研判分析">
    <template #action> </template>
    <hl-group align="items-between" class="ornament-title bg-light m-t-lg p-r-md">
      <span>待人工研判</span>
      <hl-group align="items-middle" class="static" gap="var(--sm)">
        <hl-group align="items-middle" gap="var(--xxs)">
          <span class="text-secondary">共</span>
          <span class="text-primary relative" data-suffix="条">25</span>
        </hl-group>
      </hl-group>
    </hl-group>
    <hl-radio-group v-model="radio" full custom gap="var(--sm)" class="m-t-md">
      <hl-radio label="按报警类型">
        <hl-button size="sm" block>按报警类型</hl-button>
      </hl-radio>
      <hl-radio label="按监测主体">
        <hl-button size="sm" block>按监测主体</hl-button>
      </hl-radio>
    </hl-radio-group>
    <chart-bar2 height="calc(var(--xxs) * 45" />
  </hv-panel>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ChartBar2 from '../charts/chart-bar2.vue'

export default defineComponent({
  components: {
    ChartBar2,
  },

  setup() {
    return {}
  },
})
</script>
