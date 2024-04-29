<template>
  <li :class="namespace">
    <div class="group-title">
      <template v-if="!$slots.title">{{ title }}</template>
      <slot v-else name="title"></slot>
    </div>
    <ul>
      <slot></slot>
    </ul>
  </li>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { throwError } from '@hongluan-ui/utils'
import { menuItemGroupProps } from './menu-item-group'
import { useNamespace } from '@hongluan-ui/hooks'

import type { MenuProvider } from './types'

const COMPONENT_NAME = 'MenuItemGroup'

export default defineComponent({
  name: COMPONENT_NAME,

  props: menuItemGroupProps,

  setup() {
    const { namespace } = useNamespace('menu-item-group')
    const menu = inject<MenuProvider>('rootMenu')
    if (!menu) throwError(COMPONENT_NAME, 'can not inject root menu')

    return {
      namespace,
    }
  },
})
</script>
