import { defineComponent, computed, h, provide } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'

import type { PropType, ExtractPropTypes } from 'vue'

export const rowProps = {
  tag: {
    type: String,
    default: 'div',
  },
  align: {
    type: String,
    default: '',
  },
  layout: {
    type: String as PropType<'flow' | 'grid'>,
  },
  gap: String,
  gapX: String,
  gapY: String,
  count: {
    type: [Number, String],
    default: 1,
  },
  dir: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: 'vertical',
  },
}
export type RowProps = ExtractPropTypes<typeof rowProps>

const Row = defineComponent({
  name: 'Row',
  props: rowProps,
  setup(props, { slots }) {
    const gap = computed(() => props.gap)
    const layout = computed(() => props.layout)
    provide('Row', { layout, gap })

    const { namespace } = useNamespace('row')

    return () =>
      h(
        props.tag,
        {
          class: [
            namespace.value,
            props.align,
            props.layout,
            props.layout ? (typeof props.count === 'number' ? `count-` + props.count : props.count) : '',
            props.layout === 'grid' && `grid-direction-${props.dir}`,
          ],
          style: [
            props.gap ? `--row-gap-x: ${props.gap}; --row-gap-y: ${props.gap}` : '',
            props.gapX ? `--row-gap-x: ${props.gapX}` : '',
            props.gapY ? `--row-gap-y: ${props.gapY}` : '',
          ],
        },
        slots.default?.(),
      )
  },
})

export default Row
export type RowInstance = InstanceType<typeof Row>
