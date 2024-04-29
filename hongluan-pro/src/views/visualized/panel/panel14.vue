<template>
  <hv-panel title="预警结果详情">
    <template #action>
      <hl-button size="sm" type="primary" class="m-r-md">补全信息</hl-button>
      <hl-icon class="cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="design-iconfont">
          <defs>
            <linearGradient id="v7wmo1jbza" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop stop-color="#FFF" offset="0%" />
              <stop stop-color="#62C2F5" offset="100%" />
            </linearGradient>
          </defs>
          <path d="M11,20 L1,12 L11,4 L11,9 C16.523,9 21,13.477 21,19 C21,19.273 20.99,19.543 20.968,19.81 C19.46,16.95 16.458,15 13,15 L11,15 L11,20 Z" fill="url(#v7wmo1jbza)" fill-rule="nonzero" />
        </svg>
      </hl-icon>
    </template>
    <hl-group gap="var(--sm)" class="m-t-lg" dir="vertical">
      <hl-group
        v-for="(it, ind) in [
          { key: 'label', val: '事件标题' },
          { key: 'time', val: '预警时间' },
          { key: 'main', val: '预警主体' },
        ]"
        :key="ind + 'ind'"
        full="full-x"
      >
        <span class="text-secondary m-r-xs static">{{ it.val }}:</span>
        <span class="font-md font-bold">{{ content[it.key] }}</span>
      </hl-group>
      <hl-group full="full-x" align="items-between">
        <hl-group>
          <span class="text-secondary m-r-xs">预警等级:</span>
          <hl-tag size="sm" class="m-r-xs" :type="content.warningLevel">{{ content.warning }}</hl-tag>
        </hl-group>
        <hl-group>
          <span class="text-secondary m-r-xs">状态:</span>
          <hl-tag size="sm" class="m-r-xs" :type="content.tagLevel">{{ content.tag }}</hl-tag>
        </hl-group>
      </hl-group>
      <hl-group
        v-for="(it, ind) in [
          { key: 'type', val: '预警类型' },
          { key: 'title', val: '事件标题' },
        ]"
        :key="ind + 'ind'"
        full="full-x"
      >
        <span class="text-secondary m-r-xs static">{{ it.val }}:</span>
        <span class="font-md font-bold">{{ content[it.key] }}</span>
      </hl-group>
    </hl-group>
    <div class="ornament-sub-title font-lg m-t-lg">关联的监测事件</div>
    <hl-scrollbar class="m-t-md" style="height: calc(var(--xxl) * 10)">
      <hl-group full="full-x" dir="vertical" gap="var(--sm)">
        <hl-group v-for="item in list" :key="item.sky" dir="vertical" class="bg-light p-md bg-hover-hover cursor-pointer transition">
          <hl-group align="items-middle" full="full-x">
            <span class="font-lg font-bold ellipsis">{{ item.label }}</span>
            <hl-group gap="var(--xxs)" class="static">
              <hl-tag size="sm" class="m-r-xs static">{{ item.tag }}</hl-tag>
              <hl-tag size="sm" class="static" type="primary">{{ item.info }}</hl-tag>
            </hl-group>
          </hl-group>
          <hl-group dir="vertical" class="m-t-xs">
            <hl-group
              v-for="(it, ind) in [
                { key: 'time', val: '时间' },
                { key: 'address', val: '地点' },
              ]"
              :key="ind + 'ind'"
              full="full-x"
              gap="var(--sm)"
            >
              <span class="text-secondary static">{{ it.val }}:</span>
              <span class="text-secondary">{{ item[it.key] }}</span>
            </hl-group>
          </hl-group>
        </hl-group>
      </hl-group>
    </hl-scrollbar>
  </hv-panel>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MonitorEventIndex',
  setup() {
    const content = ref({
      label: '欧风花街广场打架斗殴欧风花街广场打架斗殴',
      time: '2021-06-21 21:33',
      main: '欧风花街',
      type: '城市安全-重点区域-打架斗殴',
      title: '欧风花街广场打架斗殴',
      tagLevel: 'yellow',
      tag: '新产生',
      warningLevel: 'level4',
      warning: 'IV级',
    })
    const list = ref([
      { key: '1', label: '欧风花街重点人员打架斗殴', tag: '打架斗殴', info: 'AI智能中台', time: '2021-06-21 21:33', address: '欧风花街广场' },
      { key: '2', label: '欧风花街重点人员打架斗殴', tag: '打架斗殴', info: 'AI智能中台', time: '2021-06-21 21:33', address: '欧风花街广场' },
      { key: '3', label: '欧风花街重点人员打架斗殴', tag: '打架斗殴', info: 'AI智能中台', time: '2021-06-21 21:33', address: '欧风花街广场' },
      { key: '4', label: '欧风花街重点人员打架斗殴', tag: '打架斗殴', info: 'AI智能中台', time: '2021-06-21 21:33', address: '欧风花街广场' },
    ])

    return {
      content,
      list,
    }
  },
})
</script>
<style lang="scss" scoped></style>
