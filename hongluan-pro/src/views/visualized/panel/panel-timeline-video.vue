<template>
  <hv-panel title="视频时间轴">
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
              <h5>2021-10-12 20:46</h5>
            </hl-group>
            <hl-group align="items-middle" class="static">
              <span class="text-secondary">上报人：白露</span>
              <hl-button type="link" class="sm" equal>
                <template #icon>
                  <hl-icon>
                    <fill-Tel />
                  </hl-icon>
                </template>
              </hl-button>
            </hl-group>
          </hl-group>

          <hl-group dir="vertical" gap="var(--md)" class="p-md border bg-light">
            <hl-thumb full src="https://i0.hippopx.com/photos/443/657/134/robot-mech-machine-technology-preview.jpg" fit="cover" />
            <hl-group dir="vertical" gap="var(--xxs)">
              <hl-group>
                <h6 class="ellipsis text-primary">环翠区青屏山国家森林公园C区高速公路G</h6>
              </hl-group>
              <div class="font-sm ellipsis" style="--line: 2">林区起火点，火势很大，一键燃烧2个小时以上，需要立刻救援，目前伤亡人数仍不明确</div>
            </hl-group>
          </hl-group>
        </hl-group>
      </hl-timeline-item>

      <hl-timeline-item :hide-timestamp="true">
        <hl-group dir="vertical" full="full-x" class="p-b-lg" gap="var(--xs)">
          <hl-group align="items-middle items-between" gap="var(--xs)">
            <h5>2021-10-12 20:46</h5>
            <hl-group align="items-middle" class="static">
              <span class="text-secondary">上报人：白露</span>
              <hl-button type="link" class="sm" equal>
                <template #icon>
                  <hl-icon>
                    <fill-Tel />
                  </hl-icon>
                </template>
              </hl-button>
            </hl-group>
          </hl-group>

          <hl-row layout="grid" count="count-2" gap="var(--md)" class="p-md border bg-light">
            <hl-col span="col">
              <div class="card-video">
                <hl-thumb fit="cover" full src="https://i0.hippopx.com/photos/298/434/513/beach-dawn-dusk-ocean-thumb.jpg" />
                <transition name="fade">
                  <div class="title">标题</div>
                </transition>
              </div>
            </hl-col>
            <hl-col span="col">
              <div class="card-video">
                <hl-thumb fit="cover" full src="https://i0.hippopx.com/photos/738/1016/11/children-fishing-the-activity-asia-thumb.jpg" />
                <transition name="fade">
                  <div class="title">标题</div>
                </transition>
              </div>
            </hl-col>
            <hl-col span="col">
              <div class="card-video">
                <hl-thumb fit="cover" full src="https://i0.hippopx.com/photos/264/421/89/child-children-girl-happy-thumb.jpg" />
                <transition name="fade">
                  <div class="title">标题</div>
                </transition>
              </div>
            </hl-col>
            <hl-col span="col">
              <div class="card-video">
                <hl-thumb fit="cover" full src="https://i0.hippopx.com/photos/199/210/349/man-board-drawing-muscles-thumb.jpg" />
                <transition name="fade">
                  <div class="title">标题</div>
                </transition>
              </div>
            </hl-col>
          </hl-row>
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
