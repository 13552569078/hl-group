<template>
  <hl-row>
    <hl-col class="col">
      <p class="p-md text-center text-primary">手动交替</p>
      <hl-timeline center>
        <hl-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp" :placement="activity.placement" :dir="activity.dir">
          {{ activity.content }}
        </hl-timeline-item>
      </hl-timeline>
    </hl-col>

    <hl-col class="col">
      <p class="p-md text-center text-danger">自动交替</p>
      <hl-timeline center alternate>
        <hl-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp" :placement="activity.placement">
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
    dir: 'left',
  },
  {
    content: '通过审核',
    timestamp: '2018-04-13',
    dir: 'right',
  },
  {
    content: '创建成功',
    timestamp: '2018-04-11',
    dir: '',
  },
  {
    content: '创建成功',
    timestamp: '2018-04-11',
    dir: 'left',
  },
])
</script>
