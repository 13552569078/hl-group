<template>
  <div class="block">
    <hl-timeline>
      <hl-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :type="activity.type"
        :color="activity.color"
        :timestamp="activity.timestamp"
        :placement="activity.placement"
      >
        {{ activity.content }}
        <template #icon>
          <hl-icon v-if="activity.icon" :type="activity.icon.type" round fill effect="light">
            <component :is="activity.icon.name" />
          </hl-icon>
        </template>
      </hl-timeline-item>
    </hl-timeline>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activities = ref([
  {
    content: '使用Icon图标组件',
    timestamp: '2018-04-12 20:46',
    icon: {
      name: 'TwoNews',
      type: 'primary',
    },
    color: '#0bbd87',
  },
  {
    content: '自定义颜色',
    timestamp: '2018-04-03 20:46',
    color: '#0bbd87',
  },
  {
    content: '使用状态色',
    timestamp: '2018-04-03 20:46',
    icon: {
      name: 'TwoAirplay',
      type: 'danger',
    },
  },
])
</script>
