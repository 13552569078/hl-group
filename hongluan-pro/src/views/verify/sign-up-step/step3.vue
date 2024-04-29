<template>
  <hl-row align="items-center items-middle" class="p-xxl h-full">
    <hl-col span="xxl:col-16 xl:col-18 md:col-22">
      <hl-group gap="var(--lg)" full>
        <hl-button type="success" no-fill loading>正在注册，请等待</hl-button>
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
