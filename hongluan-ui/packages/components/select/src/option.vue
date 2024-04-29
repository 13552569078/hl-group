<template>
  <li v-if="divider" class="menu-divider"></li>
  <li
    v-else
    v-show="visible"
    :class="{
      [namespace]: true,
      'select-dropdown-item': true,
      'is-selected': itemSelected,
      'is-disabled': isDisabled,
      'hover': hover
    }"
    @mouseenter="hoverItem"
    @click.stop="selectOptionClick"
  >
    <slot>
      <div>{{ currentLabel }}</div>
      <hl-icon v-if="itemSelected">
        <system-checked />
      </hl-icon>
    </slot>
  </li>
</template>

<script lang="ts">
import {
  toRefs,
  defineComponent,
  getCurrentInstance,
  onBeforeUnmount,
  reactive,
  nextTick,
} from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemChecked } from '@hongluan-ui/components/system-icon'
import { useOption } from './useOption'
import type { SelectOptionProxy } from './token'

export default defineComponent({
  name: 'Option',
  components: {
    HlIcon,
    SystemChecked,
  },
  componentName: 'Option',

  props: {
    value: {
      type: [String, Number, Boolean, Object],
    },
    label: [String, Number],
    created: Boolean,
    disabled: {
      type: Boolean,
      default: false,
    },
    divider: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const { namespace } = useNamespace('option')
    const states = reactive({
      index: -1,
      groupDisabled: false,
      visible: true,
      hitState: false,
      hover: false,
    })

    const {
      currentLabel,
      itemSelected,
      isDisabled,
      select,
      hoverItem,
    } = useOption(props, states)

    const {
      visible,
      hover,
    } = toRefs(states)

    const vm = getCurrentInstance().proxy
    select.onOptionCreate(vm as unknown as SelectOptionProxy)

    onBeforeUnmount(() => {
      const key = (vm as unknown as SelectOptionProxy).value
      const { selected } = select
      let selectedOptions = select.props.multiple ? selected : [selected]
      const doesSelected = selectedOptions.some(item => {
        return item.value === (vm as unknown as SelectOptionProxy).value
      })
      // if option is not selected, remove it from cache
      nextTick(() => {
        if (select.cachedOptions.get(key) === vm && !doesSelected) {
          select.cachedOptions.delete(key)
        }
      })

      select.onOptionDestroy(key, vm as unknown as SelectOptionProxy)
    })

    function selectOptionClick() {
      if (props.disabled !== true && states.groupDisabled !== true) {
        select.handleOptionSelect(vm, true)
      }
    }

    return {
      namespace,
      currentLabel,
      itemSelected,
      isDisabled,
      select,
      hoverItem,
      visible,
      hover,
      selectOptionClick,
      states,
    }
  },
})

</script>
