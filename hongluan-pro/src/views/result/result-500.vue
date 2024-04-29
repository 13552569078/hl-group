<template>
  <hl-row style="height: 100vh" align="items-middle items-center">
    <hl-col span="md:col-10">
      <hl-group dir="vertical" full="full-x" align="items-middle" gap="var(--lg)">
        <h1>系统出现错误</h1>
        <div class="text-center">出问题了<br>请稍后再试一试</div>
        <hl-group gap="var(--md)">
          <hl-button type="primary" effect="light" class="static">通知管理员</hl-button>
          <hl-button type="primary" class="static" @click="$router.go(-1)">返回首页</hl-button>
        </hl-group>
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
