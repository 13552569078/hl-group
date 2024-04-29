<template>
  <hl-steps :active="active" finish-status="success" gap="var(--sm)" round size="var(--xxl)">
    <hl-step title="活动按期开始" />
    <hl-step title="通过审核" />
    <hl-step title="项目创建成功" />
    <hl-step title="初始化项目" />
  </hl-steps>

  <hl-button class="m-t-md" @click="next">下一步</hl-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)

const next = () => {
  if (active.value++ > 3) active.value = 0
}

</script>
