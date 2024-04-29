<template>
  <div
    class="select-dropdown"
    :class="[{ 'is-multiple': isMultiple }, popperClass]"
    :style="{ minWidth: minWidth }"
    @mousedown.stop
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  onMounted,
  inject,
  ref,
} from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { selectKey } from './token'

export default defineComponent({
  name: 'SelectDropdown',

  componentName: 'SelectDropdown',

  setup() {
    const select = inject(selectKey)

    // computed
    const popperClass = computed(() => select.props.popperClass)
    const isMultiple = computed(() => select.props.multiple)
    const minWidth = ref('')

    function updateMinWidth() {
      minWidth.value = select.selectWrapper?.getBoundingClientRect().width + 'px'
    }

    onMounted(() => {
      // TODO: updatePopper
      // popper.value.update()

      useResizeObserver(select.selectWrapper, updateMinWidth)

    })

    return {
      minWidth,
      popperClass,
      isMultiple,
    }
  },
})
</script>
