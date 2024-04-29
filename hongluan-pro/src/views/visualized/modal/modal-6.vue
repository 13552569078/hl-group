<template show-source>
  <hv-modal title="视频播放列表" style="width: calc(var(--xxl) * 20)">
    <hl-row layout="grid" count="count-3" gap="var(--md)" class="m-t-lg">
      <hl-col v-for="item in items" :key="item.title" span="col">
        <hl-panel class="hl-card float-header full-thumb" borderless>
          <hl-thumb full :src="item.video" fit="cover" class="card-thumb" style="height: calc(var(--xxl) * 4)" />
          <div class="bg-light p-md">
            <hl-group full="full-x" align="items-between">
              <span class="static">{{ item.title }}</span>
              <hl-tag :type="item.state == '1' ? 'yellow' : 'default'" size="sm" class="static">
                <template v-if="item.state == '1'">在线</template>
                <template v-if="item.state == '0'">离线</template>
              </hl-tag>
            </hl-group>
          </div>
        </hl-panel>
      </hl-col>
    </hl-row>
    <hl-pagination layout="prev, pager, next" :total="50" align="items-right" class="m-t-lg" />
  </hv-modal>
  <!-- 面板内容 end-->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const items = ref([
      { id: '1', state:'1', title: '南门摄像头', video:'https://i0.hippopx.com/photos/298/434/513/beach-dawn-dusk-ocean-thumb.jpg' },
      { id: '2', state:'0', title: '广场监控设备', video:'https://i0.hippopx.com/photos/738/1016/11/children-fishing-the-activity-asia-thumb.jpg' },
      { id: '3', state:'1', title: '西门监控', video:'https://i0.hippopx.com/photos/264/421/89/child-children-girl-happy-thumb.jpg' },
      { id: '4', state:'1', title: '塔楼监视器', video:'https://i0.hippopx.com/photos/199/210/349/man-board-drawing-muscles-thumb.jpg' },
      { id: '5', state:'0', title: '东门监控', video:'https://i0.hippopx.com/photos/499/297/113/ecology-creative-science-and-technology-park-preview.jpg' },
      { id: '6', state:'1', title: '停车场监控器', video:'https://i0.hippopx.com/photos/443/657/134/robot-mech-machine-technology-preview.jpg' },
    ])
    return {
      items,
    }
  },
})
</script>
