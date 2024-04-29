<template>
  <em
    v-show="!hidden && (content || content === '0' || dot)"
    :class="[
      namespace,
      {
        'dot': dot,
        'round': round
      },
      type ? type : '',
      position,
    ]"
    :style="style"
    v-text="content"
  >
  </em>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'
import { isNumber } from '@hongluan-ui/utils'
import { badgeProps } from './badge'

export default defineComponent({
  name: 'Badge',
  props: badgeProps,
  setup(props) {
    const { namespace } = useNamespace('badge')

    const content = computed(() => {
      if (props.dot) {
        return ''
      }
      if (isNumber(props.value) && isNumber(props.max)) {
        return props.max < props.value ? `${props.max}+` : `${props.value}`
      }
      return `${props.value}`
    })
    const style = computed(() => {
      return props.offset ?
        `
          top: ${props.offset[0]};
          right: ${props.offset[1]};
          bottom: ${props.offset[2]};
          left: ${props.offset[3]};
        ` : ''
    })

    return {
      namespace,
      content,
      style,
    }
  },
})
</script>
