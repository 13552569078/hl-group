import { watch, isRef, onScopeDispose } from 'vue'

import { isClient } from '@vueuse/core'
import {
  throwError,
  addClass,
  removeClass,
  hasClass,
  getStyle,
  getScrollBarWidth,
} from '@hongluan-ui/utils'

import type { Ref } from 'vue'

/**
 * Hook that monitoring the ref value to lock or unlock the screen.
 * When the trigger became true, it assumes modal is now opened and vice versa.
 * @param trigger {Ref<boolean>}
 */
export const useLockscreen = (trigger: Ref<boolean>, autoClean = true) => {
  if (!isRef(trigger)) {
    throwError(
      '[useLockscreen]',
      'You need to pass a ref param to this function',
    )
  }
  if (!isClient || hasClass(document.body, 'no-scroll')) {
    return
  }

  let scrollBarWidth = 0
  let withoutHiddenClass = false
  let bodyWidth = '0'

  const cleanup = () => {
    if (autoClean) { // 自动清除
      setTimeout(() => {
        removeClass(document.body, 'no-scroll')
        if (withoutHiddenClass) {
          document.body.style.width = bodyWidth
        }
      }, 200)
    } else { // 手工清除，一般用于动画结束后清除
      if (hasClass(document.body, 'no-scroll')) {
        removeClass(document.body, 'no-scroll')
        document.body.style.width = bodyWidth
      }
    }
  }

  watch(trigger, val => {
    if (!val && autoClean) {
      cleanup()
      return
    }

    withoutHiddenClass = !hasClass(document.body, 'no-scroll')
    if (withoutHiddenClass) {
      bodyWidth = document.body.style.width
    }
    scrollBarWidth = getScrollBarWidth()
    const bodyHasOverflow =
      document.documentElement.clientHeight < document.body.scrollHeight
    const bodyOverflowY = getStyle(document.body, 'overflowY')
    if (
      scrollBarWidth > 0 &&
      (bodyHasOverflow || bodyOverflowY === 'scroll') &&
      withoutHiddenClass
    ) {
      document.body.style.width = `calc(100% - ${scrollBarWidth}px)`
    }
    addClass(document.body, 'no-scroll')
  })
  onScopeDispose(() => cleanup())

  return cleanup
}
