<template>
  <hl-row align="items-center">
    <hl-col span="md:col-10" class="flex items-center p-xxl m-t-xxl">
      <hl-group dir="vertical" align="items-middle" gap="var(--xxl)">
        <img src="../../assets/images/logo.svg" alt="" class="m-b-xxl">
        <h1>密码已更改</h1>
        <div class="text-center text-secondary">您的密码已成功更改<br>请登录您的账户并开始一个新的项目</div>
        <hl-button type="primary" class="static" @click="$router.go(-1)">登录</hl-button>
      </hl-group>
    </hl-col>
  </hl-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>
