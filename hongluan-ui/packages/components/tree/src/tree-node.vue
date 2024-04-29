<template>
  <div
    v-show="node.visible"
    ref="node$"
    class="tree-node"
    :class="{
      'is-expanded': expanded,
      'is-current': node.isCurrent,
      'is-hidden': !node.visible,
      'is-focusable': !node.disabled,
      'is-checked': !node.disabled && node.checked,
      ...getNodeClass(node),
    }"
    role="treeitem"
    tabindex="-1"
    :aria-expanded="expanded"
    :aria-disabled="node.disabled"
    :aria-checked="node.checked"
    :draggable="tree.props.draggable"
    :data-key="getNodeKey(node)"
    @click.stop="handleClick"
    @contextmenu="handleContextMenu"
    @dragstart.stop="handleDragStart"
    @dragover.stop="handleDragOver"
    @dragend.stop="handleDragEnd"
    @drop.stop="handleDrop"
  >
    <div
      class="tree-node-content"
      :style="{ paddingLeft: (node.level - 1) * tree.props.indent + 'em' }"
    >
      <span
        :class="[
          {
            'custom-icon': !!$slots.icon,
            'is-leaf': node.isLeaf,
            expanded: !node.isLeaf && expanded
          },
          'tree-node-arrow',
          tree.props.iconClass ? tree.props.iconClass : '',
        ]"
        @click.stop="handleExpandIconClick"
      >
        <slot name="icon" :expanded="expanded" :isLeaf="node.isLeaf">
          <hl-icon>
            <system-caret />
          </hl-icon>
        </slot>
      </span>
      <!--修复tree嵌入form-item组件，导致label渲染成span，点击checkbox不能选中问题-->
      <hl-checkbox
        v-if="showCheckbox"
        :model-value="node.checked"
        :indeterminate="node.indeterminate"
        :disabled="!!node.disabled"
        :show-label="false"
        @click.stop
        @change="handleCheckChange"
      >
        {{ '' }}
      </hl-checkbox>
      <hl-spinner v-if="node.loading" class="tree-node-loading-icon" />
      <node-content :node="node" :render-content="renderContent" />
    </div>
    <collapse-transition>
      <div
        v-if="!renderAfterExpand || childNodeRendered"
        v-show="expanded"
        class="tree-node-children"
        role="group"
        :aria-expanded="expanded"
      >
        <tree-node
          v-for="child in node.childNodes"
          :key="getNodeKey(child)"
          :render-content="renderContent"
          :render-after-expand="renderAfterExpand"
          :show-checkbox="showCheckbox"
          :node="child"
          :accordion="accordion"
          :props="props"
          @node-expand="handleChildNodeExpand"
        >
          <template v-if="$slots.icon" #icon="params">
            <slot name="icon" v-bind="params"></slot>
          </template>
        </tree-node>
      </div>
    </collapse-transition>
  </div>
</template>
<script lang='ts'>
import { defineComponent, getCurrentInstance, ref, watch, nextTick, inject, provide } from 'vue'
import { isString, isFunction } from '@vue/shared'
import HlCheckbox from '@hongluan-ui/components/checkbox'
import HlSpinner from '@hongluan-ui/components/spinner'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemCaret } from '@hongluan-ui/components/system-icon'
import CollapseTransition from '@hongluan-ui/components/collapse-transition'
import { debugWarn } from '@hongluan-ui/utils'
import NodeContent from './tree-node-content.vue'
import { getNodeKey as getNodeKeyUtil, handleCurrentChange } from './model/util'
import { useNodeExpandEventBroadcast } from './model/useNodeExpandEventBroadcast'
import { dragEventsKey } from './model/useDragNode'
import Node from './model/node'

import type { PropType, ComponentInternalInstance } from 'vue'
import type { TreeOptionProps, TreeNodeData, RootTreeType } from './tree.type'
import type { Nullable } from '@hongluan-ui/utils'

