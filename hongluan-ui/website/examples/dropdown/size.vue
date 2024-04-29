<template>
  <hl-dropdown size="sm" split="button" type="primary" class="m-r-md">
    小型尺寸
    <template #dropdown>
      <hl-dropdown-menu>
        <hl-dropdown-item>dropdown-item</hl-dropdown-item>
      </hl-dropdown-menu>
    </template>
  </hl-dropdown>

  <hl-dropdown split="button" type="danger" class="m-r-md">
    默认尺寸
    <template #dropdown>
      <hl-dropdown-menu>
        <hl-dropdown-item>dropdown-item</hl-dropdown-item>
      </hl-dropdown-menu>
    </template>
  </hl-dropdown>

  <hl-dropdown size="lg" split="button" type="success" class="m-r-md">
    大型尺寸
    <template #dropdown>
      <hl-dropdown-menu>
        <hl-dropdown-item>dropdown-item</hl-dropdown-item>
      </hl-dropdown-menu>
    </template>
  </hl-dropdown>
</template>
