<template>
  <hl-menu :default-active="activeIndex" mode="vertical" @select="handleSelect">
    <hl-menu-item index="1">处理中心</hl-menu-item>
    <hl-sub-menu index="2">
      <template #title>我的工作台</template>
      <hl-menu-item index="2-1">选项1</hl-menu-item>
      <hl-menu-item index="2-2">选项2</hl-menu-item>
      <hl-menu-item index="2-3">选项3</hl-menu-item>
      <hl-sub-menu index="2-4">
        <template #title>选项4</template>
        <hl-menu-item index="2-4-1">选项1</hl-menu-item>
        <hl-menu-item index="2-4-2">选项2</hl-menu-item>
        <hl-menu-item index="2-4-3">选项3</hl-menu-item>
      </hl-sub-menu>
    </hl-sub-menu>
    <hl-menu-item index="3" disabled>消息中心</hl-menu-item>
    <hl-menu-item index="4"><a href="https://www.example.com" target="_blank">订单管理</a></hl-menu-item>
  </hl-menu>

  <br><br>

  <hl-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
    <hl-menu-item index="1">处理中心</hl-menu-item>
    <hl-sub-menu index="2">
      <template #title>我的工作台</template>
      <hl-menu-item index="2-1">选项1</hl-menu-item>
      <hl-menu-item index="2-2">选项2</hl-menu-item>
      <hl-menu-item index="2-3">选项3</hl-menu-item>
      <hl-sub-menu index="2-4">
        <template #title>选项4</template>
        <hl-menu-item index="2-4-1">选项1</hl-menu-item>
        <hl-menu-item index="2-4-2">选项2</hl-menu-item>
        <hl-menu-item index="2-4-3">选项3</hl-menu-item>
      </hl-sub-menu>
    </hl-sub-menu>
    <hl-menu-item index="3" disabled>用户中心</hl-menu-item>
    <hl-menu-item index="4"><a href="https://www.example.com" target="_blank">订单管理</a></hl-menu-item>
    <hl-menu-item index="31">部门中心</hl-menu-item>
    <hl-menu-item index="32">邮件中心</hl-menu-item>
    <hl-menu-item index="33">生产中心</hl-menu-item>
    <hl-menu-item index="34">销售中心</hl-menu-item>
    <hl-menu-item index="35">行政中心</hl-menu-item>
    <hl-menu-item index="36">财务中心</hl-menu-item>
    <hl-menu-item index="37" disabled>运营中心</hl-menu-item>
    <hl-menu-item index="38">广告中心</hl-menu-item>
  </hl-menu>
  <div class="line"></div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const activeIndex2 = ref('1')

const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}

</script>
