<template>
  <button
    type="button"
    :class="`${namespace} pagination-next`"
    :disabled="internalDisabled"
    :aria-disabled="internalDisabled"
    @click="$emit('click', $event)"
  >
    <span v-if="nextText">{{ nextText }}</span>
    <slot v-else name="next-icon">
      <hl-icon>
        <system-arrow-right />
      </hl-icon>
    </slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemArrowRight } from '@hongluan-ui/components/system-icon'
import { paginationNextProps } from './next'

export default defineComponent({
  name: 'PaginationNext',

  components: {
    HlIcon,
    SystemArrowRight,
  },
  props: paginationNextProps,
  emits: ['click'],

  setup(props) {
    const { namespace } = useNamespace('button')
    const internalDisabled = computed(
      () =>
        props.disabled ||
        props.currentPage === props.pageCount ||
        props.pageCount === 0,
    )

    return {
      namespace,
      internalDisabled,
    }
  },
})
</script>
