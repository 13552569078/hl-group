<template>
  <hl-row>
    <hl-col span="md:col-12">
      <p><code>gap</code>能更友好的对组成员进行排序</p>
      <hl-group dir="horizontal" gap="var(--md)" class="m-t-sm">
        <hl-button type="primary" class="order-3">Item 1</hl-button>
        <hl-button type="primary" class="order-4">Item 2</hl-button>
        <hl-button type="primary" class="order-1">Item 3</hl-button>
        <hl-button type="primary" class="order-2">Item 4</hl-button>
      </hl-group>
    </hl-col>
    <hl-col span="md:col-12">
      <p><code>indent</code>无法对组成员进行友好排序</p>
      <hl-group dir="horizontal" indent="var(--md)" class="m-t-sm">
        <hl-button type="danger" class="order-3">Item 1</hl-button>
        <hl-button type="danger" class="order-4">Item 2</hl-button>
        <hl-button type="danger" class="order-1">Item 3</hl-button>
        <hl-button type="danger" class="order-2">Item 4</hl-button>
      </hl-group>
    </hl-col>
  </hl-row>
</template>
