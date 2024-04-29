<template show-source>
  <hv-modal title="预警事件详情" width="calc(var(--xxl) * 12)">
    <hl-tabs v-model="activeName" class="m-t-lg" type="line" @tab-click="handleClick">
      <hl-tab-pane label="基本信息" name="1">
        <hl-timeline class="m-t-lg">
          <hl-timeline-item :hide-timestamp="true">
            <hl-group dir="vertical" full="full-x" class="p-b-lg" gap="var(--xs)">
              <hl-group align="items-middle" gap="var(--xs)">
                <span>2018-04-12 20:46</span>
                <hl-tag size="sm">产生</hl-tag>
              </hl-group>
              <hl-group align="items-middle" gap="var(--xs)">
                <span class="text-secondary">大数据集团</span>
                <span>用户名</span>
              </hl-group>
            </hl-group>
          </hl-timeline-item>
          <hl-timeline-item :hide-timestamp="true">
            <hl-group dir="vertical" full="full-x" class="p-b-lg" gap="var(--xs)">
              <hl-group align="items-middle" gap="var(--xs)">
                <span>2018-04-12 20:46</span>
                <hl-tag size="sm">产生</hl-tag>
              </hl-group>
              <hl-group dir="vertical" full="full-x" class="border p-t-xs p-b-xs p-l-md p-r-md bg-light">
                <hl-group dir="vertical" full="full-x" align="items-center">
                  <span class="text-secondary">人员疏散 已劝双方离开现场</span>
                  <span>用户名(新河街道)</span>
                </hl-group>
              </hl-group>
              <hl-group align="items-middle" gap="var(--xs)">
                <span class="text-secondary">大数据集团</span>
                <span>用户名</span>
              </hl-group>
            </hl-group>
          </hl-timeline-item>

          <hl-timeline-item :hide-timestamp="true">
            <hl-group dir="vertical" full="full-x" class="p-b-lg" gap="var(--xs)">
              <hl-group align="items-middle" gap="var(--xs)">
                <span>2018-04-12 20:46</span>
                <hl-tag size="sm">产生</hl-tag>
              </hl-group>
              <hl-group align="items-middle" gap="var(--xs)">
                <span class="text-secondary">大数据集团</span>
                <span>用户名</span>
              </hl-group>
            </hl-group>
          </hl-timeline-item>
        </hl-timeline>
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
    return {
      activeName,
    }
  },
})
</script>
