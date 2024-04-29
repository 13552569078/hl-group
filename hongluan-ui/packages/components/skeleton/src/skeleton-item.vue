<template>
  <div :class="[namespace, `${variant}`]">
    <img-placeholder v-if="variant === 'image'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'
import ImgPlaceholder from './image-placeholder.vue'
import { skeletonItemProps } from './skeleton-item'

export default defineComponent({
  name: 'SkeletonItem',
  components: {
    ImgPlaceholder,
  },
  props: skeletonItemProps,
  setup() {
    const { namespace } = useNamespace('skeleton-item')
    return {
      namespace,
    }
  },
})
</script>
