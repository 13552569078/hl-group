<template>
  <hl-row align="items-middle">
    <hl-col span="col">
      <hl-group class="dom-area" gap="var(--sm)" data-name="Group">
        <hl-input placeholder="请输入内容" />
        <hl-button type="primary">搜 索</hl-button>
      </hl-group>
    </hl-col>

    <hl-col span="col">
      <hl-group gap="var(--md)" full align="items-middle" class="dom-area" data-name="Group">
        <hl-icon type="primary" size="xl" class="static" fill radius>
          <two-user-group />
        </hl-icon>
        <hl-group dir="vertical" class="dom-area" data-name="Group">
          <h5>测试</h5>
          <div>资深前端工程师</div>
        </hl-group>
      </hl-group>
    </hl-col>
  </hl-row>
</template>
<script lang="ts" setup>
import { TwoUserGroup } from '@hongluan-ui/icons'
</script>
