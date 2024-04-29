<template>
  <hl-alert title="不可关闭的 alert" type="danger" :closable="false" />
  <hl-alert title="自定义 close-text" type="primary" close-text="知道了" class="m-t-lg">输入的额内容是</hl-alert>
  <hl-alert title="设置了回调的 alert" type="warning" class="m-t-lg" @close="hello" />
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    const hello = () => {
      alert('Hello World!')
    }
    return {
      hello,
    }
  },
})
</script>
