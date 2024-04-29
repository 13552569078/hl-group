<template>
  <hl-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
    <hl-radio :label="false">展开</hl-radio>
    <hl-radio :label="true">收起</hl-radio>
  </hl-radio-group>

  <hl-menu default-active="1-4-1" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
    <hl-menu-item-group>
      <template #title>DASHBOARD</template>
      <hl-menu-item>
        <hl-icon class="item-icon"><two-layer /></hl-icon>
        <template #title>仪表盘</template>
      </hl-menu-item>
      <hl-menu-item>
        <hl-icon class="item-icon"><Two-airplay /></hl-icon>
        <template #title>工作台</template>
      </hl-menu-item>
    </hl-menu-item-group>

    <hl-menu-item-group>
      <template #title>Pages</template>
      <hl-sub-menu index="forms" :popper-append-to-body="true" :fallback-placements="['right-start']">
        <template #title>
          <hl-icon class="item-icon"><two-edit /></hl-icon>
          <span>表单页</span>
        </template>
        <hl-menu-item>基础表单</hl-menu-item>
      </hl-sub-menu>

      <hl-sub-menu index="verify" :popper-append-to-body="true" :fallback-placements="['right-start']">
        <template #title>
          <hl-icon class="item-icon"><two-preview /></hl-icon>
          <span>注册登录</span>
        </template>
        <hl-menu-item index="/verify/sign-up">注册</hl-menu-item>
        <hl-menu-item index="/verify/sign-in">登录</hl-menu-item>
        <hl-menu-item index="/verify/sign-up-step">分步注册</hl-menu-item>
      </hl-sub-menu>
    </hl-menu-item-group>

    <hl-menu-item-group>
      <template #title>LAYOUT</template>
      <hl-sub-menu index="10" :popper-append-to-body="true" :fallback-placements="['right-start']">
        <template #title>
          <hl-icon class="item-icon"><two-application /></hl-icon>
          <span>框架</span>
        </template>
        <hl-menu-item index="table">欢迎</hl-menu-item>
        <hl-menu-item index="table">提示</hl-menu-item>
        <hl-menu-item index="table">表单</hl-menu-item>
      </hl-sub-menu>
    </hl-menu-item-group>
  </hl-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { TwoApplication, TwoAirplay, TwoEdit, TwoLayer, TwoPreview } from '@hongluan-ui/icons'

const isCollapse = ref(true)

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

