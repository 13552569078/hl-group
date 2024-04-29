import { defineComponent, h } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'
import { groupProps } from './group-props'

import type { Slots, VNode } from 'vue'

const Group = defineComponent({
  name: 'Group',
  props: groupProps,
  setup(props, { slots }) {
    const { namespace } = useNamespace('group')
    const handleGroupItem = (internalSlots: Slots) => {
      const children = internalSlots.default?.() || []
      addClazz(children)
      return children
    }
    const addClazz = (children: VNode[]) => {
      children.forEach(c => {
        // (ARRAY_CHILDREN && not html element array) / TELEPORT / SUSPENSE
        if (((c.shapeFlag & 16) && !(c.shapeFlag & 1))
          || c.shapeFlag & 64
          || c.shapeFlag & 128
        ) {
          addClazz((c.children || []) as VNode[])
        }
        const clazz = c.props?.class || ''
        // if (clazz.indexOf(namespace.value) === -1 &&
        //   clazz.indexOf('group-item') === -1 &&
        //   (c.type as any).name !== 'Group'
        // ) {
        if (clazz.indexOf('group-item') === -1) {
          if (!c.props) {
            c.props = {}
          }
          c.props.class = clazz + ' group-item'
        }
      })
    }
    return () => h(
      'div',
      {
        class: [
          namespace.value,
          props.dir,
          props.align,
          typeof props.full === 'boolean' && props.full ? 'full' : props.full,
          props.indent ? 'indent' : '',
          props.merge ? 'merge' : '',
          props.deepMerge ? 'deep-merge' : '',
          props.wrap ? 'wrap' : '',
          props.block ? 'block' : '',
        ],
        style: [
          typeof props.indent === 'string' ? `--indent:${props.indent}` : '',
          props.gap ? `--group-gap-x: ${props.gap}; --group-gap-y: ${props.gap}` : '',
          props.gapX ? `--group-gap-x: ${props.gapX}` : '',
          props.gapY ? `--group-gap-y: ${props.gapY}` : '',
        ],
      },
      handleGroupItem(slots),
    )
  },
})

export default Group
