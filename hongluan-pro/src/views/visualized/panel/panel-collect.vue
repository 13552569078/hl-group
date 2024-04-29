<template show-source>
  <hv-panel title="信息集成卡片1">
    <hl-group class="m-t-md" full="full-x" gap="var(--md)">
      <hb-data-collect class="border" gap="var(--sm)" padding="var(--sm)" full="full-x">
        <cite class="dom-frame">
          <cite class="dom-frame"></cite>
        </cite>
        <hl-icon fill class="symbol static" size="xl">
          <fill-Firm />
        </hl-icon>
        <hl-group dir="vertical">
          <hl-group align="items-middle">
            <h2 class="title font-din">2843.25</h2>
          </hl-group>
          <span class="text-secondary font-md">月度用气量</span>
        </hl-group>
      </hb-data-collect>

      <hb-data-collect class="border" gap="var(--sm)" padding="var(--sm)" full="full-x">
        <cite class="dom-frame">
          <cite class="dom-frame"></cite>
        </cite>
        <hl-icon fill class="symbol static" size="xl">
          <fill-TreemenuAdd />
        </hl-icon>
        <hl-group dir="vertical">
          <hl-group align="items-middle">
            <h2 class="title font-din">345.15</h2>
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
