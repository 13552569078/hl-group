<template>
  <hl-panel class="main-panel" padding="var(--xxl)" footer-padding="var(--lg)" footer-class="items-left">
    <hl-group align="items-top" full gap="var(--xxl)">
      <hl-thumb type="primary" size="xxl" effect="light" radius class="static w-sm h-sm" />
      <hl-group dir="vertical" align="items-center" gap="var(--lg)">
        <hl-group align="items-between">
          <hl-group dir="vertical" gap="var(--xxs)">
            <h3>中国电子系统技术有限公司</h3>
            <span class="text-secondary">北京市海淀区万寿路华熙LIVE中心A座4-6</span>
          </hl-group>
        </hl-group>
        <hl-group gap="var(--lg)">
          <hl-button>申请白名单</hl-button>
          <hl-button>申请白名单</hl-button>
          <hl-button type="primary">
            完善信息
            <template #icon>
              <hl-icon><two-edit /></hl-icon>
            </template>
          </hl-button>
        </hl-group>
      </hl-group>
    </hl-group>
    <template #footer>
      <hl-group gap="calc(var(--xxl) * 2)">
        <hb-data-collect gap="var(--md)" padding="0">
          <hl-icon type="primary" effect="light" fill size="lg" radius><fill-book /></hl-icon>
          <hl-group dir="vertical">
            <span class="sub-title font-md" style="font-size: var(--pageFontSize-Md)">销售总额</span>
            <h4 class="title">13,647</h4>
          </hl-group>
        </hb-data-collect>
        <hb-data-collect gap="var(--md)" padding="0">
          <hl-icon type="danger" effect="light" fill size="lg" radius><fill-Layout /></hl-icon>
          <hl-group dir="vertical">
            <span class="sub-title font-md" style="font-size: var(--pageFontSize-Md)">销售总额</span>
            <h4 class="title">13,647</h4>
          </hl-group>
        </hb-data-collect>
        <hb-data-collect gap="var(--md)" padding="0">
          <hl-icon type="warning" effect="light" fill size="lg" radius><fill-RescueTeam /></hl-icon>
          <hl-group dir="vertical">
            <span class="sub-title font-md" style="font-size: var(--pageFontSize-Md)">销售总额</span>
            <h4 class="title">13,647</h4>
          </hl-group>
        </hb-data-collect>
      </hl-group>
    </template>
  </hl-panel>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
    }
  },
})
</script>
