<template>
  <hl-panel>
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
    <div>这是一段body信息</div>
    <template #footer>
      <hl-button class="m-r-md" @click="dialogVisible = false">取 消</hl-button>
      <hl-button type="primary" @click="dialogVisible = false">确 定</hl-button>
    </template>
  </hl-panel>
</template>
<script setup lang="ts">
import { TwoClose } from '@hongluan-ui/icons'
</script>
