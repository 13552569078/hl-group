<template>
  <hl-panel style="height: calc(var(--xxl) * 8)" full-body>
    <template #header>
      <div class="panel-title">
        这是一个标题
      </div>
      <div class="panel-header-right">
        <hl-icon>
          <two-close />
        </hl-icon>
      </div>
    </template>
    <div class="scrollable h-full">
      <div class="p-lg" style="height: calc(var(--xxl)*10)">这是一段body信息</div>
    </div>
    <template #footer>
      <hl-button class="m-r-md" @click="dialogVisible = false">取 消</hl-button>
      <hl-button type="primary" @click="dialogVisible = false">确 定</hl-button>
    </template>
  </hl-panel>
</template>

<script setup lang="ts">
import { TwoClose } from '@hongluan-ui/icons'
</script>
