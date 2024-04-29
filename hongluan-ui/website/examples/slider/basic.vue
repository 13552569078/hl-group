<template>
  <div class="block">
    <span class="demonstration">默认</span>
    <hl-slider v-model="value1" />
  </div>
  <div class="block">
    <span class="demonstration">自定义初始值</span>
    <hl-slider v-model="value2" />
  </div>
  <div class="block">
    <span class="demonstration">隐藏 Tooltip</span>
    <hl-slider v-model="value3" :show-tooltip="false" />
  </div>
  <div class="block">
    <span class="demonstration">格式化 Tooltip</span>
    <hl-slider v-model="value4" :format-tooltip="formatTooltip" />
  </div>
  <div class="block">
    <span class="demonstration">禁用</span>
    <hl-slider v-model="value5" disabled />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(0)
const value2 = ref(50)
const value3 = ref(36)
const value4 = ref(48)
const value5 = ref(42)

const formatTooltip = val => {
  return val / 100
}
</script>
