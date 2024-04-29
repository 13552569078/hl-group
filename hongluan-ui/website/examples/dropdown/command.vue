<template>
  <hl-dropdown @command="handleCommand">
    <hl-button>下拉菜单</hl-button>
    <template #dropdown>
      <hl-dropdown-menu>
        <hl-dropdown-item command="a">黄金糕</hl-dropdown-item>
        <hl-dropdown-item command="b">狮子头</hl-dropdown-item>
        <hl-dropdown-item command="c">螺蛳粉</hl-dropdown-item>
        <hl-dropdown-item command="d" disabled>双皮奶</hl-dropdown-item>
        <hl-dropdown-item command="e" divided>蚵仔煎</hl-dropdown-item>
      </hl-dropdown-menu>
    </template>
  </hl-dropdown>
</template>

<script lang="ts" setup>
import { HlMessage } from 'hongluan-ui'

const handleCommand = command => {
  HlMessage('你点击了：' + command)
}

</script>
