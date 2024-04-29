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
        <hl-row layout="grid" gap="var(--sm)" class="m-t-lg videos">
          <hl-col v-for="item in items" :key="item.title" span="col">
            <hl-group full dir="vertical" class="h-full box-shadow-level3">
              <hl-thumb full :src="item.video" fit="cover" class="card-thumb" style="height: calc(var(--xxs) * 140)" />
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
