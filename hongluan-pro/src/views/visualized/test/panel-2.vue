<template>
  <hv-panel title="监测布控">
    <template #action> </template>
    <hl-group align="items-between" class="ornament-title bg-light m-t-lg p-r-md">
      <span>监测主体</span>
      <hl-group align="items-middle" class="static" gap="var(--sm)">
        <hl-group align="items-middle" gap="var(--sm)">
          <span>共</span>
          <span class="text-primary relative" data-suffix="个">25</span>
        </hl-group>
        <hl-group align="items-middle" gap="var(--sm)">
          <span>已选择</span>
          <span class="text-success relative" data-suffix="个">12</span>
        </hl-group>
      </hl-group>
      <hl-group merge indent>
        <hl-button size="sm">全选</hl-button>
        <hl-button size="sm">清除</hl-button>
      </hl-group>
    </hl-group>
    <hl-row layout="grid" count="count-3" class="m-t-md" gap="var(--sm)">
      <hl-col span="col">
        <hl-checkbox class="w-full" v-model="danageType" label="0" custom>
          <hl-group dir="vertical" align="items-middle" full class="p-xxs border checked:border-success transition">
            <h4 class="font-din m-b-xxs checked:text-success">67</h4>
            <hl-group full align="items-center" class="p-t-xxs p-b-xxs bg-hover checked:bg-success-opacity-2 checked:bounce-enter" gap="var(--xxs)">
              <span class="static">重点景区</span>
            </hl-group>
          </hl-group>
        </hl-checkbox>
      </hl-col>
      <hl-col span="col">
        <hl-checkbox class="w-full" v-model="danageType" label="1" custom>
          <hl-group dir="vertical" align="items-middle" full class="p-xxs border checked:border-success transition">
            <h4 class="font-din m-b-xxs checked:text-success">23</h4>
            <hl-group full align="items-center" class="p-t-xxs p-b-xxs bg-hover checked:bg-success-opacity-2 checked:bounce-enter" gap="var(--xxs)">
              <span class="static">居民小区</span>
            </hl-group>
          </hl-group>
        </hl-checkbox>
      </hl-col>
      <hl-col span="col">
        <hl-checkbox class="w-full" v-model="danageType" label="2" custom>
          <hl-group dir="vertical" align="items-middle" full class="p-xxs border checked:border-success transition">
            <h4 class="font-din m-b-xxs checked:text-success">10</h4>
            <hl-group full align="items-center" class="p-t-xxs p-b-xxs bg-hover checked:bg-success-opacity-2 checked:bounce-enter" gap="var(--xxs)">
              <span class="static">综合体</span>
            </hl-group>
          </hl-group>
        </hl-checkbox>
      </hl-col>
      <hl-col span="col">
        <hl-checkbox class="w-full" v-model="danageType" label="3" custom>
          <hl-group dir="vertical" align="items-middle" full class="p-xxs border checked:border-success transition">
            <h4 class="font-din m-b-xxs checked:text-success">16</h4>
            <hl-group full align="items-center" class="p-t-xxs p-b-xxs bg-hover checked:bg-success-opacity-2 checked:bounce-enter" gap="var(--xxs)">
              <span class="static">河道</span>
            </hl-group>
          </hl-group>
        </hl-checkbox>
      </hl-col>
      <hl-col span="col">
        <hl-checkbox class="w-full" v-model="danageType" label="4" custom>
          <hl-group dir="vertical" align="items-middle" full class="p-xxs border checked:border-success transition">
            <h4 class="font-din m-b-xxs checked:text-success">28</h4>
            <hl-group full align="items-center" class="p-t-xxs p-b-xxs bg-hover checked:bg-success-opacity-2 checked:bounce-enter" gap="var(--xxs)">
              <span class="static">易涝点</span>
            </hl-group>
          </hl-group>
        </hl-checkbox>
      </hl-col>
      <hl-col span="col">
        <hl-checkbox class="w-full" v-model="danageType" label="5" custom>
          <hl-group dir="vertical" align="items-middle" full class="p-xxs border checked:border-success transition">
            <h4 class="font-din m-b-xxs checked:text-success">586</h4>
            <hl-group full align="items-center" class="p-t-xxs p-b-xxs bg-hover checked:bg-success-opacity-2 checked:bounce-enter" gap="var(--xxs)">
              <span class="static">地下管线</span>
            </hl-group>
          </hl-group>
        </hl-checkbox>
      </hl-col>
    </hl-row>

    <hl-group align="items-between" class="ornament-title bg-light m-t-lg p-r-md">
      <span>监测点</span>
      <hl-group align="items-middle" class="static" gap="var(--sm)">
        <hl-group align="items-middle" gap="var(--sm)">
          <span>共</span>
          <span class="text-primary relative" data-suffix="个">125</span>
        </hl-group>
        <hl-group align="items-middle" gap="var(--sm)">
          <span>已选择</span>
          <span class="text-success relative" data-suffix="个">74</span>
        </hl-group>
        <hl-group merge indent>
          <hl-button size="sm">全选</hl-button>
          <hl-button size="sm">清除</hl-button>
        </hl-group>
      </hl-group>
    </hl-group>

    <hl-row layout="grid" count="count-2" gap="var(--xs)" class="m-t-md">
      <hl-col v-for="(item, index) in list" :key="index" span="col">
        <hl-checkbox class="w-full" v-model="danageType" label="0" custom>
          <hb-data-collect full="full-x" padding-x="var(--sm)" padding-y="var(--xxs)" class="border checked:border-primary  checked:bg-success-opacity-1 radius-none">
            <span class="text-secondary font-md checked:text-primary">{{ item.label }}</span>
            <hl-group align="items-middle" class="static" gap="var(--xs)">
              <h4 class="font-din relative" :data-suffix="item.unit">{{ item.val }}</h4>
            </hl-group>
          </hb-data-collect>
        </hl-checkbox>
      </hl-col>
    </hl-row>

    <hl-group align="items-between" class="ornament-title bg-light m-t-lg p-r-md">
      <span>监测设备</span>
    </hl-group>
    <hl-group dir="vertical" full gap="var(--sm)" class="m-t-sm">
      <hb-data-collect class="border" full="full-x" gap="var(--sm)" padding="var(--sm)">
        <cite class="dom-frame"><cite class="dom-frame"></cite></cite>
        <hl-icon size="lg" fill class="symbol">
          <fill-Monitor />
        </hl-icon>
        <span class="text-secondary font-md">监控视频</span>
        <hl-group align="items-right" gap="var(--lg)">
          <hl-group align="items-middle" class="static" gap="var(--xs)">
            <span class="text-secondary">共</span>
            <h3 class="font-lg text-primary">281</h3>
            <span class="text-secondary">路</span>
          </hl-group>
          <hl-group align="items-middle" class="static" gap="var(--xs)">
            <span class="text-secondary">已选择</span>
            <h3 class="font-lg text-primary">38</h3>
            <span class="text-secondary">路</span>
          </hl-group>
        </hl-group>
      </hb-data-collect>
      <hb-data-collect class="border" full="full-x" gap="var(--sm)" padding="var(--sm)">
        <cite class="dom-frame"><cite class="dom-frame"></cite></cite>
        <hl-icon size="lg" fill class="symbol">
          <fill-Monitor />
        </hl-icon>
        <span class="text-secondary font-md">物联设备</span>
        <hl-group align="items-right" gap="var(--lg)">
          <hl-group align="items-middle" class="static" gap="var(--xs)">
            <span class="text-secondary">共</span>
            <h3 class="font-lg text-primary">281</h3>
            <span class="text-secondary">个</span>
          </hl-group>
          <hl-group align="items-middle" class="static" gap="var(--xs)">
            <span class="text-secondary">已选择</span>
            <h3 class="font-lg text-primary">08</h3>
            <span class="text-secondary">个</span>
          </hl-group>
        </hl-group>
      </hb-data-collect>
    </hl-group>
  </hv-panel>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const data = ref([
      {
        eventTitle: '迎泽区新建路二社区燃气泄漏',
        eventTime: '2021/9/15',
        id: 1,
      },
      {
        eventTitle: '解放路韶九巷燃气泄漏',
        eventTime: '2021/8/15',
        id: 2,
      },
      {
        eventTitle: '前所街住宅小区燃气泄漏',
        eventTime: '2021/7/3',
        id: 3,
      },
      {
        eventTitle: '崔家巷羊肉汤馆燃气泄漏',
        eventTime: '2021/5/23',
        id: 4,
      },
    ])
    const list = ref([
      { label: '人员聚集', val: '12' },
      { label: '大客流', val: '35' },
      { label: '打架斗殴', val: '59' },
      { label: '人员落水', val: '108' },
      { label: '消防通道占用', val: '108' },
      { label: '明火烟雾', val: '108' },
      { label: '道路遗撒', val: '108' },
      { label: '人员落水', val: '108' },
    ])

    return {
      data,
      list,
    }
  },
})
</script>
<style lang="scss" scoped></style>

