<template show-source>
  <hv-panel title="信息集成卡片6">
    <hl-group dir="vertical" class="m-t-md" full="full-x" gap="var(--md)">
      <hb-data-collect v-for="(item, index) in list" :key="index" gap="var(--sm)" class="border">
        <cite class="dom-frame"><cite class="dom-frame"></cite></cite>
        <hl-icon :type="`level${item.level}`" effect="light" fill class="symbol static" size="lg" padding="var(--sm)">
          <fill-Firm />
        </hl-icon>
        <span :class="`text-level${item.level} w-full`">{{ item.label }}</span>
        <hl-group class="static" gap="var(--xs)">
          <h2 class="font-din relative" data-suffix="个">{{ item.val }}</h2>
        </hl-group>
      </hb-data-collect>
    </hl-group>
  </hv-panel>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {},
  setup() {
    const list = ref([
      { label: '重大风险', val: '12', level: 1 },
      { label: '较大风险', val: '35', level: 2 },
      { label: '一般风险', val: '59', level: 3 },
      { label: '低风险', val: '108', level: 4 },
    ])

    return {
      list,
    }
  },
})
</script>
