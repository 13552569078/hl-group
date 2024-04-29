<template show-source>
  <hv-panel title="信息集成卡片5">
    <hl-row layout="grid" count="count-2" gap="var(--xs)" class="m-t-md">
      <hl-col v-for="(item, index) in list" :key="index" span="col">
        <hb-data-collect full="full-x" padding-x="var(--sm)" padding-y="var(--xs)" :style="`background-color:rgba(var(--rgb-level${item.level}), 0.04)`">
          <hl-icon size="xl" class="symbol" :type="`level${item.level}`" style="position: relative;" :style="`filter: drop-shadow(0 2px 8px rgba(var(--rgb-level${item.level}), 0.3);`">
            <inline-svg :src="Warning" />
          </hl-icon>
          <span class="text-secondary font-md m-l-sm">{{ item.label }}</span>
          <hl-group align="items-middle" class="static" gap="var(--xs)">
            <h4 class="font-din relative" :data-suffix="item.unit">{{ item.val }}</h4>
          </hl-group>
        </hb-data-collect>
      </hl-col>
    </hl-row>
  </hv-panel>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Warning from '../../../assets/public/images/warning.svg?url'
export default defineComponent({
  components: {},
  setup() {
    const list = ref([
      { label: '红色预警', val: '12', level: 1 },
      { label: '橙色预警', val: '35', level: 2 },
      { label: '黄色预警', val: '59', level: 3 },
      { label: '蓝色预警', val: '108', level: 4 },
    ])

    return {
      list,
      Warning,
    }
  },
})
</script>
