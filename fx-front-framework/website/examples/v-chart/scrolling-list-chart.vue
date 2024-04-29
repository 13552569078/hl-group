<template>
  <fx-v-scrolling-list-chart
      height="200px"
      :chart-data="chartData"
      :bar-style="{ color: 'linear-gradient(270deg, #2EF4FF 0%, rgba(44,218,249,0.17) 100%)', width: '1em', backgroundColor: 'none' }"
    >
      <template #label="{ row }">
        <div style="width: calc(var(--xxl) * 4.9 )">
          <hl-group gap-x="var(--md)" align="items-middle" style="padding-left: var(--md)">
            <hl-icon size="xl" class="symbol" :type="`level${row.index + 1}`" style="position:relative;">
              <span
                :style="{ position: 'absolute', color: row.index > 2 ? '#71F8FC' : '#FFFFFF', textShadow: '0 0 6px rgba(113,248,252,0.60)' }"
                class="font-md font-din"
              >{{ row.index + 1 }}</span>
              <fill-heart v-show="row.index < 3" :src="two-heart" />
            </hl-icon>
            <div class="label m-r-xl ellipsis" style="width: calc(var(--xxl) * 2.8 )">{{ row.label }}</div>
          </hl-group>
        </div>
      </template>
    </fx-v-scrolling-list-chart>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const chartData = [
      { label: "华新燃气集团物业", value: 10, index: 0 },
      { label: "三山四季物业", value: 20, index: 1 },
      { label: "2004", value: 60, index: 2 },
      { label: "2006", value: 40, index: 3 },
      { label: "2008", value: 80, index: 4 },
      { label: "2010", value: 60, index: 5 },
      { label: "2012", value: 70, index: 6 },
      { label: "2014", value: 10, index: 7 },
      { label: "2016", value: 50, index: 8 },
      { label: "2018", value: 10, index: 9 },
      { label: "2020", value: 50, index: 10 },
    ]
    return {
      chartData,
    }
  },
})
</script>
