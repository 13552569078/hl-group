<template>
  <hl-dropdown>
    <span>下拉菜单</span>
    <template #dropdown>
      <hl-dropdown-menu>
        <hl-dropdown-item>数据流</hl-dropdown-item>
        <hl-dropdown-item>传输属性值</hl-dropdown-item>
        <hl-dropdown-item>已断线</hl-dropdown-item>
        <hl-dropdown-item disabled>待恢复</hl-dropdown-item>
        <hl-dropdown-item divider />
        <hl-dropdown-item>其他</hl-dropdown-item>
      </hl-dropdown-menu>
    </template>
  </hl-dropdown>
</template>
