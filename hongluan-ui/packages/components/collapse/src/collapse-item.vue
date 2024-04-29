<template>
  <div
    :class="{[namespace]: true, 'is-active': isActive, 'is-disabled': disabled }"
  >
    <div
      role="tab"
      :aria-expanded="isActive"
      :aria-controls="`collapse-content-${id}`"
      :aria-describedby="`collapse-content-${id}`"
    >
      <div
        :id="`collapse-head-${id}`"
        class="item-header"
        role="button"
        :tabindex="disabled ? -1 : 0"
        :class="{
          'focusing': focusing && !disabled,
        }"
        @click="handleHeaderClick"
        @keypress.space.enter.stop.prevent="handleEnterClick"
        @focus="handleFocus"
        @blur="focusing = false"
      >
        <slot name="title"><div class="item-title">{{ title }}</div></slot>
        <hl-icon class="item-arrow">
          <system-arrow-down />
        </hl-icon>
      </div>
    </div>
    <hl-collapse-transition>
      <div
        v-show="isActive"
        :id="`collapse-content-${id}`"
        class="item-wrap"
        role="tabpanel"
        :aria-hidden="!isActive"
        :aria-labelledby="`collapse-head-${id}`"
      >
        <div class="item-content">
          <slot></slot>
        </div>
      </div>
    </hl-collapse-transition>
  </div>
</template>
<script lang='ts' setup>
import { useNamespace } from '@hongluan-ui/hooks'
import HlCollapseTransition from '@hongluan-ui/components/collapse-transition'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemArrowDown } from '@hongluan-ui/components/system-icon'
import { collapseItemProps } from './collapse-item'
import { useCollapseItem } from './use-collapse-item'

defineOptions({
  name: 'CollapseItem',
})

const props = defineProps(collapseItemProps)
const {
  focusing,
  id,
  isActive,
  handleFocus,
  handleHeaderClick,
  handleEnterClick,
} = useCollapseItem(props)

const { namespace } = useNamespace('collapse-item')

defineExpose({
  /** @description current collapse-item whether active */
  isActive,
})
</script>
