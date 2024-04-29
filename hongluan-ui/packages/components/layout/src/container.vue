<template>
  <div :class="[namespace]" :style="{ height}">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'

export default defineComponent({
  name: 'Container',
  props: {
    height: {
      type: String,
      default: 'auto',
    },
  },
  setup() {
    const { namespace } = useNamespace('container')
    return {
      namespace,
    }
  },
})
</script>
