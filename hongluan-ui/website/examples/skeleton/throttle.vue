<template>
  <hl-group dir="vertical" align="items-top" gap="var(--md)">
    <div>
      <label style="margin-right: 16px">切换加载</label>
      <hl-switch v-model="loading" />
    </div>
    <hl-skeleton style="width: 240px" :loading="loading" animated :throttle="500">
      <template #template>
        <hl-skeleton-item variant="image" style="width: 240px; height: 240px" />
        <div style="padding: 14px">
          <hl-skeleton-item variant="h3" style="width: 50%" />
          <div
            style="
              display: flex;
              align-items: center;
              justify-items: space-between;
              margin-top: 16px;
              height: 16px;
            "
          >
            <hl-skeleton-item variant="text" style="margin-right: 16px" />
            <hl-skeleton-item variant="text" style="width: 30%" />
          </div>
        </div>
      </template>
      <template #default>
        <hl-panel>
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          >
          <p class="m-t-md">Delicious hamburger</p>
          <template #footer>
            <span class="time m-r-md">{{ currentDate }}</span>
            <hl-button type="primary">操作按钮</hl-button>
          </template>
        </hl-panel>
      </template>
    </hl-skeleton>
  </hl-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const currentDate = '2020-09-23'

</script>
