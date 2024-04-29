<template>
  <hv-panel title="主体概览">
    <template #action>
      <h3 class="font-din text-danger">10</h3>
    </template>
    <hl-group full="full-x" gap="var(--md)" class="m-t-md">
      <hl-group class="card-flag" style="--card-padding-x: var(--xs); --card-padding-y: var(--md)" full="full-x" align="items-middle" dir="vertical">
        <span class="text-secondary">监测点</span>
        <h2 class="font-din m-t-xxs">40</h2>
      </hl-group>
      <hl-group class="card-flag" style="--card-padding-x: var(--xs); --card-padding-y: var(--md)" full="full-x" align="items-middle" dir="vertical">
        <span class="text-secondary">视频监控</span>
        <h2 class="font-din m-t-xxs">40</h2>
      </hl-group>
      <hl-group class="card-flag" style="--card-padding-x: var(--xs); --card-padding-y: var(--md)" full="full-x" align="items-middle" dir="vertical">
        <span class="text-secondary">传感设备</span>
        <h2 class="font-din m-t-xxs">378</h2>
      </hl-group>
    </hl-group>
    <hl-row layout="grid" count="count-2" gap="var(--xs)" class="m-t-md">
      <hl-col v-for="(item, index) in list" :key="index" span="col">
        <hb-data-collect full="full-x" padding-x="var(--sm)" padding-y="var(--xs)" :style="`background-color:rgba(var(--rgb-level${item.level}), 0.04)`">
          <hl-icon size="md" class="symbol" :type="`level${item.level}`" style="position: relative" :style="`filter: drop-shadow(0 2px 8px rgba(var(--rgb-level${item.level}), 0.3);`">
            <fill-home />
          </hl-icon>
          <span class="text-secondary font-md m-l-sm">{{ item.label }}</span>
          <hl-group align="items-middle" class="static" gap="var(--xs)">
            <h4 class="font-din relative" :data-suffix="item.unit">{{ item.val }}</h4>
          </hl-group>
        </hb-data-collect>
      </hl-col>
    </hl-row>
  </hv-panel>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  components: {},

  setup() {
    const list = ref([
      { label: '人员聚集', val: '12', level: 1 },
      { label: '明火烟雾', val: '35', level: 2 },
      { label: '大客流', val: '59', level: 3 },
      { label: '打架斗殴', val: '108', level: 4 },
    ])

    return {
      list,
    }
  },
})
</script>
