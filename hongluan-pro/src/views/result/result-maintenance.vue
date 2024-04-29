<template>
  <hl-row style="height: 100vh" align="items-middle items-center">
    <hl-col span="md:col-10">
      <hl-group dir="vertical" full="full-x" align="items-middle" gap="var(--lg)" @click="$router.go(-1)">
        <img src="../../assets/images/404.svg" alt="">
        <h5>系统正在维护中，请稍后访问或者致电运维人员</h5>
      </hl-group>
    </hl-col>
  </hl-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>
