<template>
  <hv-panel title="报警信息">
    <template #action>
      <hl-button size="sm" icon-position="left">
        返回
        <template #icon>
          <hl-icon>
            <two-arrow-left />
          </hl-icon>
        </template>
      </hl-button>
    </template>
    <hl-row layout="grid" class="m-t-lg" count="count-3" gap-x="var(--xxl)" gap-y="var(--lg)">
      <hl-col span="col col-span-3">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">事件标题</span>
          <span class="font-bold group-item">大明湖公园南广场人员异常聚集</span>
        </hl-group>
      </hl-col>
      <hl-col span="col">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">报警类型</span>
          <span class="font-bold group-item">人员聚集</span>
        </hl-group>
      </hl-col>
      <hl-col span="col">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">监测主体</span>
          <span class="font-bold group-item">公园南广场</span>
        </hl-group>
      </hl-col>
      <hl-col span="col">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">报警等级</span>
          <hl-tag type="level1" size="sm">4级</hl-tag>
        </hl-group>
      </hl-col>
      <hl-col span="col col-span-1">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">报警时间</span>
          <span class="font-bold group-item">2021-07-18 12:23:44</span>
        </hl-group>
      </hl-col>

      <hl-col span="col col-span-2">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">行政区划</span>
          <span class="font-bold group-item">大明湖街道</span>
        </hl-group>
      </hl-col>

      <hl-col span="col col-span-3">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">事件描述</span>
          <span class="font-bold group-item">大明湖公园南广场人员异常聚集，数据记录约大于13000人</span>
        </hl-group>
      </hl-col>

      <hl-col span="col col-span-3">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">现场照片 / 视频</span>
          <hl-scrollbar class="w-xxl" style="--scrollbar-offset: var(--xs)">
            <hl-group gap="var(--md)">
              <hl-thumb v-for="item in picData" :key="item" style="width: calc(var(--xxs) * 25); height: calc(var(--xxs) * 19)" :src="item.thumb" fit="cover" :preview-src-list="srcList" :append-to-body="true" />
            </hl-group>
          </hl-scrollbar>
        </hl-group>
      </hl-col>
    </hl-row>
  </hv-panel>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {},

  setup() {
    const picData = ref([
      {
        title: '',
        thumb: 'https://i0.hippopx.com/photos/298/434/513/beach-dawn-dusk-ocean-thumb.jpg',
      },
      {
        title: '',
        thumb: 'https://i0.hippopx.com/photos/738/1016/11/children-fishing-the-activity-asia-thumb.jpg',
      },
      {
        title: '',
        thumb: 'https://i0.hippopx.com/photos/264/421/89/child-children-girl-happy-thumb.jpg',
      },
      {
        title: '',
        thumb: 'https://i0.hippopx.com/photos/298/434/513/beach-dawn-dusk-ocean-thumb.jpg',
      },
      {
        title: '',
        thumb: 'https://i0.hippopx.com/photos/738/1016/11/children-fishing-the-activity-asia-thumb.jpg',
      },
      {
        title: '',
        thumb: 'https://i0.hippopx.com/photos/264/421/89/child-children-girl-happy-thumb.jpg',
      },
      {
        title: '',
        thumb: 'https://i0.hippopx.com/photos/298/434/513/beach-dawn-dusk-ocean-thumb.jpg',
      },
      {
        title: '',
        thumb: 'https://i0.hippopx.com/photos/738/1016/11/children-fishing-the-activity-asia-thumb.jpg',
      },
      {
        title: '',
        thumb: 'https://i0.hippopx.com/photos/264/421/89/child-children-girl-happy-thumb.jpg',
      },
    ])
    const srcList = ref([
      'https://i0.hippopx.com/photos/298/434/513/beach-dawn-dusk-ocean-thumb.jpg',
      'https://i0.hippopx.com/photos/738/1016/11/children-fishing-the-activity-asia-thumb.jpg',
      'https://i0.hippopx.com/photos/264/421/89/child-children-girl-happy-thumb.jpg',
    ])

    return {
      picData,
      srcList,
    }
  },
})
</script>
