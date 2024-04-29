<template>
  <hl-breadcrumb>
    <template #icon>
      <hl-icon>
        <two-chevron-right />
      </hl-icon>
    </template>
    <hl-breadcrumb-item :to="{ path: '/' }">首页</hl-breadcrumb-item>
    <hl-breadcrumb-item>活动管理</hl-breadcrumb-item>
    <hl-breadcrumb-item>
      活动列表
      <template #icon>
        <hl-icon size="sm" type="danger">
          <two-airplay />
        </hl-icon>
      </template>
    </hl-breadcrumb-item>
    <hl-breadcrumb-item>活动详情</hl-breadcrumb-item>
  </hl-breadcrumb>
</template>
<script lang="ts" setup>
import { TwoAirplay, TwoChevronRight } from '@hongluan-ui/icons'
</script>
