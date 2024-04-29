<template>
  定制密码显示隐藏的Icon：
  <hl-input v-model="input" placeholder="请输入密码" show-password />
</template>

<script lang="ts" setup>
import { h, ref } from 'vue'
import { provideGlobalConfig } from 'hongluan-ui'

provideGlobalConfig({
  systemIcons: {
    SystemShow: h('span', { innerHTML: '显' }),
    SystemHidden: h('span', { innerHTML: '隐' }),
  },
})

const input = ref('')

</script>
