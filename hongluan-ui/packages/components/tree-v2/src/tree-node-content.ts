import { h, defineComponent, inject } from 'vue'
import { ROOT_TREE_INJECTION_KEY, treeNodeContentProps } from './virtual-tree'

export default defineComponent({
  name: 'TreeNodeContent',
  props: treeNodeContentProps,
  setup(props) {
    const tree = inject(ROOT_TREE_INJECTION_KEY)
    return () => {
      const node = props.node
      const { data } = node
      return tree?.ctx.slots.default
        ? tree.ctx.slots.default({ node, data })
        : h('span', { class: 'tree-node-label' }, [node?.label])
    }
  },
})
