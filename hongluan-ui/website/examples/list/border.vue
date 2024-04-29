<template>
  <hl-select v-model="value" clearable placeholder="请选择" class="m-b-md">
    <template v-for="item in options">
      <hl-option v-if="item.divider" :key="item.value" divider />
      <hl-option v-else :key="item.value" :label="item.label" :value="item.value" />
    </template>
  </hl-select>
  <hl-row>
    <hl-col span="md:col-12">
      <hl-list :border="value">
        <hl-list-item v-for="(item, index) in items" :key="index" :to="{ path: item.path }">
          {{ item.content }}
        </hl-list-item>
      </hl-list>
    </hl-col>
  </hl-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  {
    icon: 'TwoApplication',
    content: 'Grid 栅格',
    path: '/',
  },
  {
    icon: 'TwoCamera',
    content: 'Group 组',
    path: '/',
  },
  {
    icon: 'TwoBriefcase',
    content: 'Layout 布局',
    path: '/',
  },
  {
    icon: 'TwoBookOpen',
    content: 'Typography 排版',
    path: '/',
  },
  {
    icon: 'TwoBookOpen',
    content: 'Icon 图标',
    path: '/',
  },
  {
    icon: 'TwoBookOpen',
    content: 'Transition 动画',
    path: '/',
  },
])
const options = ref([
  {
    value: '',
    label: 'default',
  },
  {
    value: 'border-x',
    label: 'border-x',
  },
  {
    value: 'bordered',
    label: 'bordered',
  },
])
const value = ref('')

</script>
