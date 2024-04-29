<template>
  <li
    role="menuitem"
    tabindex="-1"
    :style="[itemStyle]"
    :class="{
      [namespace + '-menu-item']: true,
      'is-active': active,
      'is-disabled': disabled,
    }"
    @click="handleClick"
  >
    <hl-tooltip
      v-if="
        parentMenu.type.name === 'Menu' &&
          rootMenu.finalCollapse &&
          $slots.title
      "
      trigger="hover"
      class="no-style"
      placement="right-start"
      :fallback-placements="['left']"
      :show-arrow="false"
      :offset="0"
      :hide-after="0"
      :popper-class="`${namespace}-menu-popover`"
    >
      <template #content>
        <slot name="title"></slot>
      </template>
      <div class="item-content">
        <slot></slot>
      </div>
    </hl-tooltip>
    <template v-else>
      <div class="item-content">
        <slot></slot>
        <slot name="title"></slot>
      </div>
    </template>
  </li>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  onMounted,
  onBeforeUnmount,
  inject,
  getCurrentInstance,
  toRef,
  reactive,
} from 'vue'
import HlTooltip from '@hongluan-ui/components/tooltip'
import { Effect } from '@hongluan-ui/components/popper'
import { throwError } from '@hongluan-ui/utils'
import { useNamespace } from '@hongluan-ui/hooks'
import useMenu from './use-menu'
import { menuItemProps } from './menu-item'

import type { MenuItemRegistered, MenuProvider, SubMenuProvider } from './types'

const COMPONENT_NAME = 'MenuItem'
export default defineComponent({
  name: COMPONENT_NAME,
  components: {
    HlTooltip,
  },

  props: menuItemProps,
  emits: ['click'],

  setup(props, { emit }) {
    const { namespace } = useNamespace()
    const instance = getCurrentInstance()
    const rootMenu = inject<MenuProvider>('rootMenu')
    if (!rootMenu) throwError(COMPONENT_NAME, 'can not inject root menu')

    const { parentMenu, indexPath } = useMenu(
      instance,
      toRef(props, 'index'),
    )

    const subMenu = inject<SubMenuProvider>(`subMenu:${parentMenu.value.uid}`)
    if (!subMenu) throwError(COMPONENT_NAME, 'can not inject sub menu')

    const active = computed(() => props.index === rootMenu.activeIndex)
    const backgroundColor = computed(() => rootMenu.props.backgroundColor || '')
    const activeTextColor = computed(() => rootMenu.props.activeTextColor || '')
    const textColor = computed(() => rootMenu.props.textColor || '')

    const item: MenuItemRegistered = reactive({
      index: props.index,
      indexPath,
      active,
    })
    const itemStyle = computed(() => {
      const style = {
        color: active.value ? activeTextColor.value : textColor.value,
        backgroundColor: backgroundColor.value,
      }
      return style
    })

    const handleClick = () => {
      if (!props.disabled) {
        rootMenu.handleMenuItemClick({
          index: props.index,
          indexPath: indexPath.value,
          route: props.route,
        })
        emit('click', item)
      }
    }

    onMounted(() => {
      subMenu.addSubMenu(item)
      rootMenu.addMenuItem(item)
    })

    onBeforeUnmount(() => {
      subMenu.removeSubMenu(item)
      rootMenu.removeMenuItem(item)
    })

    return {
      namespace,
      itemStyle,
      Effect,
      parentMenu,
      rootMenu,
      active,
      handleClick,
    }
  },
})
</script>
