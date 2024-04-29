<template>
  <div :class="[namespace]" :style="[height && '--layout-sub-header-height:' + height]">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'

export default defineComponent({
  name: 'SubHeader',
  props: {
    height: {
      type: String,
    },
  },
  setup() {
    const { namespace } = useNamespace('sub-header')
    return {
      namespace,
    }
  },
})
</script>
