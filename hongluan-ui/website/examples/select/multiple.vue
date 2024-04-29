<template>
  <hl-select v-model="value1" multiple placeholder="请选择" clearable style="width: 300px;">
    <hl-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    <template #prefix>
      <hl-icon><two-computer /></hl-icon>
    </template>
  </hl-select>
  <br><br>
  <hl-select v-model="value1" multiple filterable placeholder="可搜索" style="width: 300px;">
    <hl-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </hl-select>
  <br><br>
  <hl-select
    v-model="value2"
    size="sm"
    multiple
    clearable
    collapse-tags
    placeholder="请选择"
    style="width: 300px;"
  >
    <hl-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </hl-select>
  <br><br>
  <hl-select
    v-model="value2"
    size="sm"
    multiple
    filterable
    clearable
    collapse-tags
    collapse-tags-tooltip
    placeholder="请选择"
    style="width: 300px;"
  >
    <hl-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </hl-select>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TwoComputer } from '@hongluan-ui/icons'

const options = ref([
  {
    value: '选项1',
    label: '黄金糕',
  },
  {
    value: '选项2',
    label: '双皮奶',
  },
  {
    value: '选项3',
    label: '蚵仔煎',
  },
  {
    value: '选项4',
    label: '龙须面',
  },
  {
    value: '选项5',
    label: '北京烤鸭',
  },
  {
    value: '选项6',
    label: '北京烤鸭2',
  },
  {
    value: '选项7',
    label: '北京烤鸭3',
  },
])
const value1 = ref([])
const value2 = ref([])

</script>
