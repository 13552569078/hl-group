<template>
  <hv-panel title="指示牌卡片">
    <hl-group class="m-t-md" full="full-x" gap="var(--sm)">
      <hl-radio v-model="danageType" label="0" custom>
        <hl-group dir="vertical" align="items-middle" full class="p-xxs border checked:border-warning transition">
          <h2 class="font-din m-b-xxs checked:text-warning">67</h2>
          <hl-group full align="items-center" class="p-t-xxs p-b-xxs bg-hover checked:bg-warning-opacity-2 checked:bounce-enter" gap="var(--xxs)">
            <span class="static">已整改</span>
            <span class="static">67%</span>
          </hl-group>
        </hl-group>
      </hl-radio>
      <hl-radio v-model="danageType" label="1" custom>
        <hl-group dir="vertical" align="items-middle" full class="p-xxs border checked:border-success transition">
          <h2 class="font-din m-b-xxs checked:text-success">23</h2>
          <hl-group full align="items-center" class="p-t-xxs p-b-xxs bg-hover checked:bg-success-opacity-2 checked:bounce-enter" gap="var(--xxs)">
            <span class="static">待整改</span>
            <span class="static">23%</span>
          </hl-group>
        </hl-group>
      </hl-radio>
      <hl-radio v-model="danageType" label="2" custom>
        <hl-group dir="vertical" align="items-middle" full class="p-xxs border checked:border-danger transition">
          <h2 class="font-din m-b-xxs checked:text-danger">10</h2>
          <hl-group full align="items-center" class="p-t-xxs p-b-xxs bg-hover checked:bg-danger-opacity-2 checked:bounce-enter" gap="var(--xxs)">
            <span class="static">未整改</span>
            <span class="static">10%</span>
          </hl-group>
        </hl-group>
      </hl-radio>
    </hl-group>
    <hl-group class="m-t-md" full="full-x" dir="vertical" gap="var(--xxs)">
      <hl-group v-for="(item, index) in tableData" :key="index" dir="vertical" class="bg-light p-sm">
        <hl-group align="items-between">
          <span class="ellipsis font-md">{{ item.msg }}</span>
          <hl-tag type="danger" class="static m-l-sm" size="sm">{{ item.tag }}</hl-tag>
        </hl-group>
        <hl-group align="items-between" class="text-secondary">
          <span>{{ item.address }}</span><span>{{ item.date }}</span>
        </hl-group>
      </hl-group>
    </hl-group>
  </hv-panel>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const tableData = ref([
      {
        id: 1,
        address: '太原市迎泽区九华路188号',
        tag: '老旧管线',
        msg: '燃气设备老旧燃气设备老旧，存在泄漏风险',
        date: '2021-09-24 18:00',
      },
      {
        id: 2,
        address: '太原市迎泽区九华路190号',
        tag: '老旧管线',
        msg: '燃气设备老旧燃气设备老旧，存在泄漏风险',
        date: '2021-09-20 19:00',
      },
    ])
    const danageType = ref('0')

    return {
      tableData,
      danageType,
    }
  },
})
</script>
<style lang="scss" scoped>
</style>
