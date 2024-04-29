<template>
  <hl-switch v-model="status1.value1" :loading="status1.loading1" :before-change="beforeChange1" class="m-r-md" />
  <hl-switch v-model="status2.value2" :loading="status2.loading2" :before-change="beforeChange2" />
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { HlMessage } from 'hongluan-ui'

const status1 = reactive({
  value1: false,
  loading1: false,
})

const beforeChange1 = () => {
  status1.loading1 = true
  return new Promise(resolve => {
    setTimeout(() => {
      status1.loading1 = false
      HlMessage.success('切换成功')
      return resolve(true)
    }, 1000)
  })
}

const status2 = reactive({
  value2: false,
  loading2: false,
})

const beforeChange2 = () => {
  status2.loading2 = true
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      status2.loading2 = false
      HlMessage.error('切换失败')
      return reject(new Error('Error'))
    }, 1000)
  })
}

</script>
