<template>
  <hl-panel
    radius="0px"
    class="content m-b-lg"
    style="width: 100%; --panel-header-height: 60px;"
    borderless
    padding="var(--xl)"
    header-class="bg-content"
    body-padding="60px"
    body-class="display-flex items-left items-top flex-col content"
    footer-style
  >
    <template #header>
      <div class="panel-header-left">
        <hl-icon class="static" type="primary" size="md">
          <FillBookOpen />
        </hl-icon>
      </div>
      <div class="panel-title">
        <h6 class="text-title w-full">{{ detailOpt.title ?? '基本信息' }}</h6>
      </div>
      <div class="panel-header-right"></div>
    </template>
    <template #default>
      <hl-row layout="grid" count="xl:count-4 md:count-3 count-md-2" gap-x="var(--md)" gap-y="var(--xl)" class="show-col w-full m-t-lg">
        <hl-col v-for="item in detailOpt.cols" :key="item.key" span="col">
          <hl-group align="items-left items-top" class="w-full" dir="vertical" gap="var(--xxs)">
            <div class="text-secondary">{{ item.label }}</div>
            <div v-if="!item.slot" class="text-regular font-lg font-bold">{{ detailOpt.data[item.key]?detailOpt.data[item.key]:'--' }}</div>
            <div v-else class="text-regular font-lg font-bold">
              <slot :name="item.slot" :detail="detailOpt.data"></slot>
            </div>
          </hl-group>
        </hl-col>
      </hl-row>
      <!-- 相关图片 -->
      <hl-row v-if="detailOpt?.imageOpt?.show" class="m-t-lg" count="count-xl-4 count-lg-3 count-md-2" gap-x="var(--xxl)" gap-y="var(--xl)">
        <hl-group align="items-left items-top" class="w-full" dir="vertical" gap="var(--xxs)">
          <div class="text-secondary">{{ detailOpt?.imageOpt.title ?? '相关图片' }}</div>
          <hl-group v-if="detailOpt?.imageOpt?.list.length>0" gap="var(--md)">
            <hl-thumb
              v-for="item in detailOpt?.imageOpt?.list"
              :key="item"
              style="width: calc(var(--lg) * 5); height: calc(var(--lg) * 5)"
              :src="item"
              fit="cover"
              :preview-src-list="detailOpt.imageOpt.list"
            />
          </hl-group>
        </hl-group>
      </hl-row>
      <!-- slot -->
      <hl-row class="m-t-lg">
        <slot></slot>
      </hl-row>
    </template>
  </hl-panel>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { HlPanel, HlIcon, HlRow, HlGroup, HlCol, HlThumb } from 'hongluan-ui'
import type { PageDetailOption } from './types'
import { FillBookOpen } from '@hongluan-ui/icons'

export default defineComponent({
  name: 'PageDetail',
  components: { HlPanel, HlIcon, HlRow, HlGroup, HlCol, HlThumb, FillBookOpen },
  props: {
    detailOpt: {
      type: Object as PropType<PageDetailOption>,
      required: true,
      default: () => ({}),
    },
  },
  setup() {
    return {}
  },
})
</script>
