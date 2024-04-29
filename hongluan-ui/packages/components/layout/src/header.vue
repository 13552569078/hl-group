<template>
  <header :class="[namespace]" :style="[height && '--layout-header-height:' + height]">
    <slot></slot>
  </header>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'

export default defineComponent({
  name: 'Header',
  props: {
    height: {
      type: String,
    },
  },
  setup() {
    const { namespace } = useNamespace('header')
    return {
      namespace,
    }
  },
})
</script>
