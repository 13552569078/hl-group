<template>
  <hl-tabs>
    <hl-tab-pane>
      <template #label>
        <hl-icon class="sm m-r-xs"><two-application /></hl-icon>
        我的行程
      </template>
      我的行程
    </hl-tab-pane>
    <hl-tab-pane label="消息中心">消息中心</hl-tab-pane>
    <hl-tab-pane label="欧朋浏览器">欧朋浏览器</hl-tab-pane>
  </hl-tabs>
</template>
<script lang="ts" setup>

import { TwoApplication } from '@hongluan-ui/icons'
</script>
