<template>
  <hl-row style="height: 100vh" align="items-middle items-center">
    <hl-col span="md:col-10">
      <hl-group dir="vertical" full="full-x" align="items-middle" gap="var(--lg)">
        <img src="../../assets/images/404.svg" alt />
        <h5>
          抱歉，这个页面不见了！
          <a href>请联系管理员</a>
        </h5>
        <hl-button type="primary" class="static" @click="$router.go(-1)">返回首页</hl-button>
      </hl-group>
    </hl-col>
  </hl-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
    }
  },
})
</script>
