<template>
  <hl-button
    v-loading.fullscreen.lock="fullscreenLoading"
    type="primary"
    @click="openFullScreen1"
  >
    指令方式
  </hl-button>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <hl-button
    type="primary"
    @click="openFullScreen2"
  >
    服务方式
  </hl-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { HlLoading } from 'hongluan-ui'


const fullscreenLoading = ref(false)
const openFullScreen1 = () => {
  fullscreenLoading.value = true
  setTimeout(() => {
    fullscreenLoading.value = false
  }, 2000)
}
const openFullScreen2 = () => {
  const loading = HlLoading.service({
    lock: true,
    text: 'Loading',
    spinner: { size: '30px', color: 'yellow' },
    background: 'rgba(0, 0, 0, 0.7)',
  })
  setTimeout(() => {
    loading.close()
  }, 2000)
}
</script>
