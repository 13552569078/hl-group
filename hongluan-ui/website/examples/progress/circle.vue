<template>
  <hl-group indent="var(--lg)">
    <hl-progress show-as="circle" :percentage="80" />
    <hl-progress show-as="circle" stroke-width="4px" :percentage="70" color="#f00" track-color="rgba(0,0,0, 0.01)">
      <template #default="{percentage}">
        <hl-group dir="vertical" gap="var(--sm)" align="items-middle items-center">
          <hl-icon type="danger" size="sm" radius fill class="static"><fill-airplay /></hl-icon>
          <h5>{{ percentage }}%</h5>
        </hl-group>
      </template>
    </hl-progress>
    <hl-progress show-as="circle" type="info" stroke-width="4px" :percentage="50" text="Label" />
  </hl-group>
</template>
