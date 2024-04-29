<template>
  <hl-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <hl-tab-pane label="User" name="first">User</hl-tab-pane>
    <hl-tab-pane label="Config" name="second">Config</hl-tab-pane>
    <hl-tab-pane label="Role" name="third">Role</hl-tab-pane>
    <hl-tab-pane label="Task" name="fourth">Task</hl-tab-pane>
  </hl-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const activeName = ref('first')

const handleClick = (tab: string, event: Event) => {
  console.log(tab, event)
}
</script>
<style>
.demo-tabs > .hl-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
