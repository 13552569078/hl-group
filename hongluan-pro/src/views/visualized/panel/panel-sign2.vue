<template>
  <hv-panel title="指示牌卡片2">
    <hl-group full="full-x" align="items-middle" gap="var(--md)" class="m-t-md">
      <hl-group full="full-x" align="items-middle" dir="vertical">
        <h2 class="font-din">78</h2>
        <span class="text-secondary">物联网电梯</span>
      </hl-group>
      <hl-group
        align="items-middle items-center"
        dir="vertical"
        class="static"
        style="
          border-radius: 100%;
          border:1px solid rgba(64,83,112,0.4);
          width: calc(var(--xxs) * 25);
          height: calc(var(--xxs) * 25);
          background-image: linear-gradient(180deg, rgba(113,248,252,0.1) 0%, rgba(0,0,0,0.00) 49%, rgba(113,248,252,0.1) 100%);
        "
      >
        <h1 class="font-din">232</h1>
        <span class="text-secondary">电梯总数</span>
      </hl-group>
      <hl-group full="full-x" align="items-middle" dir="vertical">
        <h2 class="font-din">16</h2>
        <span class="text-secondary">社会化电梯</span>
      </hl-group>
    </hl-group>
    <hl-group class="m-t-md" full="full-x" gap="var(--sm)">
      <hl-group dir="vertical" align="items-middle" full class="p-xxs border border-dark transition">
        <h2 class="font-din m-b-xxs text-warning">67</h2>
        <hl-group full align="items-center" class="p-t-xxs p-b-xxs text-secondary" style="background-color: rgba(var(--rgb-bg-light), 0.24)" gap="var(--xxs)"> 故障 </hl-group>
      </hl-group>
      <hl-group dir="vertical" align="items-middle" full class="p-xxs border border-dark transition">
        <h2 class="font-din m-b-xxs text-success">23</h2>
        <hl-group full align="items-center" class="p-t-xxs p-b-xxs text-secondary" style="background-color: rgba(var(--rgb-bg-light), 0.24)" gap="var(--xxs)"> 正常 </hl-group>
      </hl-group>
      <hl-group dir="vertical" align="items-middle" full class="p-xxs border border-dark transition">
        <h2 class="font-din m-b-xxs text-danger">10</h2>
        <hl-group full align="items-center" class="p-t-xxs p-b-xxs text-secondary" style="background-color: rgba(var(--rgb-bg-light), 0.24)" gap="var(--xxs)"> 报警 </hl-group>
      </hl-group>
    </hl-group>
  </hv-panel>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    return {}
  },
})
</script>
<style lang="scss" scoped>
</style>
