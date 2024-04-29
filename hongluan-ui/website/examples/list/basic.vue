<template>
  <hl-list>
    <hl-list-item v-for="(item, index) in items" :key="index">
      {{ item.content }}
    </hl-list-item>
  </hl-list>
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
</script>
