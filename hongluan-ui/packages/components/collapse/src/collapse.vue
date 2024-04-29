<template>
  <div
    :class="[
      namespace, {
        'arrow-left': arrowLeft,
      }
    ]"
    role="tablist"
    aria-multiselectable="true"
    :style="[
      gap ? `--collapse-gap: ${gap}` : '',
      headerGap ? `--collapse-header-gap: ${headerGap}` : '',
      padding ? `--collapse-padding-x: ${padding}` : '',
      contentPadding ? `--collapse-content-padding: ${contentPadding}` : '',
    ]"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@hongluan-ui/hooks'
import { collapseProps, collapseEmits } from './collapse'
import { useCollapse } from './use-collapse'

defineOptions({
  name: 'Collapse',
})
const props = defineProps(collapseProps)
const emit = defineEmits(collapseEmits)

const { namespace } = useNamespace('collapse')
const { activeNames, setActiveNames } = useCollapse(props, emit)

defineExpose({
  /** @description active names */
  activeNames,
  /** @description set active names */
  setActiveNames,
})
</script>
