<script lang="ts">
import { defineComponent, computed, h } from 'vue'
import { generateId } from '@hongluan-ui/utils'
import { useNamespace } from '@hongluan-ui/hooks'
import { iconProps } from './icon'

import type { CSSProperties } from 'vue'

export default defineComponent({
  name: 'Icon',
  props: iconProps,
  setup(props) {
    const { namespace } = useNamespace('icon')
    const iconStyle = computed(() => {
      const style = {} as CSSProperties
      if (props.width) {
        style.width = !Number.isNaN(+props.width) ? props.width + 'px' : props.width
      }
      if (props.height) {
        style.height = !Number.isNaN(+props.height) ? props.height + 'px' : props.height
      }
      if (props.color) {
        style.color = props.color
      }
      return style
    })
    return {
      namespace,
      iconStyle,
      iconId: 'icon_' + generateId(),
    }
  },
  render() {
    const {
      $slots,
      namespace,
      iconStyle,
      iconId,
      type,
      size,
      effect,
      fill,
      round,
      color,
      radius,
      opacity,
      startColor,
      gradient,
      transition,
      border,
    } = this
    const handleSlotsChildren = internalSlots => {
      const children = internalSlots.default?.() || []
      children.forEach(c => {
        // STATEFUL_COMPONENT / FUNCTIONAL_COMPONENT
        if (c.shapeFlag & 4 || c.shapeFlag & 2) {
          c.props = Object.assign(c.props || {}, {
            borderWidth: border,
            opacity,
            startColor,
            gradient,
            iconId,
            color,
          })
        }
      })
      return children
    }
    return h('i',
      {
        class: [
          namespace,
          type ? type : '',
          size,
          effect,
          {
            'fill': fill,
            'round': round,
            'radius': radius,
            'transition': transition,
          },
        ],
        style: iconStyle,
      },
      handleSlotsChildren($slots),
    )
  },
})
</script>
