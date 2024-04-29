<template>
  <hv-panel title="报警列表">
    <template #action>
    </template>
    <hl-scrollbar style="height: calc(var(--xl) * 5)">
      <hl-group full="full-x" dir="vertical" gap="var(--xxs)">
        <hl-group v-for="(item, index) in data" :key="index" class="bg-light p-sm" align="items-middle items-between" gap="var(--md)">
          <hl-group dir="vertical">
            <hl-group align="items-middle" gap="var(--sm)">
              <span class="ellipsis font-md cursor-pointer">{{ item.eventTitle }}</span>
              <hl-tag size="sm">{{ item.level }}</hl-tag>
            </hl-group>
            <hl-group gap="var(--md)">
              <span class="font-sm text-secondary cursor-pointer" @click="dialogTableVisible = true">消防通道占用</span>
              <span class="font-sm text-secondary cursor-pointer" @click="dialogTableVisible = true">北环家园</span>
            </hl-group>
          </hl-group>
          <hl-group class="static" align="items-right items-middle" gap="var(--xs)">
            <div class="text-secondary font-sm">{{ item.eventTime }}</div>
            <hl-button size="sm">{{ item.statusName }}</hl-button>
          </hl-group>
        </hl-group>
      </hl-group>
    </hl-scrollbar>
  </hv-panel>

</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  components: {},

  setup() {

    const data = ref([
      {
        id: 1,
        eventTitle: '迎泽区新建路二社区燃气泄漏',
        eventTime: '16:30:16',
        statusName: '待研判',
        level: '一级',
      },
      {
        id: 2,
        eventTitle: '解放路韶九巷燃气泄漏',
        eventTime: '16:30:16',
        statusName: '处置中',
        level: '二级',
      },
      {
        id: 3,
        eventTitle: '前所街住宅小区燃气泄漏',
        eventTime: '16:30:16',
        statusName: '待研判',
        level: '四级',
      },
      {
        id: 4,
        eventTitle: '崔家巷羊肉汤馆燃气泄漏',
        eventTime: '16:30:16',
        statusName: '处置中',
        level: '三级',
      },
    ])

    return {
      data,
    }
  },
})
</script>
