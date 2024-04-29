<template>
  <aside :class="[namespace]" :style="[width && '--layout-aside-width:' + width]">
    <slot></slot>
  </aside>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'

export default defineComponent({
  name: 'Aside',
  props: {
    width: {
      type: String,
    },
  },
  setup() {
    const { namespace } = useNamespace('aside')
    return {
      namespace,
    }
  },
})
</script>
