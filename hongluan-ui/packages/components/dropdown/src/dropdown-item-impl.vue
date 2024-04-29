<template>
  <li
    v-if="divider"
    class="menu-divider"
    role="separator"
    v-bind="$attrs"
  ></li>
  <li
    v-else
    :ref="itemRef"
    v-bind="{ ...dataset, ...$attrs }"
    :aria-disabled="disabled"
    :class="{
      [namespace]: true,
      'is-disabled': disabled,
    }"
    :tabindex="tabIndex"
    :role="role"
    @click="(e) => $emit('clickimpl', e)"
    @focus="handleFocus"
    @keydown="handleKeydown"
    @mousedown="handleMousedown"
    @pointermove="(e) => $emit('pointermove', e)"
    @pointerleave="(e) => $emit('pointerleave', e)"
  >
    <slot name="icon"></slot>
    <slot></slot>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import {
  ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY,
  ROVING_FOCUS_ITEM_COLLECTION_INJECTION_KEY,
} from '@hongluan-ui/components/roving-focus-group'
import { COLLECTION_ITEM_SIGN } from '@hongluan-ui/components/collection'
import { useNamespace } from '@hongluan-ui/hooks'
import { composeEventHandlers, composeRefs } from '@hongluan-ui/utils'
import { EVENT_CODE } from '@hongluan-ui/constants'
import {
  DROPDOWN_COLLECTION_ITEM_INJECTION_KEY,
  dropdownItemProps,
} from './dropdown'
import { DROPDOWN_INJECTION_KEY } from './tokens'

export default defineComponent({
  name: 'DropdownItemImpl',
  props: dropdownItemProps,
  emits: ['pointermove', 'pointerleave', 'click', 'clickimpl'],
  setup(_, { emit }) {
    const { namespace } = useNamespace('dropdown-item')
    const { role: menuRole } = inject(DROPDOWN_INJECTION_KEY, undefined)!

    const { collectionItemRef: dropdownCollectionItemRef } = inject(
      DROPDOWN_COLLECTION_ITEM_INJECTION_KEY,
      undefined,
    )

    const { collectionItemRef: rovingFocusCollectionItemRef } = inject(
      ROVING_FOCUS_ITEM_COLLECTION_INJECTION_KEY,
      undefined,
    )

    const {
      rovingFocusGroupItemRef,
      tabIndex,
      handleFocus,
      handleKeydown: handleItemKeydown,
      handleMousedown,
    } = inject(ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY, undefined)

    const itemRef = composeRefs(
      dropdownCollectionItemRef,
      rovingFocusCollectionItemRef,
      rovingFocusGroupItemRef,
    )

    const role = computed<string>(() => {
      if (menuRole.value === 'menu') {
        return 'menuitem'
      } else if (menuRole.value === 'navigation') {
        return 'link'
      }
      return 'button'
    })

    const handleKeydown = composeEventHandlers((e: KeyboardEvent) => {
      const { code } = e
      if (code === EVENT_CODE.enter || code === EVENT_CODE.space) {
        e.preventDefault()
        e.stopImmediatePropagation()
        emit('clickimpl', e)
        return true
      }
    }, handleItemKeydown)

    return {
      namespace,
      itemRef,
      dataset: {
        [COLLECTION_ITEM_SIGN]: '',
      },
      role,
      tabIndex,
      handleFocus,
      handleKeydown,
      handleMousedown,
    }
  },
})
</script>
