<template>
  <hv-panel title="时间轴">
    <hl-timeline class="m-t-lg">
      <hl-timeline-item :hide-timestamp="true">
        <template #icon>
          <hl-icon type="success" round fill effect="light">
            <fill-Clock />
          </hl-icon>
        </template>
        <hl-group dir="vertical" full="full-x" class="p-b-lg" gap="var(--xs)">
          <hl-group align="items-middle items-between" gap="var(--xs)">
            <hl-group align="items-middle" gap="var(--xs)">
              <hl-badge type="danger" value="最新" />
              <h5>集结进度更新</h5>
            </hl-group>
            <hl-group align="items-middle" class="static">
              <span class="text-secondary">2021-10-12 20:46</span>
            </hl-group>
          </hl-group>
          <hl-group dir="vertical" gap="var(--md)" class="p-t-xs p-b-xs p-l-md p-r-md border bg-light"> 后勤保障组集结完毕 </hl-group>
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
          <hl-group dir="vertical" gap="var(--md)" class="p-md border bg-light">
            <hb-data-collect full="full-x" style="--data-collect-padding: 0; --data-collect-radius: 0">
              <hl-icon size="xs" fill class="symbol">
                <fill-mail />
              </hl-icon>
              <span class="font-md m-l-sm">短信通知 <span class="text-primary font-bold">25</span> 人</span>
              <hl-group align="items-middle" class="static" gap="var(--sm)">
                <h4 class="font-din text-danger relative" data-suffix="失败">13</h4>
                <h4 class="font-din text-success relative" data-suffix="成功">12</h4>
              </hl-group>
            </hb-data-collect>
            <hb-data-collect full="full-x" style="--data-collect-padding: 0; --data-collect-radius: 0">
              <hl-icon size="xs" fill class="symbol">
                <fill-tel />
              </hl-icon>
              <span class="font-md m-l-sm">语音通知 <span class="text-primary font-bold">52</span> 人</span>
              <hl-group align="items-middle" class="static" gap="var(--sm)">
                <h4 class="font-din text-danger relative" data-suffix="失败">41</h4>
                <h4 class="font-din text-success relative" data-suffix="成功">11</h4>
              </hl-group>
            </hb-data-collect>
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
            <hb-data-collect full="full-x" style="--data-collect-padding: 0; --data-collect-radius: 0">
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
  </hv-panel>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
  setup() {
    return {}
  },
})
</script>
