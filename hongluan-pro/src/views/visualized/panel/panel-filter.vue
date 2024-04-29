<template show-source>
  <hv-panel title="筛选面板" body-height="600px">
    <template #action>
      <hl-group full="full-x" gap="var(--sm)" align="items-middle">
        <hl-icon class="cursor-pointer" size="lg" type="primary" gradient transition>
          <fill-repeat />
        </hl-icon>
        <hl-button size="sm" type="primary" outline>新增监测事件</hl-button>
      </hl-group>
    </template>
    <hl-group dir="vertical" full class="h-full">
      <hl-group class="m-t-lg static" full="full-x" gap="var(--md)">
        <hl-select v-model="value" placeholder="事件类型">
          <hl-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </hl-select>
        <hl-select v-model="value" placeholder="事件状态">
          <hl-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </hl-select>
      </hl-group>
      <hl-input v-model="input" class="m-t-md static" block>
        <template #suffix>
          <hl-icon>
            <two-search />
          </hl-icon>
        </template>
      </hl-input>
      <hl-group class="m-t-md static" full="full-x" gap="var(--md)">
        <hl-radio-group v-model="date.active" custom gap="var(--md)">
          <hl-radio v-for="item in date.content" :key="item.val" :label="item.val" type="primary" class="w-full">
            <hl-button size="sm" block>{{ item.label }}</hl-button>
          </hl-radio>
        </hl-radio-group>
      </hl-group>
      <hl-group class="m-t-md m-b-xs static" full="full-x" align="items-middle items-between">
        <hl-checkbox v-model="checked">
          <span class="text-secondary">只显示待办</span>
        </hl-checkbox>
        <hl-group align="items-bottom" gap="var(--xxs)" class="static">
          <span class="text-secondary">共选择</span>
          <em class="font-xl font-bold font-din">12</em>
          <span class="text-secondary">起</span>
        </hl-group>
      </hl-group>
      <hl-scrollbar>
        <hl-group dir="vertical" full="full-x" gap="var(--xs)">
          <hl-group v-for="item in tableData" :key="item.id" dir="vertical" class="bg-light p-md">
            <hl-group align="items-middle" gap="var(--sm)">
              <span class="font-lg font-bold ellipsis">{{ item.label }}</span>
              <hl-group gap="var(--xs)" class="static">
                <hl-tag size="sm">{{ item.tag }}</hl-tag>
                <hl-tag size="sm" :type="item.state">{{ item.stateName }}</hl-tag>
              </hl-group>
            </hl-group>
            <hl-group align="items-between middle" class="m-t-xs">
              <hl-group gap="var(--xs)" dir="vertical">
                <hl-group class="text-secondary">
                  <span>监测主体：</span><span>{{ item.subject }}</span>
                </hl-group>
                <hl-group align="items-middle" class="text-secondary" gap="var(--xs)">
                  <hl-icon size="xs">
                    <fill-clock />
                  </hl-icon>
                  <span>{{ item.date }}</span>
                  <span>{{ item.time }}</span>
                </hl-group>
              </hl-group>
              <hl-button no-fill equal type="primary">
                <template #icon>
                  <hl-icon>
                    <fill-file />
                  </hl-icon>
                </template>
              </hl-button>
            </hl-group>
          </hl-group>
        </hl-group>
      </hl-scrollbar>
    </hl-group>
  </hv-panel>
  <!-- 面板内容 end-->
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup() {
    const options = ref([
      {
        value: '选项1',
        label: '云服务器ECS',
      },
      {
        value: '选项2',
        label: '裸金属服务器BMS',
      },
    ])
    const value = ref('')
    const input = ref('')
    const date = reactive({
      content: [
        {
          label: '全部',
          val: 'all',
        },
        {
          label: '今日',
          val: 'today',
        },
        {
          label: '近一周',
          val: 'week',
        },
        {
          label: '自定义',
          val: 'custom',
        },
      ],
      active: 'all',
    })
    const checked = ref(true)
    const tableData = ref([
      {
        id: 1,
        label: '碧桂园西门消防通道占用碧桂园西门消防通道占用碧桂园西门消防通道占用碧桂园西门消防通道占用',
        tag: '消防通道占用',
        state: 'red',
        stateName: '新发生',
        subject: '北京西路',
        date: '11-08',
        time: '10:59',
      },
      {
        id: 2,
        label: '碧桂园西门消防通道占用',
        tag: '消防通道占用',
        state: 'yellow',
        stateName: '已补全',
        subject: '北京西路',
        date: '11-08',
        time: '10:59',
      },
      {
        id: 3,
        label: '碧桂园西门消防通道占用',
        tag: '消防通道占用',
        state: 'blue',
        stateName: '待预警',
        subject: '北京西路',
        date: '11-08',
        time: '10:59',
      },
      {
        id: 4,
        label: '碧桂园西门消防通道占用',
        tag: '消防通道占用',
        state: 'pink',
        stateName: '已关闭',
        subject: '北京西路',
        date: '11-08',
        time: '10:59',
      },
      {
        id: 5,
        label: '碧桂园西门消防通道占用',
        tag: '消防通道占用',
        state: 'blue',
        stateName: '待预警',
        subject: '北京西路',
        date: '11-08',
        time: '10:59',
      },
    ])

    return {
      options,
      value,
      input,
      date,
      checked,
      tableData,
    }
  },
})
</script>
