<template>
  <hl-panel
    class="card-panel"
    borderless
    body-padding="calc(var(--xxl) + var(--md))"
    body-class="p-y-md"
  >
    <template #header>
      <div class="panel-header-left">
        <hl-icon size="xl" type="primary">
          <file-jpg />
        </hl-icon>
      </div>
      <div class="panel-title">
        <h4>文件类型图标</h4>
      </div>
      <div class="panel-header-right"></div>
    </template>
    <hl-row
      layout="grid"
      count="xl:count-6 lg:count-3 md:count-2"
      gap-x="var(--xxl)"
      gap-y="var(--xxs)"
    >
      <hl-col v-for="item in icons" :key="item.name" span="col">
        <hl-group dir="vertical" align="items-middle" full class="p-xxl" gap="var(--md)">
          <hl-icon width="calc(var(--xl) * 2)" height="calc(var(--xl) * 2)" type="primary">
            <component :is="'file' + item.name" />
          </hl-icon>
          <span class="content">{{ item.name }}</span>
        </hl-group>
      </hl-col>
    </hl-row>
  </hl-panel>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const icons = ref([
      { name: 'Folder' },
      { name: 'File' },
      { name: 'Doc' },
      { name: 'Jpg' },
      { name: 'Csv' },
      { name: 'Pdf' },
      { name: 'Mp4' },
      { name: 'Png' },
      { name: 'Mp3' },
      { name: 'Sql' },
      { name: 'Rar' },
      { name: 'Xls' },
      { name: 'Svg' },
      { name: 'Txt' },
      { name: 'Xml' },
      { name: 'Zip' },
      { name: 'Ppt' },
      { name: 'Gif' },
      { name: 'Mov' },
    ])

    return {
      icons,
    }
  },
})
</script>

<style>
</style>
