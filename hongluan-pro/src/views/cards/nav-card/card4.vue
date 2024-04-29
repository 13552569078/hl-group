<template>
  <hl-panel class="main-panel" padding="var(--xxl)">
    <hl-timeline class="m-t-lg">
      <hl-timeline-item :hide-timestamp="true">
        <template #icon>
          <hl-icon type="primary" round fill effect="light">
            <fill-Clock />
          </hl-icon>
        </template>
        <hl-group dir="vertical" full="full-x" class="p-b-lg" gap="var(--xs)">
          <hl-group align="items-middle items-between" gap="var(--xs)">
            <hl-group align="items-middle" gap="var(--xs)">
              <hl-badge type="primary" value="最新" />
              <h5>上报阶段</h5>
            </hl-group>
            <hl-group align="items-middle" class="static">
              ...
            </hl-group>
          </hl-group>
          <hl-panel header-height="calc(var(--lg) * 2)" header-class="bg-light" body-class="p-t-md p-x-lg">
            <template #header>
              <hl-group align="items-between" class="w-full" block>
                <span class="font-bold">贾鸣 (岗位名称)</span>
                <hl-group gap="var(--xs)">
                  <span>处置</span>
                  <span class="text-secondary static">2021-10-12 20:46</span>
                </hl-group>
              </hl-group>
            </template>
            <hl-group dir="vertical" block gap="var(--md)">
              <hl-group dir="vertical" block>
                <span class="text-secondary">信息：</span>
                <p>安苑晨光新苑张贴非法小广告秦淮区红花街道汇安苑晨光新苑门店违规挂彩旗</p>
              </hl-group>
              <hl-group dir="vertical" block gap="var(--xxs)">
                <span class="text-secondary">视频和图片：</span>
                <hl-group gap="var(--md)" wrap>
                  <hl-thumb v-for="item in picData" :key="item" :src="item.thumb" size="xxxl" fit="cover" radius :preview-src-list="srcList" />
                </hl-group>
              </hl-group>
            </hl-group>
          </hl-panel>
        </hl-group>
      </hl-timeline-item>

      <hl-timeline-item :hide-timestamp="true">
        <hl-group dir="vertical" full="full-x" class="p-b-lg" gap="var(--xs)">
          <hl-group align="items-middle items-between" gap="var(--xs)">
            <hl-group align="items-middle" gap="var(--xs)">
              <h5>发送出现场人员名单</h5>
            </hl-group>
            <hl-group align="items-middle" class="static">
              <span class="text-secondary">2021-10-12 20:46</span>
            </hl-group>
          </hl-group>
        </hl-group>
      </hl-timeline-item>

      <hl-timeline-item :hide-timestamp="true">
        <hl-group dir="vertical" full="full-x" class="p-b-lg" gap="var(--xs)">
          <hl-group align="items-middle items-between" gap="var(--xs)">
            <hl-group align="items-middle" gap="var(--xs)">
              <h5>新任务发布</h5>
            </hl-group>
            <hl-group align="items-middle" class="static">
              <span class="text-secondary">2021-10-12 20:46</span>
            </hl-group>
          </hl-group>
          <hl-group dir="vertical" gap="var(--md)" class="p-t-xs p-b-xs p-l-md p-r-md border bg-light"> 总指挥：张亮发布任务 《尽快疏散周边群众》 </hl-group>
        </hl-group>
      </hl-timeline-item>

      <hl-timeline-item :hide-timestamp="true">
        <hl-group dir="vertical" full="full-x" class="p-b-lg" gap="var(--xs)">
          <hl-group align="items-middle items-between" gap="var(--xs)">
            <hl-group align="items-middle" gap="var(--xs)">
              <h5>事件信息更新</h5>
            </hl-group>
            <hl-group align="items-middle" class="static">
              <span class="text-secondary">2021-10-12 20:46</span>
            </hl-group>
          </hl-group>
          <hl-group dir="vertical" gap="var(--md)" class="p-md border bg-light">
            <hb-data-collect full="full-x" padding="0">
              <hl-icon size="xs" fill class="symbol">
                <fill-Hazard />
              </hl-icon>
              <span class="font-md m-l-sm">死亡人数更新为</span>
              <hl-group align="items-middle" class="static" gap="var(--sm)">
                <h4 class="font-din text-danger relative" data-suffix="人">1</h4>
              </hl-group>
            </hb-data-collect>
          </hl-group>
        </hl-group>
      </hl-timeline-item>
    </hl-timeline>
  </hl-panel>
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

