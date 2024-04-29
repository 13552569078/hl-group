<template>
  <div class="dashboard-container">
    <hl-group class="first-row" gap="var(--md)">
      <hl-panel @click="$router.push({ name: 'panel-template' })">
        <p>面板模板</p>
      </hl-panel>
      <hl-panel @click="$router.push({ name: 'modal-template' })">
        <p>模态窗模板</p>
      </hl-panel>
      <hl-panel @click="$router.push({ name: 'chart-template' })">
        <p>图表模板</p>
      </hl-panel>
    </hl-group>
    <hl-group class="second-row m-t-md" gap="var(--md)">
      <hl-panel @click="$router.push({ name: '1920x1080' })">
        <p>1920 / 1080 示例</p>
      </hl-panel>
      <hl-panel @click="$router.push({ name: '1920*4x1080*2' })">
        <p>1920*4 / 1080*2 示例</p>
      </hl-panel>
      <hl-panel @click="$router.push({ name: '1920*4x1080*3' })">
        <p>1920*4 / 1080*3 示例</p>
      </hl-panel>
    </hl-group>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>
<style lang="scss" scoped>
.dashboard-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
  .first-row {
    .group-item {
      width: 120px
    }
  }
  .second-row {
    .group-item {
      width: 200px
    }
  }
  p {
    text-align: center;
  }
  .hl-panel {
    cursor: pointer;
  }
}
</style>
