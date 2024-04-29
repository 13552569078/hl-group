import { defineComponent, computed, h } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'

import type { PropType } from 'vue'

type SizeObject = {
  span: number
  offset: number
}
const Col = defineComponent({
  name: 'Col',
  props: {
    /**
     * @description custom element tag
     */
    tag: {
      type: String,
      default: 'div',
    },
    /**
     * @description number of column the grid spans
     */
    span: {
      type: [String, Number],
      default: '',
    },
    /**
     * @description number of spacing on the left side of the grid
     */
    offset: {
      type: [String, Number],
      default: '',
    },
    sm: {
      type: [Number, Object] as PropType<number | SizeObject>,
      default: () => ({} as SizeObject),
    },
    md: {
      type: [Number, Object] as PropType<number | SizeObject>,
      default: () => ({} as SizeObject),
    },
    lg: {
      type: [Number, Object] as PropType<number | SizeObject>,
      default: () => ({} as SizeObject),
    },
    xl: {
      type: [Number, Object] as PropType<number | SizeObject>,
      default: () => ({} as SizeObject),
    },
  },
  setup(props: Record<string, any>, { slots }) {
    const { namespace } = useNamespace('col')

    const style = computed(() => {
      const result = {}
      return result
    })
    const classList = computed(() => {
      const ret: string[] = []
      const pos = ['span', 'offset'] as const
      pos.forEach(prop => {
        const size = props[prop]
        if (typeof size === 'number') {
          if(prop === 'span') ret.push(`col-${props[prop]}`)
          else if(size > 0) ret.push(`${prop}-${props[prop]}`)
        } else {
          ret.push(String(props[prop]))
        }
      })
      const sizes = ['sm', 'md', 'lg', 'xl', 'xxl'] as const
      sizes.forEach(size => {
        if (typeof props[size] === 'number') {
          ret.push(`${size}:col-${props[size]}`)
        } else if (typeof props[size] === 'object') {
          const sizeProps = props[size]
          Object.keys(sizeProps).forEach(prop => {
            ret.push(
              prop !== 'span' ? `${size}:${prop}-${sizeProps[prop]}` : `${size}:col-${sizeProps[prop]}`,
            )
          })
        }
      })
      return ret
    })

    return () => h(
      props.tag,
      {
        class: [classList.value, namespace.value],
        style: style.value,
      },
      slots.default?.(),
    )
  },
})

export default Col
export type ColInstance = InstanceType<typeof Col>
