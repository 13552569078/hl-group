<template>
  <hl-row gap="var(--md)">
    <hl-col span="col">
      <hl-panel padding="var(--md)" header-class="new-header-class" body-class="new-body-class" footer-class="new-footer-class">
        <template #header>
          <div class="panel-title">
            标题
          </div>
          <div class="panel-header-right">
            <hl-button equal no-fill>
              <hl-icon><two-upload /></hl-icon>
            </hl-button>
            <hl-button equal no-fill>
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
    </hl-col>
  </hl-row>
</template>
<script setup lang="ts">
import { TwoUpload, TwoMaximize } from '@hongluan-ui/icons'
</script>
