import { h, provide, defineComponent, ref } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'

const Timeline = defineComponent({
  name: 'Timeline',
  props: {
    center: {
      type: Boolean,
      default: false,
    },
    alternate: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const { namespace } = useNamespace('timeline')
    const hasIcon = ref(false)
    provide('timeline', { hasIcon, props })

    /**
     *  Maybe ,this component will not support prop 'reverse', why ?
     *
     *  Example 1:
     *   <component-a>
     *     <div>1</div>
     *     <div>2</div>
     *   </component-a>
     *
     *  Example 2:
     *   <component-a>
     *     <div v-for="i in 2" :key="i">{{ i }}</div>
     *   </component-a>
     *
     *  'slots.default()' value in example 1 just like [Vnode, Vnode]
     *  'slots.default()' value in example 2 just like [Vnode]
     *
     *   so i can't reverse the slots, when i use 'v-for' directive.
     */

    return () => {
      return h(
        'ul',
        {
          class: [{
            'has-icon': hasIcon.value,
            'center' : props.center,
            'alternate' : props.alternate,
          }, namespace.value],
        },
        ctx.slots.default?.(),
      )
    }
  },
})

export default Timeline
export type TimelineInstance = InstanceType<typeof Timeline>
