<template>
  <button
    type="button"
    :class="`${namespace} pagination-prev`"
    :disabled="internalDisabled"
    :aria-disabled="internalDisabled"
    @click="$emit('click', $event)"
  >
    <span v-if="prevText">{{ prevText }}</span>
    <slot v-else name="prev-icon">
      <hl-icon>
        <system-arrow-left />
      </hl-icon>
    </slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemArrowLeft } from '@hongluan-ui/components/system-icon'
import { paginationPrevEmits, paginationPrevProps } from './prev'


export default defineComponent({
  name: 'PaginationPrev',

  components: {
    HlIcon,
    SystemArrowLeft,
  },
  props: paginationPrevProps,
  emits: paginationPrevEmits,

  setup(props) {
    const { namespace } = useNamespace('button')
    const internalDisabled = computed(
      () => props.disabled || props.currentPage <= 1,
    )
    return {
      namespace,
      internalDisabled,
    }
  },
})
</script>
