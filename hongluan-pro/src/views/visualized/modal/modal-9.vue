<template show-source>
  <hv-modal title="监测事件详情3" width="calc(var(--xxl) * 14)">
    <hl-row layout="grid" class="m-t-lg" count="count-3" gap-x="var(--xxl)" gap-y="var(--lg)">
      <hl-col span="col col-span-3">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">事件标题</span>
          <span class="font-bold group-item">欧风花街打架斗殴</span>
        </hl-group>
      </hl-col>
      <hl-col span="col">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">事件类型</span>
          <span class="font-bold group-item">城市安全-重点区域-打架斗殴</span>
        </hl-group>
      </hl-col>
      <hl-col span="col">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">预警主体</span>
          <span class="font-bold group-item">欧风花街</span>
        </hl-group>
      </hl-col>
      <hl-col span="col">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">预警等级</span>
          <hl-tag type="yellow">IV级</hl-tag>
        </hl-group>
      </hl-col>
      <hl-col span="col">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">预警时间</span>
          <span class="font-bold group-item">2021-07-18 12:23:44</span>
        </hl-group>
      </hl-col>

      <hl-col span="col">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">预警地点</span>
          <span class="font-bold group-item">欧风花街广场</span>
        </hl-group>
      </hl-col>

      <hl-col span="col col-span-3">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">事件描述</span>
          <span class="font-bold group-item">欧风花街广场下午发生打架斗殴事件，3人参与</span>
        </hl-group>
      </hl-col>

      <hl-col span="col col-span-3">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">现场照片</span>
          <hl-group gap="var(--md)" wrap>
            <hl-thumb v-for="item in picData" :key="item" style="width: 100px; height: 100px" :src="item.thumb" fit="cover" :preview-src-list="srcList" />
          </hl-group>
        </hl-group>
      </hl-col>
      <hl-col span="col col-span-3">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">现场视频</span>
          <hl-group gap="var(--md)" wrap>
            <hl-thumb style="width: 200px; height: 140px" src="https://i0.hippopx.com/photos/264/421/89/child-children-girl-happy-thumb.jpg" fit="cover" />
          </hl-group>
        </hl-group>
      </hl-col>
    </hl-row>
  </hv-modal>
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
        thumb: 'https://i0.hippopx.com/photos/199/210/349/man-board-drawing-muscles-thumb.jpg',
      },
    ])
    const srcList = ref([
      'https://i0.hippopx.com/photos/298/434/513/beach-dawn-dusk-ocean-thumb.jpg',
      'https://i0.hippopx.com/photos/738/1016/11/children-fishing-the-activity-asia-thumb.jpg',
      'https://i0.hippopx.com/photos/264/421/89/child-children-girl-happy-thumb.jpg',
      'https://i0.hippopx.com/photos/199/210/349/man-board-drawing-muscles-thumb.jpg',
    ])

    return {
      picData,
      srcList,
    }
  },
})
</script>
