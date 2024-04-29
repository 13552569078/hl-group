<template>
  <hl-row gap="var(--lg)">
    <hl-col span="md:col-12">
      listGap：
      <hl-select v-model="value" clearable placeholder="请选择" class="m-b-md">
        <template v-for="item in options">
          <hl-option v-if="item.divider" :key="item.value" divider />
          <hl-option v-else :key="item.value" :label="item.label" :value="item.value" />
        </template>
      </hl-select>
      <hl-list :gap="value" border="bordered">
        <hl-list-item v-for="(item, index) in items" :key="index" :to="{ path: item.path }">
          {{ item.content }}
        </hl-list-item>
      </hl-list>
    </hl-col>
    <hl-col span="md:col-12">
      itemGap：
      <hl-select v-model="value1" clearable placeholder="请选择" class="m-b-md">
        <template v-for="item in options">
          <hl-option v-if="item.divider" :key="item.value" divider />
          <hl-option v-else :key="item.value" :label="item.label" :value="item.value" />
        </template>
      </hl-select>
      <hl-list :item-gap="value1" border="bordered">
        <hl-list-item v-for="(item, index) in items" :key="index" :to="{ path: item.path }">
          <template #prefix>
            <hl-icon>
              <component :is="item.icon" />
            </hl-icon>
          </template>
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
    icon: 'TwoAirplay',
    content: 'Icon 图标',
    path: '/',
  },
  {
    icon: 'TwoDatabase',
    content: 'Transition 动画',
    path: '/',
  },
])
const options = ref([
  {
    value: '0',
    label: 'none',
  },
  {
    divider: true,
  },
  {
    value: 'var(--xxs)',
    label: 'xxs',
  },
  {
    value: 'var(--xs)',
    label: 'xs',
  },
  {
    value: 'var(--sm)',
    label: 'sm',
  },
  {
    value: 'var(--md)',
    label: 'md',
  },
  {
    value: 'var(--lg)',
    label: 'lg',
  },
  {
    value: 'var(--xl)',
    label: 'xl',
  },
  {
    value: 'var(--xxl)',
    label: 'xxl',
  },
])
const value = ref('0')
const value1 = ref('var(--sm)')

</script>
