<template>
  <div
    :class="{
      [namespace]: true,
      'highlight-current': highlightCurrent,
    }"
    role="tree"
  >
    <fixed-size-list
      v-if="isNotEmpty"
      class-name="tree-virtual-list"
      :data="flattenTree"
      :total="flattenTree.length"
      :height="height"
      :item-size="itemSize"
      :perf-mode="perfMode"
    >
      <template #default="{ data, index, style }">
        <tree-node
          :key="data[index].key"
          :style="style"
          :node="data[index]"
          :expanded="isExpanded(data[index])"
          :show-checkbox="showCheckbox"
          :checked="isChecked(data[index])"
          :indeterminate="isIndeterminate(data[index])"
          :disabled="isDisabled(data[index])"
          :current="isCurrent(data[index])"
          :hidden-expand-icon="isForceHiddenExpandIcon(data[index])"
          @click="handleNodeClick"
          @toggle="toggleExpand"
          @check="handleNodeCheck"
        >
          <template v-if="$slots.icon" #icon="params">
            <slot name="icon" v-bind="params"></slot>
          </template>
        </tree-node>
      </template>
    </fixed-size-list>
    <div v-else class="tree-empty-block">
      <span class="tree-empty-text">{{
        emptyText ?? t('hl.tree.emptyText')
      }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, provide, useSlots } from 'vue'
import { useLocale, useNamespace } from '@hongluan-ui/hooks'
import { formItemContextKey } from '@hongluan-ui/tokens'
import { FixedSizeList } from '@hongluan-ui/components/virtual-list'
import { useTree } from './composables/useTree'
import TreeNode from './tree-node.vue'
import { ROOT_TREE_INJECTION_KEY, treeEmits, treeProps } from './virtual-tree'

defineOptions({
  name: 'TreeV2',
})

const props = defineProps(treeProps)
const emit = defineEmits(treeEmits)

const slots = useSlots()
const { namespace } = useNamespace('tree')

provide(ROOT_TREE_INJECTION_KEY, {
  ctx: {
    emit,
    slots,
  },
  props,
  instance: getCurrentInstance()!,
})
provide(formItemContextKey, undefined)
const { t } = useLocale()
const {
  flattenTree,
  isNotEmpty,
  toggleExpand,
  isExpanded,
  isIndeterminate,
  isChecked,
  isDisabled,
  isCurrent,
  isForceHiddenExpandIcon,
  toggleCheckbox,
  handleNodeClick,
  handleNodeCheck,
  // expose
  getCurrentNode,
  getCurrentKey,
  setCurrentKey,
  getCheckedKeys,
  getCheckedNodes,
  getHalfCheckedKeys,
  getHalfCheckedNodes,
  setChecked,
  setCheckedKeys,
  filter,
  setData,
  getNode,
  expandNode,
  collapseNode,
  setExpandedKeys,
} = useTree(props, emit)

defineExpose({
  getCurrentNode,
  getCurrentKey,
  setCurrentKey,
  getCheckedKeys,
  getCheckedNodes,
  getHalfCheckedKeys,
  getHalfCheckedNodes,
  setChecked,
  setCheckedKeys,
  filter,
  setData,
  getNode,
  expandNode,
  collapseNode,
  setExpandedKeys,
})
</script>
