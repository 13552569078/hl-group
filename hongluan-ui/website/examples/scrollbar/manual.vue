<template>
  <hl-scrollbar ref="scrollbar" height="calc(var(--lg) * 10)" always @scroll="scroll">
    <div ref="inner">
      <span v-for="item in 20" :key="item" class="display-block p-md m-b-xs bg-primary text-center text-inverse">{{ item }}</span>
    </div>
  </hl-scrollbar>
  <hl-slider v-model="value" :max="max" :format-tooltip="formatTooltip" @input="inputSlider" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const max = ref(0)
const value = ref(0)
const inner = ref(null)
const scrollbar = ref(null)

const inputSlider = value => {
  scrollbar.value.setScrollTop(value)
}
const formatTooltip = value => {
  return `${value} px`
}

const scroll = ({ scrollTop }) => {
  value.value = scrollTop
}

onMounted(() => {
  max.value = inner.value.clientHeight - 380
})
</script>
