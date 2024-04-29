<template>
  <hl-col span="col-24">
    <hl-panel class="panel-card" borderless>
      <template #header>
        <div class="panel-header-left">
          <hl-icon size="lg">
            <svg viewBox="0 0 27 16" xmlns="http://www.w3.org/2000/svg">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g fill="#71F8FC">
                  <polygon fill-opacity="0.4" points="7.66666667 0 11 0 3.33333333 16 5.69405634e-14 16" />
                  <polygon fill-opacity="0.7" points="15.6666667 0 19 0 11.3333333 16 8 16" />
                  <polygon points="23.6666667 0 27 0 19.3333333 16 16 16" />
                </g>
              </g>
            </svg>
          </hl-icon>
        </div>
        <h2 class="panel-title">监测概览</h2>
      </template>
      <hl-group align="items-middle" gap="var(--xxs)" class="m-t-md m-b-md">
        <span class="text-secondary">当前监测主体</span>
        <em class="font-xl font-bold font-din">12</em>
        <span class="text-secondary">个</span>
      </hl-group>
      <hl-group gap="var(--xs)" full="full-x">
        <hl-radio-group v-model="types.active" gap="var(--xs)" custom wrap>
          <hl-radio v-for="item in types.content" :key="item.key" :label="item.key">
            <hl-button class="sm">
              <span :class="[types.active === item.key ? '' : 'text-secondary']">{{ item.label }}</span>
              <em :class="[types.active === item.key ? '' : 'text-secondary', 'font-lg', 'font-bold', 'font-din', 'm-l-sm']">{{ item.val }}</em>
            </hl-button>
          </hl-radio>
        </hl-radio-group>
      </hl-group>
      <div class="ornament-title bg-light font-xl m-t-lg">全部监测主体</div>
      <hl-group class="m-t-lg" full="full-x" gap="var(--sm)" dir="vertical">
        <div class="ornament-sub-title font-lg">监测设备</div>
        <hl-group dir="vertical" gap="var(--sm)" class="m-t-sm">
          <hb-data-collect
            v-for="(item, index) in list"
            :key="index"
            class="data-collect border"
            full="full-x"
            gap="var(--sm)"
            padding="var(--sm)"
          >
            <cite class="dom-frame"><cite class="dom-frame"></cite></cite>
            <hl-icon size="lg" fill class="symbol">
              <fill-Monitor />
            </hl-icon>
            <span class="text-secondary font-md">{{ item.label }}</span>
            <hl-group align="items-middle items-right" class="static" gap="var(--xs)">
              <h2 class="font-din relative" :data-suffix="item.unit">{{ item.val }}</h2>
            </hl-group>
          </hb-data-collect>
        </hl-group>
      </hl-group>
      <hl-group gap="var(--md)" align="items-middle" class="m-t-lg">
        <div class="ornament-sub-title font-lg">预警事件</div>
        <span class="text-secondary font-sm">*预警事件总数为自上线以来平台产生的数据</span>
      </hl-group>
      <hl-group full="full-x" gap="var(--sm)" class="m-t-md">
        <hl-group class="border" align="items-middle">
          <span class="static bg-light p-x-sm p-y-xxs">已办结</span>
          <span class="w-full text-center font-din font-xl text-secondary">3</span>
        </hl-group>
        <hl-group class="border border-warning-light-3" align="items-middle">
          <span class="static bg-warning-opacity-1 p-x-sm p-y-xxs">处置中</span>
          <span class="w-full text-center font-din font-xl text-warning">42</span>
        </hl-group>
        <hl-group class="border border-success-light-3" align="items-middle">
          <span class="static bg-success-opacity-1 p-x-sm p-y-xxs">待研判</span>
          <span class="w-full text-center font-din font-xl text-success">98</span>
        </hl-group>
      </hl-group>
      <hl-group style="height: calc(var(--xxs) * 50)" full="full-x" class="m-t-md">
        <chart-pie1 />
      </hl-group>
      <div class="ornament-sub-title font-lg m-t-lg">应急资源</div>
    </hl-panel>
  </hl-col>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import chartPie1 from '../charts/chart-pie1.vue'

export default defineComponent({
  name: 'MonitorEventIndex',
  components: {
    chartPie1,
  },
  setup() {
    const types = reactive({
      active: 'all',
      content: [
        { label: '全部', key: 'all', val: '217' },
        { label: '居民小区', key: '1', val: '24' },
        { label: '大型餐饮', key: '2', val: '217' },
        { label: '自动换行', key: '3', val: '412' },
      ],
    })
    const list = ref([
      { label: '共接入视频监控设备', val: '45', unit: '台' },
      { label: '其中用于视频分析设备', val: '32', unit: '台' },
      { label: '共接入物联设备', val: '32', unit: '台', val2: '3', unit2: '类' },
    ])

    return {
      types,
      list,
    }
  },
})
</script>
