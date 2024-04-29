<template>
  <fx-action-button label="新建按钮">
    <template #icon>
      <TwoEdit />
    </template>
  </fx-action-button>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { TwoEdit } from '@hongluan-ui/icons'

export default defineComponent({
  components: { TwoEdit },
  setup() {
    const ids = ref('')

    return {
      ids,
    }
  },
})
</script>
