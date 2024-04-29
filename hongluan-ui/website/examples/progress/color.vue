<template>
  <hl-row gap="var(--md)">
    <hl-col span="lg:col-8">
      <hl-progress :percentage="percentage" :color="customColor" />
    </hl-col>
    <hl-col span="lg:col-8">
      <hl-progress :percentage="percentage" :color="customColorMethod" />
    </hl-col>
    <hl-col span="lg:col-8">
      <hl-progress :percentage="percentage" :color="customColors" />
    </hl-col>
  </hl-row>

  <hl-group merge indent class="m-t-lg">
    <hl-button class="group-item" @click="decrease">
      <template #icon>
        <hl-icon><two-minus /></hl-icon>
      </template>
    </hl-button>
    <hl-button class="group-item" @click="increase">
      <template #icon>
        <hl-icon><two-plus /></hl-icon>
      </template>
    </hl-button>
  </hl-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { TwoMinus, TwoPlus } from '@hongluan-ui/icons'


const percentage = ref(20)
const customColor = ref('#409eff')
const customColors = ref([
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
])

const customColorMethod = percentage => {
  if (percentage < 30) {
    return '#909399'
  } else if (percentage < 70) {
    return '#e6a23c'
  } else {
    return '#67c23a'
  }
}
const increase = () => {
  percentage.value += 10
  if (percentage.value > 100) {
    percentage.value = 100
  }
}
const decrease = () => {
  percentage.value -= 10
  if (percentage.value < 0) {
    percentage.value = 0
  }
}

</script>
