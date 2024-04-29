import { onMounted, onUpdated, watch, shallowRef } from 'vue'
import { useEventListener } from '@vueuse/core'
import { EVENT_CODE } from '@hongluan-ui/constants'

import type { Ref } from 'vue'
import type TreeStore from './tree-store'

import type { Nullable } from '@hongluan-ui/utils'
interface UseKeydownOption {
  el$: Ref<HTMLElement>
}
export function useKeydown({ el$ }: UseKeydownOption, store: Ref<TreeStore>) {
  const treeItems = shallowRef<Nullable<HTMLElement>[]>([])
  const checkboxItems = shallowRef<Nullable<HTMLElement>[]>([])

  onMounted(() => {
    initTabIndex()
  })

  onUpdated(() => {
    treeItems.value = Array.from(el$.value.querySelectorAll('[role=treeitem]'))
    checkboxItems.value = Array.from(el$.value.querySelectorAll('input[type=checkbox]'))
  })

  watch(checkboxItems, val => {
    val.forEach(checkbox => {
      checkbox.setAttribute('tabindex', '-1')
    })
  })

  const handleKeydown = (ev: KeyboardEvent): void => {
    const currentItem = ev.target as HTMLElement
    if (currentItem.className.indexOf('tree-node') === -1) return
    const code = ev.code
    treeItems.value = Array.from(el$.value.querySelectorAll('.is-focusable[role=treeitem]'))
    const currentIndex = treeItems.value.indexOf(currentItem)
    let nextIndex
    if ([EVENT_CODE.up, EVENT_CODE.down].indexOf(code) > -1) {
      ev.preventDefault()
      if (code === EVENT_CODE.up) {
        nextIndex = currentIndex === -1 ? 0 : currentIndex !== 0 ? currentIndex - 1 : treeItems.value.length - 1
        const startIndex = nextIndex
        while (true) {
          if(store.value.getNode(treeItems.value[nextIndex].dataset.key).canFocus) break
          nextIndex--
          if(nextIndex === startIndex) {
            nextIndex = -1
            break
          }
          if(nextIndex < 0) {
            nextIndex = treeItems.value.length - 1
          }
        }
      } else {
        nextIndex = currentIndex === -1 ? 0 : (currentIndex < treeItems.value.length - 1) ? currentIndex + 1 : 0
        const startIndex = nextIndex
        while (true) {
          if(store.value.getNode(treeItems.value[nextIndex].dataset.key).canFocus) break
          nextIndex++
          if(nextIndex === startIndex) {
            nextIndex = -1
            break
          }
          if(nextIndex >= treeItems.value.length) {
            nextIndex = 0
          }
        }
      }
      nextIndex !== -1 && treeItems.value[nextIndex].focus()
    }
    if ([EVENT_CODE.left, EVENT_CODE.right].indexOf(code) > -1) {
      ev.preventDefault()
      currentItem.click()
    }
    const hasInput = currentItem.querySelector('[type="checkbox"]') as Nullable<HTMLInputElement>
    if ([EVENT_CODE.enter, EVENT_CODE.space].indexOf(code) > -1 && hasInput) {
      ev.preventDefault()
      hasInput.click()
    }
  }

  const initTabIndex = (): void => {
    treeItems.value = Array.from(el$.value.querySelectorAll('.is-focusable[role=treeitem]'))
    checkboxItems.value = Array.from(el$.value.querySelectorAll('input[type=checkbox]'))
    const checkedItem = el$.value.querySelectorAll('.is-checked[role=treeitem]')
    if (checkedItem.length) {
      checkedItem[0].setAttribute('tabindex', '0')
      return
    }
    treeItems.value[0]?.setAttribute('tabindex', '0')
  }

  useEventListener(el$, 'keydown', handleKeydown)
}
