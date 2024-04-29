<template>
  <hv-panel title="信息列表">
    <hl-scrollbar class="m-t-md" style="height: calc(var(--xxl) * 5)">
      <hl-group full="full-x" dir="vertical" gap="var(--xxs)">
        <hl-group v-for="(item, index) in dataList" :key="index" class="bg-light p-sm" align="items-middle items-between" gap="var(--md)">
          <hl-group dir="vertical">
            <hl-group align="items-middle">
              <hl-popover trigger="hover" :content="item.name" placement="top" :width="320">
                <template #reference>
                  <span class="ellipsis font-md">{{ item.name }}</span>
                </template>
              </hl-popover>
              <hl-tag class="static m-l-sm" size="sm">{{ item.type }}</hl-tag>
            </hl-group>
            <div class="text-secondary">{{ item.address }}</div>
          </hl-group>
          <hl-group dir="vertical" class="static" align="items-bottom">
            <span class="text-secondary font-sm">{{ item.date }}</span>
            <span class="text-secondary font-sm">{{ item.time }}</span>
          </hl-group>
        </hl-group>
      </hl-group>
    </hl-scrollbar>
  </hv-panel>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { HlTag, HlGroup, HlScrollbar, HlPopover } from 'hongluan-ui'

export default defineComponent({
  name: 'MonitorEventIndex',
  components: {
    HlTag,
    HlGroup,
    HlScrollbar,
    HlPopover,
  },
  setup() {
    const dataList = ref([
      { name: '燃气设备老旧燃气设备老旧，存在泄漏风险, 燃气设备老旧燃气设备老旧，存在泄漏风险', date: '2021-09-24', time: '08:00-18:00', address: '太原市迎泽区迎泽大街218号', type: '计划性施工' },
      { name: '燃气设备老旧燃气设备老旧，存在泄漏风险', date: '2021-09-24', time: '08:00-18:00', address: '太原市迎泽区迎泽大街218号', type: '计划性施工' },
      { name: '燃气设备老旧燃气设备老旧，存在泄漏风险', date: '2021-09-24', time: '08:00-18:00', address: '太原市迎泽区迎泽大街218号', type: '计划性施工' },
      { name: '燃气设备老旧燃气设备老旧，存在泄漏风险', date: '2021-09-24', time: '08:00-18:00', address: '太原市迎泽区迎泽大街218号', type: '计划性施工' },
      { name: '燃气设备老旧燃气设备老旧，存在泄漏风险', date: '2021-09-24', time: '08:00-18:00', address: '太原市迎泽区迎泽大街218号', type: '计划性施工' },
    ])
    return {
      dataList,
    }
  },
})
</script>
<style lang="scss" scoped>
</style>
