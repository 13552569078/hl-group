<template>
  <teleport v-if="container" :to="container" :disabled="disabled">
    <div ref="containerRef" :class="namespace" :style="containerStyle">
      <slot></slot>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'
import { teleportProps } from './teleport'
import type { StyleValue } from 'vue'

defineOptions({
  name: 'Teleport',
})
const props = defineProps(teleportProps)

const { namespace } = useNamespace('teleport')
const containerRef = ref<HTMLElement>()

const containerStyle = computed<StyleValue>(() => {
  return props.container === 'body'
    ? [
      props.style,
      {
        position: 'absolute',
        top: `0px`,
        left: `0px`,
        zIndex: props.zIndex,
      },
    ]
    : {}
})

defineExpose({
  /** @description container element */
  containerRef,
})
</script>
