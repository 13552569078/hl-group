<template>
  <hl-group class="m-t-lg" full="full-x" align="items-middle" gap="var(--sm)">
    <span class="static">搜索半径:</span>
    <hl-select v-model="value" class="static" placeholder="请选择">
      <hl-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </hl-select>
  </hl-group>
  <hl-scrollbar class="m-t-lg" style="height: calc(var(--xxl) * 14)">
    <hl-group dir="vertical" full="full-x" gap="var(--sm)">
      <hl-group v-for="item in tableData" :key="item.id" dir="vertical" class="bg-light hover:bg-hover cursor-pointer transition">
        <hl-group gap="var(--md)" align="items-middle" full="full-x" class="p-md">
          <hl-icon type="primary" size="lg" effect="light" fill class="static">
            <fill-home />
          </hl-icon>
          <hl-group dir="vertical" gap="var(--xs)">
            <hl-group align="items-middle" gap="var(--sm)">
              <span class="font-lg font-bold ellipsis w-full">{{ item.label }}</span>
              <hl-tag size="sm" class="static">{{ item.range }}</hl-tag>
            </hl-group>
            <hl-group gap="var(--xxl)" class="text-secondary">
              <hl-group gap="var(--sm)">
                <span>联系人:</span>
                <span>{{ item.name }}</span>
              </hl-group>
              <hl-group gap="var(--sm)">
                <span>联系电话:</span>
                <span>{{ item.phone }}</span>
              </hl-group>
            </hl-group>
          </hl-group>
        </hl-group>
        <hl-group align="items-middle" class="bg-light p-md text-secondary" gap="var(--xs)">
          <hl-icon size="xs">
            <fill-dot />
          </hl-icon>
          <span>{{ item.location }}</span>
        </hl-group>
      </hl-group>
    </hl-group>
  </hl-scrollbar>
  <hl-pagination layout="prev, pager, next" :total="50" align="right" class="m-t-lg" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup() {
    const options = ref([
      {
        value: '1公里内',
        label: '1公里内',
      },
      {
        value: '2公里内',
        label: '2公里内',
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
        type: '新发生',
        label: '泉城人民医院',
        range: '500m',
        name: '小马哥',
        phone: '13912344321',
        location: '泉城广场南西侧北门东出口12号',
      },
      {
        id: 2,
        type: '新发生',
        label: '泉城人民医院',
        range: '500m',
        name: '小马哥',
        phone: '13912344321',
        location: '泉城广场南西侧北门东出口12号',
      },
      {
        id: 3,
        type: '新发生',
        label: '泉城人民医院',
        range: '500m',
        name: '小马哥',
        phone: '13912344321',
        location: '泉城广场南西侧北门东出口12号',
      },
      {
        id: 4,
        type: '新发生',
        label: '泉城人民医院',
        range: '500m',
        name: '小马哥',
        phone: '13912344321',
        location: '泉城广场南西侧北门东出口12号',
      },
      {
        id: 5,
        type: '新发生',
        label: '泉城人民医院',
        range: '500m',
        name: '小马哥',
        phone: '13912344321',
        location: '泉城广场南西侧北门东出口12号',
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
