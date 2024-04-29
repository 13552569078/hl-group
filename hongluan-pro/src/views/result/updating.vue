<template>
  <hl-row align="items-center">
    <hl-col span="lg:col-8 md:col-10" class="display-flex items-center p-xxl m-t-xxl">
      <hl-group dir="vertical" full="full-x" align="items-middle" gap="var(--xxl)" @click="$router.go(-1)">
        <img src="../../assets/images/logo.svg" alt="" class="m-b-xxl">
        <h1>系统模块升级中...</h1>
        <div class="text-center text-secondary">系统模块正在升级，请勿关闭当前窗口</div>
        <hl-progress :percentage="75" :text="text" track-color="var(--primary-light)" />
      </hl-group>
    </hl-col>
  </hl-row>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const text = ref('正在安装 button 模块')
    return {
      text,
    }
  },
})
</script>
