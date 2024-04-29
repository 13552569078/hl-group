<template>
  <footer :class="[namespace]" :style="[height && '--layout-footer-height:' + height]">
    <slot></slot>
  </footer>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'

export default defineComponent({
  name: 'Footer',
  props: {
    height: {
      type: String,
    },
  },
  setup() {
    const { namespace } = useNamespace('footer')
    return {
      namespace,
    }
  },
})
</script>
