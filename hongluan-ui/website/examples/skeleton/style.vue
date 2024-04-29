<template>
  <hl-skeleton style="width: 240px">
    <template #template>
      <hl-skeleton-item variant="image" style="width: 240px; height: 240px" />
      <div style="padding: 14px">
        <hl-skeleton-item variant="p" style="width: 50%" />
        <div
          style="
            display: flex;
            align-items: center;
            justify-items: space-between;
          "
        >
          <hl-skeleton-item variant="text" style="margin-right: 16px" />
          <hl-skeleton-item variant="text" style="width: 30%" />
        </div>
      </div>
    </template>
  </hl-skeleton>
</template>
