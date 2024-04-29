<template>
  <hv-panel title="报警分布">
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

    <hl-row layout="grid" count="count-2" gap="var(--md)" class="m-t-lg">
      <hl-col v-for="(item, index) in list" :key="index" span="col">
        <hb-data-collect align="items-between" class="border" full="full-x" padding-x="var(--sm)" padding-y="var(--xxs)">
          <cite class="dom-frame"><cite class="dom-frame"></cite></cite>
          <span class="text-secondary font-md">{{ item.label }}</span>
          <hl-group align="items-middle" class="static">
            <em class="font-lg font-bold font-din title">{{ item.val }}</em>
            <span class="text-secondary font-md m-l-xxs">{{ item.unit }}</span>
          </hl-group>
        </hb-data-collect>
      </hl-col>
    </hl-row>

    <hl-radio-group gap="var(--xs)" full v-model="radio1" class="m-t-lg" custom>
      <hl-radio label="按级别">
        <hl-button size="sm" block>按级别</hl-button>
      </hl-radio>
      <hl-radio label="按类型">
        <hl-button size="sm" block>按类型</hl-button>
      </hl-radio>
      <hl-radio label="按主体分组">
        <hl-button size="sm" block>按主体分组</hl-button>
      </hl-radio>
      <hl-radio label="按处置方式">
        <hl-button size="sm" block>按处置方式</hl-button>
      </hl-radio>
    </hl-radio-group>
    <hl-group style="height: calc(var(--xxs) * 50)" full="full-x" class="m-t-md">
      <chart-pie1 />
    </hl-group>
    <hl-radio-group gap="var(--xs)" full v-model="radio2" class="m-t-md" custom>
      <hl-radio label="按趋势">
        <hl-button size="sm" block>按趋势</hl-button>
      </hl-radio>
      <hl-radio label="按时段">
        <hl-button size="sm" block>按时段</hl-button>
      </hl-radio>
    </hl-radio-group>
    <hl-group style="height: calc(var(--xxs) * 45)" full="full-x" class="m-t-md">
      <chart-line />
    </hl-group>
  </hv-panel>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import chartPie1 from '../charts/chart-pie1.vue'
import chartLine from '../charts/chart-line2.vue'
export default defineComponent({
  components: {
    chartPie1,
    chartLine,
  },
  setup() {
    const radio = ref('近7天')
    const radio1 = ref('按类型')
    const radio2 = ref('按趋势')

    const list = ref([
      { label: '自动办结', val: '85' },
      { label: '处置中', val: '52' },
      { label: '待研判', val: '12' },
      { label: '误报', val: '2' },
      { label: '接报数', val: '66' },
      { label: '处置中心办结', val: '25' },
    ])
    return {
      radio,
      radio1,
      radio2,
      list,
    }
  },
})
</script>
