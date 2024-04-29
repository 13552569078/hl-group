<template>
  <hl-row>
    <hl-col span="col">
      <p class="p-b-md">横向排列 horizontal</p>
      <hl-group dir="horizontal" gap="var(--md)" class="bg-stripes">
        <hl-button type="primary">Group Item</hl-button>
        <hl-button type="primary">Group Item</hl-button>
      </hl-group>
    </hl-col>
    <hl-col span="col">
      <p class="p-b-md">纵向排列 vertical</p>
      <hl-group dir="vertical" gap="var(--md)" class="bg-stripes">
        <hl-button type="primary">Group Item</hl-button>
        <hl-button type="primary">Group Item</hl-button>
      </hl-group>
    </hl-col>
  </hl-row>
</template>
