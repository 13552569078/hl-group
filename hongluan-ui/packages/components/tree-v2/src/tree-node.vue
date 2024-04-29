<template>
  <div
    ref="node$"
    class="tree-node"
    :class="{
      'is-expanded': expanded,
      'is-current': current,
      'is-focusable': !disabled,
      'is-checked': !disabled && checked,
    }"
    role="treeitem"
    tabindex="-1"
    :aria-expanded="expanded"
    :aria-disabled="disabled"
    :aria-checked="checked"
    :data-key="node?.key"
    @click.stop="handleClick"
    @contextmenu="handleContextMenu"
  >
    <div
      class="tree-node-content"
      :style="{ paddingLeft: `${(node.level - 1) * indent}px` }"
    >
      <span
        :class="[
          {
            'is-leaf': node.isLeaf,
            expanded: !node.isLeaf && expanded
          },
          'tree-node-arrow',
        ]"
        @click.stop="handleExpandIconClick"
      >
        <slot name="icon" :expanded="expanded" :isLeaf="node.isLeaf">
          <hl-icon>
            <system-caret />
          </hl-icon>
        </slot>
      </span>
      <hl-checkbox
        v-if="showCheckbox"
        :model-value="checked"
        :indeterminate="indeterminate"
        :disabled="disabled"
        @change="handleCheckChange"
        @click.stop
      />
      <node-content :node="node" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { SystemCaret } from '@hongluan-ui/components/system-icon'
import HlIcon from '@hongluan-ui/components/icon'
import HlCheckbox from '@hongluan-ui/components/checkbox'
import NodeContent from './tree-node-content'
import { ROOT_TREE_INJECTION_KEY, NODE_CONTEXTMENU, treeNodeProps, treeNodeEmits } from './virtual-tree'
import type { CheckboxValueType } from '@hongluan-ui/components/checkbox'

defineOptions({
  name: 'TreeNode',
})

const props = defineProps(treeNodeProps)
const emit = defineEmits(treeNodeEmits)

const tree = inject(ROOT_TREE_INJECTION_KEY)

const indent = computed(() => {
  return tree?.props.indent ?? 16
})

const handleClick = (e: MouseEvent) => {
  emit('click', props.node, e)
}
const handleExpandIconClick = () => {
  emit('toggle', props.node)
}
const handleCheckChange = (value: CheckboxValueType) => {
  emit('check', props.node, value)
}
const handleContextMenu = (event: Event) => {
  if (tree?.instance?.vnode?.props?.['onNodeContextmenu']) {
    event.stopPropagation()
    event.preventDefault()
  }
  tree?.ctx.emit(NODE_CONTEXTMENU, event, props.node?.data, props.node)
}
</script>
