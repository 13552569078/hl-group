<template>
  <li
    :id="`${menuId}-${node.uid}`"
    role="menuitem"
    :aria-haspopup="!isLeaf"
    :aria-owns="isLeaf ? null : menuId"
    :aria-expanded="inExpandingPath"
    :tabindex="expandable ? -1 : undefined"
    :class="[
      'cascader-node',
      checkStrictly && 'is-selectable',
      inExpandingPath && 'in-active-path',
      inCheckedPath && 'in-checked-path',
      node.checked && 'is-active',
      !expandable && 'is-disabled'
    ]"
    @mouseenter="handleHoverExpand"
    @focus="handleHoverExpand"
    @click="handleClick"
  >
    <!-- prefix -->
    <hl-checkbox
      v-if="multiple"
      :model-value="node.checked"
      :indeterminate="node.indeterminate"
      :disabled="isDisabled"
      @click.stop
      @update:model-value="handleSelectCheck"
    />
    <hl-radio
      v-else-if="checkStrictly"
      :model-value="checkedNodeId"
      :label="node.uid"
      :disabled="isDisabled"
      @update:model-value="handleSelectCheck"
      @click.stop
    >
      <!--
        Add an empty element to avoid render label,
        do not use empty fragment here for https://github.com/vuejs/vue-next/pull/2485
      -->
      <span></span>
    </hl-radio>
    <hl-icon v-else-if="isLeaf && node.checked" :class="['cascader-item-prefix checked']">
      <system-checked />
    </hl-icon>

    <!-- content -->
    <node-content />

    <!-- postfix -->
    <template v-if="!isLeaf">
      <hl-spinner v-if="node.loading" class="cascader-item-suffix" />
      <hl-icon v-else class="cascader-item-suffix">
        <system-arrow-right />
      </hl-icon>
    </template>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import HlCheckbox from '@hongluan-ui/components/checkbox'
import HlRadio from '@hongluan-ui/components/radio'
import HlSpinner from '@hongluan-ui/components/spinner'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemArrowRight, SystemChecked } from '@hongluan-ui/components/system-icon'
import NodeContent from './node-content'
import { CASCADER_PANEL_INJECTION_KEY } from './types'

import type { CascaderNode } from './types'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'CascaderNode',

  components: {
    HlCheckbox,
    HlRadio,
    HlSpinner,
    HlIcon,
    SystemArrowRight,
    SystemChecked,
    NodeContent,
  },

  props: {
    node: {
      type: Object as PropType<CascaderNode>,
      required: true,
    },
    menuId: String,
  },

  emits: ['expand'],

  setup (props, { emit }) {
    const panel = inject(CASCADER_PANEL_INJECTION_KEY)

    const isHoverMenu = computed(() => panel.isHoverMenu)
    const multiple = computed(() => panel.config.multiple)
    const checkStrictly = computed(() => panel.config.checkStrictly)
    const checkedNodeId = computed(() => panel.checkedNodes[0]?.uid)
    const isDisabled = computed(() => props.node.isDisabled)
    const isLeaf = computed(() => props.node.isLeaf)
    const expandable = computed(() => checkStrictly.value && !isLeaf.value || !isDisabled.value)
    const inExpandingPath = computed(() => isInPath(panel.expandingNode))
    // only useful in check-strictly mode
    const inCheckedPath = computed(() => checkStrictly.value && panel.checkedNodes.some(isInPath))

    const isInPath = (node: CascaderNode) => {
      const { level, uid } = props.node
      return node?.pathNodes[level - 1]?.uid === uid
    }

    const doExpand = () => {
      if (inExpandingPath.value) return
      panel.expandNode(props.node)
    }

    const doCheck = (checked: boolean) => {
      const { node } = props
      if (checked === node.checked) return
      panel.handleCheckChange(node, checked)
    }

    const doLoad = () => {
      panel.lazyLoad(props.node, () => {
        if (!isLeaf.value) doExpand()
      })
    }

    const handleHoverExpand = (e: Event) => {
      if (!isHoverMenu.value) return
      handleExpand()
      !isLeaf.value && emit('expand', e)
    }

    const handleExpand = () => {
      const { node } = props
      // do not exclude leaf node because the menus expanded might have to reset
      if (!expandable.value || node.loading) return
      node.loaded ? doExpand() : doLoad()
    }

    const handleClick = () => {
      if (isHoverMenu.value && !isLeaf.value) return

      if (isLeaf.value && !isDisabled.value && !checkStrictly.value && !multiple.value) {
        handleCheck(true)
      } else {
        handleExpand()
      }
    }

    const handleSelectCheck = (checked: boolean) => {
      if (checkStrictly.value) {
        doCheck(checked)
        if (props.node.loaded) {
          doExpand()
        }
      } else {
        handleCheck(checked)
      }
    }

    const handleCheck = (checked: boolean) => {
      if (!props.node.loaded) {
        doLoad()
      } else {
        doCheck(checked)
        !checkStrictly.value && doExpand()
      }
    }

    return {
      panel,
      isHoverMenu,
      multiple,
      checkStrictly,
      checkedNodeId,
      isDisabled,
      isLeaf,
      expandable,
      inExpandingPath,
      inCheckedPath,
      handleHoverExpand,
      handleExpand,
      handleClick,
      handleCheck,
      handleSelectCheck,
    }
  },
})
</script>
