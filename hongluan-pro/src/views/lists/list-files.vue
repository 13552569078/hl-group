<template>
  <hl-row layout="grid" count="xxl:count-4 xl:count-3 lg:count-2" gap="var(--lg)" gap-y="var(--lg)" dir="vertical">
    <hl-col v-for="item in items" :key="item.title" span="col">
      <hl-panel class="multi-card float-header center-body" padding="var(--xl)" borderless header-height="calc(var(--xxs) * 18)">
        <template #header>
          <div class="panel-title"></div>
          <div class="panel-header-right">
            <hl-dropdown>
              <hl-icon><two-more /></hl-icon>
              <template #dropdown>
                <hl-dropdown-menu>
                  <hl-dropdown-item>
                    下载
                  </hl-dropdown-item>
                  <hl-dropdown-item>
                    预览
                  </hl-dropdown-item>
                </hl-dropdown-menu>
              </template>
            </hl-dropdown>
          </div>
        </template>
        <hl-icon width="calc(var(--xl) * 2)" height="calc(var(--xl) * 2)" type="primary">
          <component :is="'file' + item.type" />
        </hl-icon>
        <div class="card-content text-center m-t-md">
          <h6>{{ item.title }}</h6>
          <div class="card-description">{{ item.size }}</div>
        </div>
      </hl-panel>
    </hl-col>
  </hl-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const items = ref([
      { title: '省防汛通知', size:'325KB', type: 'Folder' },
      { title: '天气异常警告', size:'212KB', type: 'File' },
      { title: '冰冻天气异常', size:'488.35KB', type: 'Doc' },
      { title: '市级抗旱通知', size:'14KB', type: 'Jpg' },
      { title: '放假通知', size:'98KB', type: 'Csv' },
      { title: '接种疫苗通知', size:'22KB', type: 'Pdf' },
      { title: '省防汛通知', size:'325KB', type: 'Mp4' },
      { title: '天气异常警告', size:'212KB', type: 'Png' },
      { title: '冰冻天气异常', size:'488.35KB', type: 'Sql' },
      { title: '市级抗旱通知', size:'14KB', type: 'Rar' },
      { title: '放假通知', size:'98KB', type: 'Xls' },
      { title: '接种疫苗通知', size:'22KB', type: 'Svg' },
      { title: '省防汛通知', size:'325KB', type: 'Txt' },
      { title: '天气异常警告', size:'212KB', type: 'Xml' },
      { title: '冰冻天气异常', size:'488.35KB', type: 'Zip' },
      { title: '市级抗旱通知', size:'14KB', type: 'Ppt' },
      { title: '放假通知', size:'98KB', type: 'Gif' },
      { title: '接种疫苗通知', size:'22KB', type: 'Mov' },
    ])
    return {
      items,
    }
  },
})
</script>
<style>
</style>
