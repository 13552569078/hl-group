<template>
  <li
    :class="[
      namespace,
      dir ? dir : '',
      type ? type : '',
      active ? 'is-active' : '',
    ]
    "
    :style="[
      color ? '--timeline-icon-color:' + color : '',
      gap ? '--timeline-item-gap:' + gap : ''
    ]"
  >
    <div v-if="parentProps.center || $slots.label" class="item-left">
      <slot v-if="$slots.label" name="label"></slot>
    </div>
    <div class="item-center">
      <div class="dot-wrap">
        <div
          v-if="!icon && !$slots.dot"
          class="icon-dot"
        ></div>
        <slot v-if="$slots.icon && !$slots.dot" name="icon"></slot>
        <slot v-if="$slots.dot" name="dot"></slot>
      </div>
    </div>
    <div class="item-right">
      <div class="item-title">
        <slot></slot>
      </div>
      <div v-if="!hideTimestamp" class="item-time">
        {{ timestamp }}
      </div>
    </div>
  </li>
</template>

<script lang='ts'>
import { inject, defineComponent } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'
import { timelineItemProps } from './timeline-item'

export default defineComponent({
  name: 'TimelineItem',
  props: timelineItemProps,
  setup(props) {
    const { namespace } = useNamespace('timeline-item')

    const { hasIcon, props: parentProps } = inject('timeline')

    props.icon && (hasIcon.value = true)

    return {
      namespace,
      parentProps,
    }
  },
})
</script>
