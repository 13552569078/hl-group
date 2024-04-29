<template>
  <hl-group indent="var(--md)">
    <hl-time-select
      v-model="startTime"
      :max-time="endTime"
      class="mr-4"
      placeholder="开始时间"
      start="08:30"
      step="00:15"
      end="18:30"
    />
    <hl-time-select
      v-model="endTime"
      :min-time="startTime"
      placeholder="结束时间"
      start="08:30"
      step="00:15"
      end="18:30"
    />
  </hl-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const startTime = ref('')
const endTime = ref('')

</script>
