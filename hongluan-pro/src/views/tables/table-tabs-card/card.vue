<template>
  <hl-row class="m-b-lg" gap="var(--lg)">
    <hl-col v-for="item in topCard" :key="item.title" span="lg:col-6 md:col-12">
      <hb-data-collect class="box-shadow-level3 bg-element" full padding="var(--xl)" gap="var(--sm)" radius="var(--radius-lg)">
        <hl-icon :type="item.type" effect="light" size="xl" fill radius>
          <component :is="'fill' + item.icon" />
        </hl-icon>
        <hl-group dir="vertical">
          <h2 class="title">{{ item.value }}</h2>
          <span class="sub-title">{{ item.title }}</span>
        </hl-group>
        <hl-progress show-as="circle" type="primary" :stroke-width="6" :percentage="Math.floor(Math.random() * (1 - 100) + 100)" class="static" style="width: 56px; height: 56px">
          <template #default="{ percentage }">
            <div class="progress-content">{{ percentage }}%</div>
          </template>
        </hl-progress>
      </hb-data-collect>
    </hl-col>
  </hl-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const topCard = ref([
      { icon: 'Alert', title: '报警次数统计', value: Math.floor(Math.random() * 10000), type: 'primary', num: Math.floor(Math.random() * (1 - 100) + 100) },
      { icon: 'UserGroup', title: '报警次数统计', value: Math.floor(Math.random() * 10000), type: 'danger', num: Math.floor(Math.random() * (1 - 100) + 100) },
      { icon: 'Pie', title: '报警次数统计', value: Math.floor(Math.random() * 10000), type: 'warning', num: Math.floor(Math.random() * (1 - 100) + 100) },
      { icon: 'ChartBar', title: '报警次数统计', value: Math.floor(Math.random() * 10000), type: 'success', num: Math.floor(Math.random() * (1 - 100) + 100) },
    ])
    return {
      topCard,
    }
  },
})
</script>
