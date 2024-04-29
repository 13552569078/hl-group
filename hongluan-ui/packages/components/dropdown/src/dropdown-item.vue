<template>
  <hl-dropdown-collection-item
    :disabled="disabled"
    :text-value="textValue ?? textContent"
  >
    <hl-roving-focus-item :focusable="!disabled">
      <hl-dropdown-item-impl
        v-bind="propsAndAttrs"
        @pointerleave="handlePointerLeave"
        @pointermove="handlePointerMove"
        @clickimpl="handleClick"
      >
        <slot name="icon"></slot>
        <slot></slot>
      </hl-dropdown-item-impl>
    </hl-roving-focus-item>
  </hl-dropdown-collection-item>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  ref,
  unref,
} from 'vue'
import { HlRovingFocusItem } from '@hongluan-ui/components/roving-focus-group'
import { composeEventHandlers, whenMouse } from '@hongluan-ui/utils'
import HlDropdownItemImpl from './dropdown-item-impl.vue'
import { useDropdown } from './useDropdown'
import {
  HlCollectionItem as HlDropdownCollectionItem,
  dropdownItemProps,
} from './dropdown'
import { DROPDOWN_INJECTION_KEY } from './tokens'

export default defineComponent({
  name: 'DropdownItem',
  components: {
    HlDropdownCollectionItem,
    HlRovingFocusItem,
    HlDropdownItemImpl,
  },
  inheritAttrs: false,
  props: dropdownItemProps,
  emits: ['pointermove', 'pointerleave', 'click'],
  setup(props, { emit, attrs }) {
    const { hlDropdown } = useDropdown()
    const _instance = getCurrentInstance()
    const itemRef = ref<HTMLElement | null>(null)
    const textContent = computed(() => unref(itemRef)?.textContent ?? '')
    const { onItemEnter, onItemLeave } = inject(
      DROPDOWN_INJECTION_KEY,
      undefined,
    )

    const handlePointerMove = composeEventHandlers(
      (e: PointerEvent) => {
        emit('pointermove', e)
        return e.defaultPrevented
      },
      whenMouse(e => {
        if (props.disabled) {
          onItemLeave(e)
        } else {
          onItemEnter(e)
          if (!e.defaultPrevented) {
            (e.currentTarget as HTMLElement)?.focus()
          }
        }
      }),
    )

    const handlePointerLeave = composeEventHandlers(
      (e: PointerEvent) => {
        emit('pointerleave', e)
        return e.defaultPrevented
      },
      whenMouse(e => {
        onItemLeave(e)
      }),
    )

    const handleClick = composeEventHandlers(
      (e: PointerEvent) => {
        if (props.disabled) {
          return
        }
        emit('click', e)
        return e.type !== 'keydown' && e.defaultPrevented
      },
      e => {
        if (props.disabled) {
          e.stopImmediatePropagation()
          return
        }
        if (hlDropdown?.hideOnClick?.value) {
          hlDropdown.handleClick?.()
        }
        hlDropdown.commandHandler?.(props.command, _instance, e)
      },
    )

    // direct usage of v-bind={ ...$props, ...$attrs } causes type errors
    const propsAndAttrs = computed(() => {
      return { ...props, ...attrs }
    })

    return {
      handleClick,
      handlePointerMove,
      handlePointerLeave,
      textContent,
      propsAndAttrs,
    }
  },
})
</script>
