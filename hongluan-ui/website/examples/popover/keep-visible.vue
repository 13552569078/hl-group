<template>
  <hl-popover
    placement="bottom"
    title="标题"
    :width="200"
    trigger="click"
    :outside-ignore="outsideIgnore"
  >
    <template #reference>
      <hl-button class="m-r-md">click 激活</hl-button>
    </template>
    <hl-select ref="selecRef" v-model="selectVal" class="m-b-md">
      <hl-option value="1" label="1" />
      <hl-option value="2" label="2" />
      <hl-option value="3" label="3" />
    </hl-select>
    <hl-time-select ref="timeSelecRef" v-model="timeSelectVal" class="m-b-md" />
    <hl-date-picker ref="timePickerRef" v-model="timePickerVal" class="m-b-md" />
  </hl-popover>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const selecRef = ref()
const timeSelecRef = ref()
const timePickerRef = ref()
const selectVal = ref('')
const timeSelectVal = ref('')
const timePickerVal = ref('')

const outsideIgnore = computed(() => [
  selecRef.value?.popperPaneRef,
  timePickerRef.value?.popperPaneRef,
  timeSelecRef.value?.popperPaneRef,
])
</script>
