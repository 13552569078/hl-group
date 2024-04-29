<template>
  <hl-dropdown split="button" trigger="click">
    带icon的下拉菜单
    <template #dropdown>
      <hl-dropdown-menu>
        <hl-dropdown-item>
          标记状态
          <template #icon>
            <hl-icon><two-star /></hl-icon>
          </template>
        </hl-dropdown-item>
        <hl-dropdown-item>
          生成报表
          <template #icon>
            <hl-icon><two-page /></hl-icon>
          </template>
        </hl-dropdown-item>
        <hl-dropdown-item>
          统计分析数据
          <template #icon>
            <hl-icon><two-chart-pie /></hl-icon>
          </template>
        </hl-dropdown-item>
        <hl-dropdown-item divider />
        <hl-dropdown-item>
          移动到…
          <template #icon>
            <hl-icon><two-folder-in /></hl-icon>
          </template>
        </hl-dropdown-item>
        <hl-dropdown-item>
          删除
          <template #icon>
            <hl-icon><two-delete /></hl-icon>
          </template>
        </hl-dropdown-item>
      </hl-dropdown-menu>
    </template>
  </hl-dropdown>
</template>
<script lang="ts" setup>
import { TwoStar, TwoPage, TwoChartPie, TwoFolderIn, TwoDelete } from '@hongluan-ui/icons'
</script>
