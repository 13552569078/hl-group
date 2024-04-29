<template>
  <div
    :class="[
      {'is-active': data.indicatorIndex === data.active},
      namespace
    ]"
    @click="handleItemClick"
    @mouseenter="handlethrottledIndicatorHover"
  >
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent,reactive,inject,watch } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'
import { carouselIndicatorProps } from './carousel-indicator'
import { carouselIndicatorContextKey } from '@hongluan-ui/tokens'

export default defineComponent({
  name: 'CarouselIndicator',
  props: carouselIndicatorProps,
  emits: ['click', 'hover'],
  setup(props, { emit }) {
    const { namespace } = useNamespace('carousel-indicator')

    // data
    const data = reactive<{
      active: number
      indicatorIndex: number
    }>({
      active: -1,
      indicatorIndex: props.index,
    })

    // inject
    const injectIndicatorScope = inject(carouselIndicatorContextKey)

    // watch
    watch(() => injectIndicatorScope.activeIndex.value,
      current => {
        data.active = current
      }, { immediate: true },
    )

    // methods
    function handleItemClick() {
      if (injectIndicatorScope.handleIndicatorClick) {
        injectIndicatorScope.handleIndicatorClick(props.index)
      }
      emit('click', props.index)
    }
    function handlethrottledIndicatorHover() {
      if (injectIndicatorScope.throttledIndicatorHover) {
        injectIndicatorScope.throttledIndicatorHover(props.index)
      }
      emit('hover', props.index)
    }

    return {
      namespace,
      data,
      handleItemClick,
      handlethrottledIndicatorHover,
    }
  },
})
</script>
