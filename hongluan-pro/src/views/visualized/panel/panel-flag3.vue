<template show-source>
  <hv-panel title="旗帜卡片3">
    <hl-checkbox-group v-model="checkboxGroup" dir="vertical" custom class="w-full">
      <hl-checkbox label="1" class="w-full">
        <hl-group class="card-flag left m-t-md checked:bg-hover checked:border-primary" style="--card-padding: var(--md)" full="full-x" align="items-middle items-between">
          <span class="text-secondary">全部事件</span>
          <hl-group align="items-middle" gap="var(--xxs)" class="text-danger static">
            <h2 class="font-din m-r-md">1031</h2>
            <hl-icon size="xxs">
              <two-move-up />
            </hl-icon>
            <span>6%</span>
          </hl-group>
        </hl-group>
      </hl-checkbox>
    </hl-checkbox-group>
    <hl-group full="full-x" gap="var(--md)" class="m-t-md">
      <hl-group class="card-flag" style="--card-padding-x: var(--xs); --card-padding-y: var(--md)" full="full-x" align="items-middle" dir="vertical">
        <span class="text-secondary">集贸市场</span>
        <h2 class="font-din m-t-xxs">78</h2>
        <hl-group align="items-middle" gap="var(--xxs)" class="text-danger">
          <hl-icon size="xxs">
            <two-move-up />
          </hl-icon>
          <span>6%</span>
        </hl-group>
      </hl-group>
      <hl-group class="card-flag" style="--card-padding-x: var(--xs); --card-padding-y: var(--md)" full="full-x" align="items-middle" dir="vertical">
        <span class="text-secondary">集贸市场</span>
        <h2 class="font-din m-t-xxs">78</h2>
        <hl-group align="items-middle" gap="var(--xxs)" class="text-danger">
          <hl-icon size="xxs">
            <two-move-up />
          </hl-icon>
          <span>6%</span>
        </hl-group>
      </hl-group>
      <hl-group class="card-flag" style="--card-padding-x: var(--xs); --card-padding-y: var(--md)" full="full-x" align="items-middle" dir="vertical">
        <span class="text-secondary">集贸市场</span>
        <h2 class="font-din m-t-xxs">78</h2>
        <hl-group align="items-middle" gap="var(--xxs)" class="text-success">
          <hl-icon size="xxs">
            <two-move-down />
          </hl-icon>
          <span>6%</span>
        </hl-group>
      </hl-group>
      <hl-group class="card-flag" style="--card-padding-x: var(--xs); --card-padding-y: var(--md)" full="full-x" align="items-middle" dir="vertical">
        <span class="text-secondary">集贸市场</span>
        <h2 class="font-din m-t-xxs">78</h2>
        <hl-group align="items-middle" gap="var(--xxs)" class="text-danger">
          <hl-icon size="xxs">
            <two-move-up />
          </hl-icon>
          <span>6%</span>
        </hl-group>
      </hl-group>
    </hl-group>
  </hv-panel>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {},
  setup() {
    const checkboxGroup = ref(['1'])
    return {
      checkboxGroup,
    }
  },
})
</script>
