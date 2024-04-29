<template>
  <transition name="fade">
    <hl-overlay
      v-show="visible"
      :mask="modal"
      :overlay-class="[modalClass]"
      :z-index="zIndex"
      :msg-overlay-id="messageBoxId"
      @click.self="handleWrapperClick"
    />
  </transition>
  <teleport :to="rootContainer">
    <transition :name="animationName" @after-leave="afterLeave">
      <div
        v-show="visible"
        ref="messageBoxRef"
        role="dialog"
        :aria-label="title"
        aria-modal="true"
        :aria-describedby="!showInput ? contentId : undefined"
        :class="[namespace + '-message-box', customClass]"
        :style="{ zIndex: zIndex + 1, ...customStyle }"
        :msg-box-id="messageBoxId"
        @click.self="handleWrapperClick"
      >
        <hl-focus-trap
          loop
          :trapped="visible"
          :focus-trap-el="rootRef"
          :focus-start-el="focusStartRef"
          @release-requested="onCloseRequested"
        >
          <div
            ref="rootRef"
            :class="[
              namespace + '-panel',
              hasDefinedIcon ? `${type === 'error' ? 'danger' : type}` : '',
              'borderless',
            ]"
            tabindex="-1"
            @click.stop
          >
            <div
              ref="headerRef"
              class="panel-header"
            >
              <div v-if="type || $slots.icon" class="panel-header-left">
                <slot name="icon">
                  <hl-icon>
                    <system-success v-if="type === 'success'" />
                    <system-info v-else-if="type === 'info'" />
                    <system-warning v-else-if="type === 'warning'" />
                    <system-error v-else-if="['danger', 'error'].includes(type)" />
                  </hl-icon>
                </slot>
              </div>
              <h5 class="panel-title">{{ title }}</h5>
              <div class="panel-header-right">
                <hl-button
                  v-if="showClose"
                  :aria-label="t('hl.messagebox.close')"
                  class="panel-close"
                  @click="
                    handleAction(distinguishCancelAndClose ? 'close' : 'cancel')
                  "
                  @keydown.prevent.enter="
                    handleAction(distinguishCancelAndClose ? 'close' : 'cancel')
                  "
                >
                  <hl-icon>
                    <system-close />
                  </hl-icon>
                </hl-button>
              </div>
            </div>
            <div :id="contentId" class="panel-body">
              <slot>
                <span v-if="!dangerouslyUseHTMLString">
                  {{ message }}
                </span>
                <span v-else v-html="message"></span>
              </slot>
            </div>
            <div class="panel-footer items-center">
              <hl-button
                v-if="showCancelButton"
                :loading="cancelButtonLoading"
                :class="[cancelButtonClass, 'm-r-md']"
                :type="cancelButtonType"
                :size="buttonSize"
                :round="roundButton"
                @click="handleAction('cancel')"
                @keydown.prevent.enter="handleAction('cancel')"
              >
                {{ cancelButtonText || t('hl.messagebox.cancel') }}
              </hl-button>
              <hl-button
                v-show="showConfirmButton"
                ref="confirmRef"
                :loading="confirmButtonLoading"
                :round="roundButton"
                :type="confirmButtonType"
                :size="buttonSize"
                :disabled="confirmButtonDisabled"
                @click="handleAction('confirm')"
                @keydown.prevent.enter="handleAction('confirm')"
              >
                {{ confirmButtonText || t('hl.messagebox.confirm') }}
              </hl-button>
            </div>
          </div>
        </hl-focus-trap>
      </div>
    </transition>
  </teleport>
