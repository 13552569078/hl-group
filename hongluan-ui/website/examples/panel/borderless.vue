<template>
  <hl-panel ref="panel" borderless>
    <template #header>
      <div class="panel-title">
        这是一个标题
      </div>
      <div class="panel-header-right">
        <hl-button equal no-fill>
          <hl-icon><two-upload /></hl-icon>
        </hl-button>
        <hl-button equal no-fill @click="panel.toggleFullscreen()">
          <hl-icon><two-maximize /></hl-icon>
        </hl-button>
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
import { ref } from 'vue'
import { TwoUpload, TwoMaximize } from '@hongluan-ui/icons'

const panel = ref(null)

</script>
