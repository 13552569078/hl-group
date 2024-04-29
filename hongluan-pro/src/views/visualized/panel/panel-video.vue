<template>
  <hv-panel title="视频列表">
    <hl-row layout="grid" count="count-2" gap="var(--md)" class="m-t-md">
      <hl-col span="col">
        <div class="card-video">
          <hl-thumb full src="https://i0.hippopx.com/photos/298/434/513/beach-dawn-dusk-ocean-thumb.jpg" />
          <transition name="fade">
            <div class="title">标题</div>
          </transition>
        </div>
      </hl-col>
      <hl-col span="col">
        <div class="card-video">
          <hl-thumb full src="https://i0.hippopx.com/photos/738/1016/11/children-fishing-the-activity-asia-thumb.jpg" />
          <transition name="fade">
            <div class="title">标题</div>
          </transition>
        </div>
      </hl-col>
      <hl-col span="col">
        <div class="card-video">
          <hl-thumb full src="https://i0.hippopx.com/photos/264/421/89/child-children-girl-happy-thumb.jpg" />
          <transition name="fade">
            <div class="title">标题</div>
          </transition>
        </div>
      </hl-col>
      <hl-col span="col">
        <div class="card-video">
          <hl-thumb full src="https://i0.hippopx.com/photos/199/210/349/man-board-drawing-muscles-thumb.jpg" />
          <transition name="fade">
            <div class="title">标题</div>
          </transition>
        </div>
      </hl-col>
    </hl-row>
  </hv-panel>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { HlThumb, HlRow, HlCol } from 'hongluan-ui'

export default defineComponent({
  components: {
    HlThumb,
    HlRow,
    HlCol,
  },
  setup() {
    return {}
  },
})
</script>
