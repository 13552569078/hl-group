import { computed, inject } from 'vue'
import { throwError } from '@hongluan-ui/utils'

import type { ComponentInternalInstance, Ref } from 'vue'
import type { MenuProvider } from './types'

export default function useMenu(
  instance: ComponentInternalInstance,
  currentIndex: Ref<string>,
) {
  const rootMenu = inject<MenuProvider>('rootMenu')
  if (!rootMenu) throwError('useMenu', 'can not inject root menu')

  const indexPath = computed(() => {
    let parent = instance.parent
    const path = [currentIndex.value]
    while (parent?.type.name !== 'Menu') {
      if (parent?.props.index) {
        path.unshift(parent?.props.index as string)
      }
      parent = parent!.parent
    }
    return path
  })

  const parentMenu = computed(() => {
    let parent = instance.parent
    while (parent && !['Menu', 'SubMenu'].includes(parent.type.name!)) {
      parent = parent.parent
    }
    return parent
  })

  return {
    parentMenu,
    indexPath,
  }
}