</template>
<script lang="ts">
import {
  defineComponent,
  nextTick,
  onMounted,
  onBeforeUnmount,
  computed,
  reactive,
  ref,
  toRefs,
  isVNode,
  watch,
} from 'vue'
import HlButton from '@hongluan-ui/components/button'
import { HlOverlay } from '@hongluan-ui/components/overlay'
import HlIcon from '@hongluan-ui/components/icon'
import HlFocusTrap from '@hongluan-ui/components/focus-trap'
import { SystemSuccess, SystemInfo, SystemWarning, SystemError, SystemClose } from '@hongluan-ui/components/system-icon'
import { useLocale, useId, useLockscreen, useRestoreActive, useNamespace, useZIndex } from '@hongluan-ui/hooks'
import { isString, generateId, isValidComponentSize, isElement } from '@hongluan-ui/utils'
import { MessageTypeIconMap } from '@hongluan-ui/constants'

import type { ComponentPublicInstance, PropType, VNode } from 'vue'
import type { ComponentSize } from '@hongluan-ui/constants'
import type { Action, MessageBoxState, MessageBoxType } from './message-box.type'

export default defineComponent({
  name: 'MessageBox',
  install: null,
  components: {
    HlOverlay,
    HlButton,
    HlIcon,
    SystemSuccess,
    SystemInfo,
    SystemWarning,
    SystemClose,
    SystemError,
    HlFocusTrap,
  },
  inheritAttrs: false,
  props: {
    beforeClose: {
      type: Function as PropType<
      (action: Action, state: MessageBoxState, doClose: () => void) => any
      >,
      default: undefined,
    },
    callback: Function,
    buttonSize: {
      type: String as PropType<ComponentSize>,
      validator: isValidComponentSize,
      default: 'md',
    },
    cancelButtonText: {
      type: String,
    },
    cancelButtonClass: String,
    center: Boolean,
    closeOnClickModal: {
      type: Boolean,
      default: true,
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true,
    },
    closeOnHashChange: {
      type: Boolean,
      default: true,
    },
    confirmButtonText: {
      type: String,
    },
    confirmButtonClass: String,
    appendTo: {
      type: [String, Object], // default append to body
      default: 'body',
    },
    customClass: String,
    customStyle: {
      type: Object,
      default: () => ({}),
    },
    dangerouslyUseHTMLString: Boolean,
    distinguishCancelAndClose: Boolean,
    lockScroll: {
      type: Boolean,
      default: true,
    },
    message: {
      type: [String, Object] as PropType<string | VNode>,
      validator: (val: unknown) => {
        return isString(val) || isVNode(val)
      },
    },
    icon: {
      type: Object as PropType<VNode>,
      validator: (val: unknown) => isVNode(val),
    },
    modalFade: {
      // implement this feature
      type: Boolean,
      default: true,
    },
    modalClass: {
      type: String,
    },
    modal: {
      type: Boolean,
      default: true,
    },
    roundButton: Boolean,
    showCancelButton: Boolean,
    showConfirmButton: {
      type: Boolean,
      default: true,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    confirmButtonType: {
      type: String,
      default: 'primary',
    },
    cancelButtonType: String,
    title: String,
    zIndex: {
      type: Number,
    },
    animationName: {
      type: String,
      default: 'bounce',
    },
    type: { type: String, default: '' },
    boxType: {
      type: String as PropType<MessageBoxType>,
      default: '',
    },
  },
  emits: ['vanish', 'action'],
  setup(props, { emit }) {
    const { namespace } = useNamespace()
    const { t } = useLocale()

    // const popup = usePopup(props, doClose)
    const visible = ref(false)
    const { nextZIndex } = useZIndex()
    // s represents state
    const state = reactive({
      beforeClose: props.beforeClose,
      callback: props.callback,
      cancelButtonText: props.cancelButtonText,
      cancelButtonClass: props.cancelButtonClass,
      confirmButtonText: props.confirmButtonText,
      confirmButtonClass: props.confirmButtonClass,
      confirmButtonType: props.confirmButtonType || 'primary',
      cancelButtonType: props.cancelButtonType || null,
      customClass: props.customClass,
      customStyle: props.customStyle,
      dangerouslyUseHTMLString: props.dangerouslyUseHTMLString || false,
      distinguishCancelAndClose: props.distinguishCancelAndClose || false,
      message: props.message || null,
      modalFade: props.modalFade || true,
      modalClass: props.modalClass || '',
      showCancelButton: props.showCancelButton || false,
      showConfirmButton: props.showConfirmButton || true,
      type: props.type || '',
      title: props.title || undefined,
      showInput: false,
      inputValue: '',
      animationName: props.animationName,
      action: '' as Action,
      confirmButtonLoading: false,
      cancelButtonLoading: false,
      confirmButtonDisabled: false,
      editorErrorMessage: '',
      // refer to: https://github.com/ElemeFE/element/commit/2999279ae34ef10c373ca795c87b020ed6753eed
      // seemed ok for now without this state.
      // isOnComposition: false, // temporary remove
      validateError: false,
      zIndex: nextZIndex(),
    }) as MessageBoxState
    const hasMessage = computed(() => !!props.message)
    const hasDefinedIcon = computed(() => {
      return !!MessageTypeIconMap[props.type]
    })

    const rootRef = ref<HTMLElement>()
    const headerRef = ref<HTMLElement>()
    const focusStartRef = ref<HTMLElement>()
    const confirmRef = ref<ComponentPublicInstance>(null)
    const messageBoxRef = ref(null)

    let cleanup: () => void | null = null

    const rootContainer = computed(() => {
      if (isString(props.appendTo)) {
        const appendTo = document.querySelector<HTMLElement>(props.appendTo)
        if (!isElement(appendTo)) {
          return 'body'
        }
      }
      return props.appendTo
    })

    const contentId = useId()

    watch(() => visible.value, val => {
      if (val) {
        if (props.boxType !== 'prompt') {
          focusStartRef.value = confirmRef.value?.$el ?? rootRef.value
        }
        state.zIndex = nextZIndex()
      }
      if (props.boxType !== 'prompt') return
    })

    onMounted(async () => {
      await nextTick()
      if (props.closeOnHashChange) {
        window.addEventListener('hashchange', doClose)
      }
    })

    onBeforeUnmount(() => {
      if (props.closeOnHashChange) {
        window.removeEventListener('hashchange', doClose)
      }
    })

    function doClose() {
      if (!visible.value) return
      visible.value = false
      nextTick(() => {
        if (state.action) emit('action', state.action)
      })
    }

    const handleWrapperClick = () => {
      if (props.closeOnClickModal) {
        handleAction(props.distinguishCancelAndClose ? 'close' : 'cancel')
      }
    }

    const handleAction = (action: Action) => {
      if (props.boxType === 'prompt' && action === 'confirm' && !validate()) {
        return
      }

      state.action = action

      if (state.beforeClose) {
        state.beforeClose?.(action, state, doClose)
      } else {
        doClose()
      }
    }

    const validate = () => {
      // delete prompt functions
      return true
    }

    const handleClose = () => {
      handleAction('close')
    }

    const afterLeave = () => {
      emit('vanish')
      cleanup && cleanup()
    }

    // when close on press escape is disabled, pressing esc should not callout
    // any other message box and close any other dialog-ish elements
    // e.g. Dialog has a close on press esc feature, and when it closes, it calls
    // props.beforeClose method to make a intermediate state by callout a message box
    // for some verification or alerting. then if we allow global event liek this
    // to dispatch, it could callout another message box.
    const onCloseRequested = () => {
      if (props.closeOnPressEscape) {
        handleClose()
      }
    }

    // locks the screen to prevent scroll
    if (props.lockScroll) {
      cleanup = useLockscreen(visible, false)
    }

    // restore to prev active element.
    useRestoreActive(visible)

    return {
      ...toRefs(state),
      rootContainer,
      rootRef,
      headerRef,
      focusStartRef,
      contentId,
      messageBoxId: generateId(),
      namespace,
      hasDefinedIcon,
      visible,
      hasMessage,
      confirmRef,
      messageBoxRef,
      doClose, // for outside usage
      handleClose, // for out side usage
      onCloseRequested,
      handleWrapperClick,
      handleAction,
      afterLeave,
      t,
    }
  },
})
</script>
