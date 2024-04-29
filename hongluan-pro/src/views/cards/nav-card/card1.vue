<template>
  <hl-panel class="main-panel" padding="var(--xxl)" footer-padding="0" footer-class="items-left">
    <hl-group align="items-middle" full gap="var(--xxl)">
      <hl-thumb type="primary" size="xxxl" effect="light" radius class="static w-md h-md" />
      <hl-group dir="vertical" gap="var(--xl)">
        <hl-group align="items-between">
          <hl-group dir="vertical" gap="var(--xxs)">
            <h3>中国电子系统技术有限公司</h3>
            <span class="text-secondary">北京市海淀区万寿路华熙LIVE中心A座4-6</span>
          </hl-group>
          <hl-group gap="var(--sm)">
            <hl-button>申请白名单</hl-button>
            <hl-button type="primary">
              完善信息
              <template #icon>
                <hl-icon><two-edit /></hl-icon>
              </template>
            </hl-button>
          </hl-group>
        </hl-group>
        <hl-group full="full-x" align="items-middle items-between">
          <hl-group gap="var(--xl)">
            <hb-data-collect gap="var(--md)" padding="0">
              <hl-group dir="vertical">
                <span class="sub-title font-md">销售总额</span>
                <h2 class="title">13,647</h2>
              </hl-group>
            </hb-data-collect>
            <div class="border-left"></div>
            <hb-data-collect gap="var(--md)" padding="0">
              <hl-group dir="vertical">
                <span class="sub-title font-md">销售总额</span>
                <h2 class="title">13,647</h2>
              </hl-group>
            </hb-data-collect>
            <div class="border-left"></div>
            <hb-data-collect gap="var(--md)" padding="0">
              <hl-group dir="vertical">
                <span class="sub-title font-md">销售总额</span>
                <h2 class="title">13,647</h2>
              </hl-group>
            </hb-data-collect>
          </hl-group>
          <hl-progress show-as="line" :percentage="75" text="信息完善状态" stroke-width="var(--xxs)" class="max-w-xl min-w-md" />
        </hl-group>
      </hl-group>
    </hl-group>
    <template #footer>
      <hl-tabs v-model="activeName" type="line" tab-position="bottom" :show-pane="false" nav-height="calc(var(--xxs) * 18)" style="--tabs-border-color: transparent">
        <hl-tab-pane label="个人信息" name="first" />
        <hl-tab-pane label="账户信息" name="second" />
        <hl-tab-pane label="更改密码" name="third" />
        <hl-tab-pane label="电子邮箱设定" name="last" />
      </hl-tabs>
    </template>
  </hl-panel>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const activeName = ref('second')
    return {
      activeName,
    }
  },
})
</script>
