<template>
  <fx-action-button label="新建按钮" />
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const ids = ref('')

    return {
      ids,
    }
  },
})
</script>
