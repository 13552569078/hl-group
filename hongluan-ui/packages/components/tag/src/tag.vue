<template>
  <span
    v-if="disableTransitions"
    :class="classes"
    :style="{ backgroundColor: color }"
    @click="handleClick"
  >
    <slot v-if="$slots.prefix" name="prefix"></slot>
    <span><slot></slot></span>
    <slot v-if="$slots.suffix" name="suffix"></slot>
    <hl-icon v-if="closable" class="tag-close" @click="handleClose">
      <system-close />
    </hl-icon>
  </span>
  <transition v-else name="zoom-in-center">
    <span
      :class="classes"
      :style="{ backgroundColor: color }"
      @click="handleClick"
    >
      <slot v-if="$slots.prefix" name="prefix"></slot>
      <span><slot></slot></span>
      <slot v-if="$slots.suffix" name="suffix"></slot>
      <hl-icon v-if="closable" class="tag-close" @click="handleClose">
        <system-close />
      </hl-icon>
    </span>
  </transition>
</template>

<script lang='ts'>
import { computed, defineComponent } from 'vue'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemClose } from '@hongluan-ui/components/system-icon'
import { useConsistentProp, useNamespace } from '@hongluan-ui/hooks'
import { tagProps } from './tag'

export default defineComponent({
  name: 'Tag',
  components: {
    HlIcon,
    SystemClose,
  },
  props: tagProps,
  emits: ['close','click'],
  setup(props, { emit }) {
    const { namespace } = useNamespace('tag')

    const { size: tagSize } = useConsistentProp()
    const classes = computed(() => {
      const { type, effect, outline, round, active } = props
      return [
        namespace.value,
        type ? type : '',
        tagSize.value ? `${tagSize.value}` : '',
        effect && effect,
        outline ? 'outline' : '',
        round ? 'round' : '',
        active ? 'is-focus' : '',
      ]
    })

    // methods
    const handleClose = (event: MouseEvent) => {
      event.stopPropagation()
      emit('close', event)
    }

    const handleClick = (event: MouseEvent) => {
      emit('click', event)
    }

    return {
      classes,
      handleClose,
      handleClick,
    }
  },
})
</script>
