<template show-source>
  <hv-modal title="视频监控" width="calc(var(--xxl) * 25)">
    <hl-row gap="var(--lg)">
      <hl-col span="col-7">
        <hl-input v-model="input" class="m-t-lg" placeholder="请输入查询内容" block>
          <template #suffix>
            <hl-icon>
              <two-search />
            </hl-icon>
          </template>
        </hl-input>
        <hl-tree class="m-t-md" :data="data" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]" :props="defaultProps">
          <template #default="{ node }">
            <hl-group full gap="var(--xs)" align="items-between">
              <hl-group gap="var(--md)">
                <span>{{ node.label }}</span>
              </hl-group>
              <hl-group gap="var(--md)" class="static p-r-md">
                <span class="font-din text-secondary">23</span>
              </hl-group>
            </hl-group>
          </template>
        </hl-tree>
      </hl-col>
      <hl-col span="col">
        <hl-row layout="grid" count="count-3" gap="var(--md)" class="m-t-lg">
          <hl-col v-for="item in items" :key="item.title" span="col">
            <hl-panel class="hl-card float-header full-thumb" borderless>
              <hl-thumb full :src="item.video" fit="cover" class="card-thumb" style="height: calc(var(--xl) * 4)" />
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
      </hl-col>
    </hl-row>
  </hv-modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  components: {},
  setup() {
    const data = ref([
      {
        id: 1,
        label: '一级 1',
        children: [
          {
            id: 4,
            label: '二级 1-1',
            children: [
              {
                id: 9,
                label: '三级 1-1-1',
              },
              {
                id: 10,
                label: '三级 1-1-2',
              },
            ],
          },
        ],
      },
      {
        id: 2,
        label: '一级 2',
        children: [
          {
            id: 5,
            label: '二级 2-1',
          },
          {
            id: 6,
            label: '二级 2-2',
          },
        ],
      },
      {
        id: 3,
        label: '一级 3',
        children: [
          {
            id: 7,
            label: '二级 3-1',
          },
          {
            id: 8,
            label: '二级 3-2',
          },
        ],
      },
    ])
    const defaultProps = ref({
      children: 'children',
      label: 'label',
    })
    const items = ref([
      { id: '1', state: '1', title: '南门摄像头', video: 'https://i0.hippopx.com/photos/298/434/513/beach-dawn-dusk-ocean-thumb.jpg' },
      { id: '2', state: '0', title: '广场监控设备', video: 'https://i0.hippopx.com/photos/738/1016/11/children-fishing-the-activity-asia-thumb.jpg' },
      { id: '3', state: '1', title: '西门监控', video: 'https://i0.hippopx.com/photos/264/421/89/child-children-girl-happy-thumb.jpg' },
      { id: '4', state: '1', title: '塔楼监视器', video: 'https://i0.hippopx.com/photos/199/210/349/man-board-drawing-muscles-thumb.jpg' },
      { id: '5', state: '0', title: '东门监控', video: 'https://i0.hippopx.com/photos/499/297/113/ecology-creative-science-and-technology-park-preview.jpg' },
      { id: '6', state: '1', title: '停车场监控器', video: 'https://i0.hippopx.com/photos/443/657/134/robot-mech-machine-technology-preview.jpg' },
    ])
    return {
      data,
      defaultProps,
      items,
    }
  },
})
</script>
