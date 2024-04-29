<template>
  <hl-row gap="var(--md)">
    <hl-col span="col">
      <hl-group size="lg" indent block merge>
        <hl-date-picker placeholder="placeholder" />
        <hl-button type="primary">确定</hl-button>
      </hl-group>
    </hl-col>
    <hl-col span="col">
      <hl-group size="sm" indent block merge>
        <hl-button type="primary">-</hl-button>
        <hl-input class="w-xs" placeholder="placeholder" />
        <hl-button type="primary">+</hl-button>
      </hl-group>
    </hl-col>
  </hl-row>
</template>
