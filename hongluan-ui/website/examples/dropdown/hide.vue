<template>
  <hl-dropdown :hide-on-click="false">
    <hl-button>下拉菜单</hl-button>
    <template #dropdown>
      <hl-dropdown-menu>
        <hl-dropdown-item>黄金糕</hl-dropdown-item>
        <hl-dropdown-item>狮子头</hl-dropdown-item>
        <hl-dropdown-item>螺蛳粉</hl-dropdown-item>
        <hl-dropdown-item disabled>双皮奶</hl-dropdown-item>
        <hl-dropdown-item divided>蚵仔煎</hl-dropdown-item>
      </hl-dropdown-menu>
    </template>
  </hl-dropdown>
</template>
