<template show-source>
  <hv-modal title="视频资源" width="calc(var(--xxl) * 30)">
    <hl-row gap="var(--lg)">
      <hl-col span="col-6">
        <hl-radio-group v-model="types.active" custom gap="var(--xs)" full class="m-t-lg">
          <hl-radio v-for="item in types.content" :key="item.val" :label="item.val" type="primary" class="w-full">
            <hl-button size="sm" class="checked:text-primary" block>{{ item.label }}</hl-button>
          </hl-radio>
        </hl-radio-group>
        <hl-input v-model="input" class="m-t-md" placeholder="请输入查询内容" block>
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
                <span class="font-sm text-secondary">23</span>
              </hl-group>
            </hl-group>
          </template>
        </hl-tree>
      </hl-col>
      <hl-col span="col">
        <hl-row layout="grid" count="count-3" gap="var(--sm)" class="m-t-lg videos">
          <hl-col v-for="item in items" :key="item.title" span="col">
            <hl-group full dir="vertical" class="h-full box-shadow-level3">
              <hl-thumb full :src="item.video" fit="cover" class="card-thumb" style="height: calc(var(--xxs) * 40)" />
              <hl-group full="full-x" align="items-between" class="static bg-light p-md">
                <span class="static">{{ item.title }}</span>
                <hl-tag :type="item.state == '1' ? 'yellow' : 'default'" size="sm" class="static">
                  <template v-if="item.state == '1'">在线</template>
                  <template v-if="item.state == '0'">离线</template>
                </hl-tag>
              </hl-group>
            </hl-group>
          </hl-col>
        </hl-row>
        <hl-group class="m-t-lg" full align="items-between">
          <hl-group />
          <hl-group class="static">
            <hl-button class="border-transparent bg-transparent text-secondary text-primary-hover" equal>
              <template #icon>
                <hl-icon>
                  <fill-CameraOff />
                </hl-icon>
              </template>
            </hl-button>

            <hl-dropdown trigger="click">
              <hl-button class="border-transparent bg-transparent text-secondary text-primary-hover" equal>
                <template #icon>
                  <hl-icon>
                    <fill-layout />
                  </hl-icon>
                </template>
              </hl-button>

              <template #dropdown>
                <hl-dropdown-menu>
                  <hl-dropdown-item>
                    一屏
                    <template #icon>
                      <hl-icon><two-star /></hl-icon>
                    </template>
                  </hl-dropdown-item>
                  <hl-dropdown-item>
                    二屏
                    <template #icon>
                      <hl-icon><two-page /></hl-icon>
                    </template>
                  </hl-dropdown-item>
                  <hl-dropdown-item>
                    三屏
                    <template #icon>
                      <hl-icon><two-chart-pie /></hl-icon>
                    </template>
                  </hl-dropdown-item>
                  <hl-dropdown-item>
                    四屏
                    <template #icon>
                      <hl-icon><two-folder-in /></hl-icon>
                    </template>
                  </hl-dropdown-item>
                  <hl-dropdown-item>
                    五屏
                    <template #icon>
                      <hl-icon><two-delete /></hl-icon>
                    </template>
                  </hl-dropdown-item>
                </hl-dropdown-menu>
              </template>
            </hl-dropdown>

            <hl-button class="border-transparent bg-transparent text-secondary text-primary-hover" equal>
              <template #icon>
                <hl-icon>
                  <fill-Minimize />
                </hl-icon>
              </template>
            </hl-button>
            <hl-button class="border-transparent bg-transparent text-secondary text-primary-hover" equal>
              <template #icon>
                <hl-icon>
                  <fill-Maximize />
                </hl-icon>
              </template>
            </hl-button>
          </hl-group>
        </hl-group>
      </hl-col>
    </hl-row>
  </hv-modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  components: {},
  setup() {
    const types = reactive({
      content: [
        {
          label: '固定视频',
          val: 'info',
        },
        {
          label: '无人机',
          val: 'event',
        },
        {
          label: '移动单兵',
          val: 'rsources',
        },
      ],
      active: 'event',
    })
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
      types,
      data,
      defaultProps,
      items,
    }
  },
})
</script>

<style lang="scss" scoped>
.videos {
  .hl-col {
    &:nth-child(1) {
      grid-row: span 2;
      grid-column: span 2;
    }
  }
}
</style>
