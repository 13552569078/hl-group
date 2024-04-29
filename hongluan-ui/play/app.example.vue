<template>
  <hl-group class="play-container" indent="var(--md)">
    <hl-icon color="#409EFC">
      <fill-more />
    </hl-icon>
    <hl-icon>
      <two-airplay />
    </hl-icon>
    <hl-button type="primary">test</hl-button>
    <div v-ripple class="w-md h-md text-primary" style="background: green">
      测试Ripple指令
    </div>
  </hl-group>
</template>

<script setup lang="ts">
// code here
</script>

<style lang="scss">
html,
body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  #play {
    height: 100%;
    width: 100%;
    .play-container {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
