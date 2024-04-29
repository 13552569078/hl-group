<template show-source>
  <hv-modal title="监测事件详情" width="calc(var(--xxl) * 18)">
    <hl-row layout="grid" class="m-t-lg" count="count-3" gap-x="var(--xxl)" gap-y="var(--lg)">
      <hl-col span="col col-span-3">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">事件标题</span>
          <span class="font-bold group-item">河北某个虚拟化工股份有限公司</span>
        </hl-group>
      </hl-col>
      <hl-col span="col col-span-3">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">事件描述</span>
          <span class="font-bold group-item"> 鸿鸾是基于VUE3开发的一套响应式高可控的前端框架。它甚至能让你离开CSS并且直接在HTML标记语言中组合出任意的设计。 </span>
        </hl-group>
      </hl-col>
      <hl-col span="col">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">事件地点</span>
          <span class="font-bold group-item">四川省-德阳市-绵竹市</span>
        </hl-group>
      </hl-col>
      <hl-col span="col">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">事件类型</span>
          <span class="font-bold group-item">河北省应急管理局</span>
        </hl-group>
      </hl-col>
      <hl-col span="col">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">事件来源</span>
          <span class="font-bold group-item"> AI智能中台</span>
        </hl-group>
      </hl-col>
      <hl-col span="col">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">事件发生时间</span>
          <span class="font-bold group-item">2021-07-18</span>
        </hl-group>
      </hl-col>
      <hl-col span="col">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">预警主体</span>
          <span class="font-bold group-item">20200703_营业执照.jpg</span>
        </hl-group>
      </hl-col>
      <hl-col span="col">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">监测设备</span>
          <span class="font-bold group-item">视频299D监控设备</span>
        </hl-group>
      </hl-col>
      <hl-col span="col">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">发生预警时间</span>
          <span class="font-bold group-item">2021-07-18 14:24:45</span>
        </hl-group>
      </hl-col>
      <hl-col span="col">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">补全操作时间</span>
          <span class="font-bold group-item">2021-07-18 14:24:45</span>
        </hl-group>
      </hl-col>
      <hl-col span="col">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">补全操作人员</span>
          <span class="font-bold group-item">贾明字</span>
        </hl-group>
      </hl-col>
      <hl-col span="col">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">事件状态</span>
          <span class="font-bold group-item">待预警</span>
        </hl-group>
      </hl-col>
      <hl-col span="col">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">关闭时间</span>
          <span class="font-bold group-item">2021-07-18</span>
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
            <hl-thumb style="width: 200px; height: 140px" src="https://i0.hippopx.com/photos/264/421/89/child-children-girl-happy-thumb.jpg" fit="cover"/>
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
        thumb:
          'https://i0.hippopx.com/photos/738/1016/11/children-fishing-the-activity-asia-thumb.jpg',
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
