<template>
  <hl-row>
    <hl-col span="md:col-12">
      <hl-group indent="var(--md)" class="items-middle">
        <hl-button @click="decrease">
          <template #icon>
            <hl-icon><two-minus /></hl-icon>
          </template>
        </hl-button>
        <hl-progress show-as="dashboard" :percentage="percentage" :color="colors" />
        <hl-button @click="increase">
          <template #icon>
            <hl-icon><two-plus /></hl-icon>
          </template>
        </hl-button>
      </hl-group>
    </hl-col>
    <hl-col span="md:col-12">
      <hl-progress show-as="dashboard" :percentage="percentage2" :color="colors" />
    </hl-col>
  </hl-row>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { TwoMinus, TwoPlus } from '@hongluan-ui/icons'

const percentage = ref(10)
const percentage2 = ref(0)
const colors = ref([
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
])

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

onMounted(() => {
  setInterval(() => {
    percentage2.value = (percentage2.value % 100) + 10
  }, 500)
})

</script>
