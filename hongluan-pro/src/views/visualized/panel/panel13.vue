<template>
  <hv-panel title="预警事件综合研判">
    <template #action>
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
    <hl-group class="m-t-md" full="full-x">
      <hl-radio-group v-model="types.active" custom gap="var(--md)">
        <hl-radio v-for="item in types.content" :key="item.val" :label="item.val" type="primary" class="w-full">
          <hl-button size="sm" block>{{ item.label }}</hl-button>
        </hl-radio>
      </hl-radio-group>
    </hl-group>
    <component :is="types.active" />
  </hv-panel>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import Info from './panel-info.vue'
import Event from './panel-event.vue'
import Rsources from './panel-rsources.vue'
import Judge from './panel-judge.vue'

export default defineComponent({
  name: 'MonitorEventIndex',
  components: { Info, Event, Rsources, Judge },
  setup() {
    const types = reactive({
      content: [
        {
          label: '基本信息',
          val: 'info',
        },
        {
          label: '历史事件',
          val: 'event',
        },
        {
          label: '周边资源',
          val: 'rsources',
        },
        {
          label: '事件研判',
          val: 'judge',
        },
      ],
      active: 'event',
    })

    return {
      types,
    }
  },
})
</script>
<style lang="scss" scoped></style>
