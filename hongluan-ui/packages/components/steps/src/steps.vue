<template>
  <div
    :class="[
      namespace,
      dir,
    ]"
    :style="[
      size ? `--steps-icon-wrap-size: ${size}` : '',
      gap ? `--steps-gap: ${gap}` : '',
      itemPadding ? `--steps-item-padding: ${itemPadding}` : '',
    ]"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref, provide } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'
import { CHANGE_EVENT } from '@hongluan-ui/constants'
import { stepsEmits, stepsProps } from './steps'

export default defineComponent({
  name: 'Steps',
  props: stepsProps,
  emits: stepsEmits,
  setup(props, { emit }) {
    const { namespace } = useNamespace('steps')
    const steps = ref([])

    watch(steps, () => {
      steps.value.forEach((instance, index) => {
        instance.setIndex(index)
      })
    })

    provide('Steps', { props, steps })

    watch(() => props.active, (newVal, oldVal) => {
      emit(CHANGE_EVENT, newVal, oldVal)
    })

    return {
      namespace,
      steps,
    }
  },
})
</script>
