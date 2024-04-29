<template show-source>
  <hv-panel title="信息集成卡片3">
    <hl-group class="m-t-md" full="full-x" gap="var(--md)">
      <hb-data-collect gap="var(--md)" full="full-x" padding-x="0" padding-y="var(--sm)">
        <hl-icon fill class="symbol static icon-bg-rhombus" size="xl" width="calc(var(--xxs) * 18)" height="calc(var(--xxs) * 18)">
          <fill-Firm />
        </hl-icon>
        <hl-group dir="vertical">
          <hl-group align="items-middle">
            <h1 class="title font-din" style="--suffix-offset: -0.23em" data-suffix="个">1</h1>
          </hl-group>
          <span class="text-secondary font-md">总体预案</span>
        </hl-group>
      </hb-data-collect>

      <hb-data-collect gap="var(--md)" full="full-x" padding-x="0" padding-y="var(--sm)">
        <hl-icon fill class="symbol static icon-bg-rhombus" size="xl" width="calc(var(--xxs) * 18)" height="calc(var(--xxs) * 18)">
          <fill-TreemenuAdd />
        </hl-icon>
        <hl-group dir="vertical">
          <hl-group align="items-middle">
            <h1 class="title font-din" style="--suffix-offset: -0.23em" data-suffix="个">345</h1>
          </hl-group>
          <span class="text-secondary font-md">今日供气量</span>
        </hl-group>
      </hb-data-collect>
    </hl-group>
  </hv-panel>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
  setup() {
    return {}
  },
})
</script>
