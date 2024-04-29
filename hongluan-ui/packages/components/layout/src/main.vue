<template>
  <main :class="[namespace]">
    <slot></slot>
  </main>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'

export default defineComponent({
  name: 'Main',
  setup() {
    const { namespace } = useNamespace('main')
    return {
      namespace,
    }
  },
})
</script>
