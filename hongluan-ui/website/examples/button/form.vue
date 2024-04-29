<template>
  <hl-group gap="var(--sm)">
    <hl-group merge indent>
      <hl-input v-model="input" placeholder="请输入内容" round />
      <hl-button type="primary" icon-position="right" round>
        搜索
        <template #icon>
          <hl-icon><two-search /></hl-icon>
        </template>
      </hl-button>
    </hl-group>

    <hl-group deep-merge indent>
      <hl-select v-model="value" placeholder="请选择" class="fill">
        <template v-for="item in options">
          <hl-option v-if="item.divider" :key="item.value" divider />
          <hl-option v-else :key="item.value" :label="item.label" :value="item.value" />
        </template>
      </hl-select>
      <hl-button type="primary">确定</hl-button>
    </hl-group>
  </hl-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { TwoSearch } from '@hongluan-ui/icons'

const input = ref('')
const options = ref([
  {
    value: '选项1',
    label: '标记状态',
  },
  {
    value: '选项2',
    label: '生成报表',
  },
  {
    value: '选项3',
    label: '统计分析数据',
  },
  {
    divider: true,
  },
  {
    value: '选项4',
    label: '移动到…',
  },
  {
    value: '选项5',
    label: '删除',
  },
])
const value = ref('')
</script>
