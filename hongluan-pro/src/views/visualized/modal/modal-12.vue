<template show-source>
  <hv-modal title="监测事件详情4" width="calc(var(--xxl) * 12)">
    <hl-tabs v-model="activeName" type="line" nav-height="calc(var(--lg) * 2)" @tab-click="handleClick">
      <hl-tab-pane label="预警事件" name="1">
        <h4 class="ornament-sub-title m-b-md m-t-lg">视频监测设备</h4>
        <hl-row layout="grid" count="count-2" gap="var(--md)">
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
        <h4 class="ornament-sub-title m-b-md m-t-lg">物联网监测设备</h4>
        <hl-row layout="grid" count="count-2" gap="var(--md)">
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
      </hl-tab-pane>
      <hl-tab-pane label="处置进展" name="2">火狐浏览器</hl-tab-pane>
      <hl-tab-pane label="监测事件" name="3">欧朋浏览器</hl-tab-pane>
      <hl-tab-pane label="监测设备" name="4">欧朋浏览器</hl-tab-pane>
      <hl-tab-pane label="监测数据" name="5">欧朋浏览器</hl-tab-pane>
    </hl-tabs>
  </hv-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {},
  setup() {
    const activeName = ref('1')

    const list = ref([
      { label: '广角鹰眼', val: '45', unit: '台' },
      { label: '球技', val: '32', unit: '台' },
      { label: '枪机', val: '32', unit: '台' },
      { label: '全彩枪机', val: '32', unit: '台' },
    ])

    return {
      list,
      activeName,
    }
  },
})
</script>
