import { computed, ref, watch, nextTick, onMounted, getCurrentInstance } from 'vue'
import { useTimeoutFn } from '@vueuse/core'
import { isClient } from '@vueuse/core'
import { UPDATE_MODEL_EVENT } from '@hongluan-ui/constants'
import { useLockscreen, useZIndex, useId } from '@hongluan-ui/hooks'

import type { Ref, SetupContext } from 'vue'
import type { DialogEmits, DialogProps } from './dialog'

export const CLOSE_EVENT = 'close'
export const OPEN_EVENT = 'open'
export const CLOSED_EVENT = 'closed'
export const OPENED_EVENT = 'opened'

export const useDialog = (
  props: DialogProps,
  targetRef: Ref<HTMLElement | undefined>,
) => {
  let lastPosition = ''
  const titleId = useId()
  const bodyId = useId()
  const visible = ref(false)
  const closed = ref(false)
  const rendered = ref(false) // when desctroyOnClose is true, we initialize it as false vise versa
  const { nextZIndex } = useZIndex()
  const zIndex = ref(props.zIndex || nextZIndex())
  let cleanup: (() => void) | undefined

  let stopOpenTimer: (() => void) | undefined = undefined
  let stopCloseTimer: (() => void) | undefined = undefined

  const animName = computed(() => {
    let name = props.animationName
    if (props.showAs === 'drawer') {
      switch (props.placement) {
        case 'left':
          name = 'slideRightSide'
          break
        case 'right':
          name = 'slideLeftSide'
          break
        case 'bottom':
          name = 'slideTopSide'
          break
        case 'top':
          name = 'slideBottomSide'
          break
        case 'fullscreen':
          name = 'scale'
          break
      }
    }
    return name
  })

  const instance = getCurrentInstance()!
  const emit = instance.emit as SetupContext<DialogEmits>['emit']

  function afterEnter() {
    emit(OPENED_EVENT)
  }

  function afterLeave() {
    emit(CLOSED_EVENT)
    emit(UPDATE_MODEL_EVENT, false)
    if (props.destroyOnClose) {
      rendered.value = false
    }
    cleanup && cleanup()
  }

  function beforeLeave() {
    emit(CLOSE_EVENT)
  }

  function open() {
    stopCloseTimer?.()
    stopOpenTimer?.()
    if (props.openDelay && props.openDelay > 0) {
      ({ stop: stopOpenTimer } = useTimeoutFn(() => doOpen(), props.openDelay))
    } else {
      doOpen()
    }
  }

  function close() {
    stopOpenTimer?.()
    stopCloseTimer?.()

    if (props.closeDelay && props.closeDelay > 0) {
      ({ stop: stopCloseTimer } = useTimeoutFn(() => doClose(), props.closeDelay))
    } else {
      doClose()
    }
  }

  function hide(shouldCancel?: boolean) {
    if (shouldCancel) return
    closed.value = true
    visible.value = false
  }

  function handleClose() {
    if (props.beforeClose) {
      props.beforeClose(hide)
    } else {
      close()
    }
  }

  function onModalClick() {
    if (props.closeOnClickModal) {
      handleClose()
    }
  }

  function doOpen() {
    if (!isClient) {
      return
    }
    visible.value = true
  }

  function doClose() {
    visible.value = false
  }

  function onOpenAutoFocus() {
    emit('openAutoFocus')
  }

  function onCloseAutoFocus() {
    emit('closeAutoFocus')
  }

  function onFocusoutPrevented(event: CustomEvent) {
    if (event.detail?.focusReason === 'pointer') {
      event.preventDefault()
    }
  }

  if (props.lockScroll) {
    cleanup = useLockscreen(visible, false)
  }

  function onCloseRequested() {
    if (props.closeOnPressEscape) {
      handleClose()
    }
  }

  watch(() => props.modelValue, val => {
    if (val) {
      closed.value = false
      open()
      rendered.value = true // enables lazy rendering
      zIndex.value = props.zIndex ? zIndex.value++ : nextZIndex()
      // this.$el.addEventListener('scroll', this.updatePopper)
      nextTick(() => {
        emit(OPEN_EVENT)
        if (targetRef.value) {
          targetRef.value.scrollTop = 0
        }
      })
    } else {
      // this.$el.removeEventListener('scroll', this.updatePopper
      if (visible.value) {
        close()
      }
    }
  })

  watch(
    () => props.placement,
    val => {
      if (val === 'fullscreen') {
        if (!targetRef.value) return
        if (val) {
          lastPosition = targetRef.value.style.transform
          targetRef.value.style.transform = ''
        } else {
          targetRef.value.style.transform = lastPosition
        }
      }
    },
  )

  onMounted(() => {
    if (props.modelValue) {
      visible.value = true
      rendered.value = true // enables lazy rendering
      open()
    }
  })

  return {
    afterEnter,
    afterLeave,
    beforeLeave,
    handleClose,
    onModalClick,
    close,
    doClose,
    onOpenAutoFocus,
    onCloseAutoFocus,
    onCloseRequested,
    onFocusoutPrevented,
    titleId,
    bodyId,
    closed,
    rendered,
    animName,
    visible,
    zIndex,
  }
}