export default defineComponent({
  name: 'TreeNode',
  components: {
    CollapseTransition,
    HlSpinner,
    HlCheckbox,
    NodeContent,
    HlIcon,
    SystemCaret,
  },
  props: {
    node: {
      type: Node,
      default: () => ({}),
    },
    props: {
      type: Object as PropType<TreeOptionProps>,
      default: () => ({}),
    },
    accordion: Boolean,
    renderContent: Function,
    renderAfterExpand: Boolean,
    showCheckbox: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['node-expand'],
  setup(props, ctx) {
    const { broadcastExpanded } = useNodeExpandEventBroadcast(props)
    const tree = inject<RootTreeType>('RootTree')
    const expanded = ref(false)
    const childNodeRendered = ref(false)
    const oldChecked = ref<boolean>(null)
    const oldIndeterminate = ref<boolean>(null)
    const node$ = ref<Nullable<HTMLElement>>(null)
    const dragEvents = inject(dragEventsKey)
    const instance = getCurrentInstance()

    provide('NodeInstance', instance)
    if(!tree) {
      debugWarn('Tree', 'Can not find node\'s tree.')
    }

    if(props.node.expanded) {
      expanded.value = true
      childNodeRendered.value = true
    }

    const childrenKey = tree.props['children'] || 'children'
    watch(() => {
      const children = props.node.data[childrenKey]
      return children && [...children]
    }, () => {
      props.node.updateChildren()
    })

    watch(() => props.node.indeterminate, val => {
      handleSelectChange(props.node.checked, val)
    })

    watch(() => props.node.checked, val => {
      handleSelectChange(val, props.node.indeterminate)
    })

    watch(() => props.node.expanded, val => {
      nextTick(() => expanded.value = val)
      if(val) {
        childNodeRendered.value = true
      }
    })

    const getNodeKey = (node: Node): any => {
      return getNodeKeyUtil(tree.props.nodeKey, node.data)
    }

    const getNodeClass = (node: Node) => {
      const nodeClassFunc = (props.props as TreeOptionProps).class
      if (!nodeClassFunc) {
        return {}
      }
      let className
      if (isFunction(nodeClassFunc)) {
        const { data } = node
        className = nodeClassFunc(data, node)
      } else {
        className = nodeClassFunc
      }

      if (isString(className)) {
        return { [className]: true }
      } else {
        return className
      }
    }

    const handleSelectChange = (checked: boolean, indeterminate: boolean) => {
      if (oldChecked.value !== checked || oldIndeterminate.value !== indeterminate) {
        tree.ctx.emit('check-change', props.node.data, checked, indeterminate)
      }
      oldChecked.value = checked
      oldIndeterminate.value = indeterminate
    }

    const handleClick = (e: MouseEvent) => {
      handleCurrentChange(tree.store, tree.ctx.emit, () =>
        tree.store.value.setCurrentNode(props.node),
      )
      tree.currentNode.value = props.node

      if(tree.props.expandOnClickNode) {
        handleExpandIconClick()
      }

      if(tree.props.checkOnClickNode && !props.node.disabled) {
        handleCheckChange(null, {
          target: { checked: !props.node.checked },
        })
      }
      tree.ctx.emit('node-click', props.node.data, props.node, instance, e)
    }

    const handleContextMenu = (event: Event) => {
      if (tree.instance.vnode.props['onNodeContextmenu']) {
        event.stopPropagation()
        event.preventDefault()
      }
      tree.ctx.emit('node-contextmenu', event, props.node.data, props.node, instance)
    }

    const handleExpandIconClick = () => {
      if (props.node.isLeaf) return
      if (expanded.value) {
        tree.ctx.emit('node-collapse', props.node.data, props.node, instance)
        props.node.collapse()
      } else {
        props.node.expand()
        ctx.emit('node-expand', props.node.data, props.node, instance)
      }
    }

    const handleCheckChange = (value, ev) => {
      props.node.setChecked(ev.target.checked, !tree.props.checkStrictly)
      nextTick(() => {
        const store = tree.store.value
        tree.ctx.emit('check', props.node.data, {
          checkedNodes: store.getCheckedNodes(),
          checkedKeys: store.getCheckedKeys(),
          halfCheckedNodes: store.getHalfCheckedNodes(),
          halfCheckedKeys: store.getHalfCheckedKeys(),
        })
      })
    }

    const handleChildNodeExpand = (nodeData: TreeNodeData, node: Node, instance: ComponentInternalInstance) => {
      broadcastExpanded(node)
      tree.ctx.emit('node-expand', nodeData, node, instance)
    }

    const handleDragStart = (event: DragEvent) => {
      if (!tree.props.draggable) return
      dragEvents.treeNodeDragStart({ event, treeNode: props })
    }

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault()
      if (!tree.props.draggable) return
      dragEvents.treeNodeDragOver({
        event,
        treeNode: { $el: node$.value, node: props.node },
      })
    }

    const handleDrop = (event: DragEvent) => {
      event.preventDefault()
    }

    const handleDragEnd = (event: DragEvent) => {
      if (!tree.props.draggable) return
      dragEvents.treeNodeDragEnd(event)
    }

    return {
      node$,
      tree,
      expanded,
      childNodeRendered,
      oldChecked,
      oldIndeterminate,
      getNodeKey,
      getNodeClass,
      handleSelectChange,
      handleClick,
      handleContextMenu,
      handleExpandIconClick,
      handleCheckChange,
      handleChildNodeExpand,
      handleDragStart,
      handleDragOver,
      handleDrop,
      handleDragEnd,
    }

  },
})
</script>
