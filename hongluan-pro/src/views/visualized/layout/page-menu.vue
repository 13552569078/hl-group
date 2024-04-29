<template>
  <div class="bottom-menu" :class="isCollapse ? 'menu-hide' : ''">
    <div class="item" :class="currentScene === 'sceneRisk' ? 'is-active' : ''" @click="handleClick('sceneRisk')">
      <span class="title">风险一张图</span>
      <span class="bg"></span>
    </div>
    <div class="item" :class="currentScene === 'sceneCheck' ? 'is-active' : ''" @click="handleClick('sceneCheck')">
      <span class="title">巡检一张图</span>
      <span class="bg"></span>
    </div>
    <div class="item collapse" @click="toggleCollapse">
      <span class="title">收起</span>
      <span class="bg"></span>
    </div>
    <div class="item right" :class="currentScene === 'sceneHidden' ? 'is-active' : ''" @click="handleClick('sceneHidden')">
      <span class="title">隐患一张图</span>
      <span class="bg"></span>
    </div>
    <div class="item right" :class="currentScene === 'sceneAccident' ? 'is-active' : ''" @click="handleClick('sceneAccident')">
      <span class="title">报警一张图</span>
      <span class="bg"></span>
    </div>
  </div>
  <div class="btn-collapse" :class="isCollapse ? 'menu-hide' : ''" @click="toggleCollapse"></div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PageMenu',
  setup() {
    const currentScene = ref('')
    const isCollapse = ref(false)
    const toggleCollapse = () => {
      isCollapse.value = !isCollapse.value
    }
    return {
      currentScene,
      isCollapse,
      toggleCollapse,
    }
  },
})
</script>
<style lang="scss" scoped></style>
