<template>
  <hl-row>
    <hl-col span="col">
      <hl-timeline>
        <hl-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp">
          {{ activity.content }}
        </hl-timeline-item>
      </hl-timeline>
    </hl-col>

    <hl-col span="col">
      <hl-timeline>
        <hl-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp" dir="left">
          {{ activity.content }}
        </hl-timeline-item>
      </hl-timeline>
    </hl-col>
  </hl-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activities = ref([
  {
    content: '活动按期开始',
    timestamp: '2018-04-15',
  },
  {
    content: '通过审核',
    timestamp: '2018-04-13',
  },
  {
    content: '创建成功',
    timestamp: '2018-04-11',
  },
  {
    content: '创建成功',
    timestamp: '2018-04-11',
  },
])

</script>
