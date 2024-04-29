<template>
  <teleport to="body" :disabled="!appendToBody">
    <transition name="fade">
      <hl-overlay
        v-show="visible"
        :mask="modal"
        :overlay-class="modalClass"
        :z-index="zIndex"
        @click="overlayEvent.onClick"
        @mousedown="overlayEvent.onMousedown"
        @mouseup="overlayEvent.onMouseup"
      />
    </transition>

    <transition :name="animName" @after-enter="afterEnter" @after-leave="afterLeave" @before-leave="beforeLeave">
      <div
        v-show="visible"
        :role="showAs"
        aria-modal="true"
        :aria-label="title || undefined"
        :aria-labelledby="!title ? titleId : undefined"
        :aria-describedby="bodyId"
        :class="[namespace + '-dialog', 'at-' + placement]"
        :style="{
          zIndex: zIndex + 1,
        }"
        @click="overlayEvent.onClick"
        @mousedown="overlayEvent.onMousedown"
        @mouseup="overlayEvent.onMouseup"
      >
        <focus-trap
          loop
          :trapped="visible"
          focus-start-el="container"
          @focus-after-trapped="onOpenAutoFocus"
          @focus-after-released="onCloseAutoFocus"
          @focusout-prevented="onFocusoutPrevented"
          @release-requested="onCloseRequested"
        >
          <dialog-content
            v-if="rendered"
            ref="dialogContentRef"
            :show-as="showAs"
            :show-close="showClose"
            :custom-class="customClass"
            :placement="placement"
            :top="top"
            :title="title"
            :height="height"
            :width="width"
            :draggable="draggable"
            v-bind="$attrs"
          >
            <template v-if="$slots.header" #header>
              <slot
                name="header"
                :close="handleClose"
                :title-id="titleId"
                title-class="panel-title"
              ></slot>
            </template>
            <template v-if="$slots.title" #title>
              <slot name="title"></slot>
            </template>
            <slot></slot>
            <template v-if="$slots.footer" #footer>
              <slot name="footer"></slot>
            </template>
          </dialog-content>
        </focus-trap>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, provide, ref } from 'vue'
import { HlOverlay } from '@hongluan-ui/components/overlay'
import { usePanelProps } from '@hongluan-ui/components/panel'
import { dialogInjectionKey } from '@hongluan-ui/tokens'
import FocusTrap from '@hongluan-ui/components/focus-trap'
import { useDeprecated, useNamespace, useSameTarget } from '@hongluan-ui/hooks'
import { dialogProps, dialogEmits } from './dialog'
import { useDialog } from './use-dialog'
import DialogContent from './dialog-content.vue'

export default defineComponent({
  name: 'Dialog',
  components: {
    HlOverlay,
    DialogContent,
    FocusTrap,
  },
  inheritAttrs: false,
  props: dialogProps,
  emits: dialogEmits,
  setup(props) {
    const dialogRef = ref<HTMLElement>()
    const headerRef = ref<HTMLElement>()
    const dialogContentRef = ref()

    useDeprecated(
      {
        scope: 'hl-dialog',
        from: 'custom-class',
        replacement: 'class',
        version: '2.5.0',
        ref: 'https://element-plus.org/en-US/component/dialog.html#attributes',
        type: 'Attribute',
      },
      computed(() => !!props.customClass),
    )

    const { namespace } = useNamespace()
    const {
      titleId,
      bodyId,
      afterEnter,
      afterLeave,
      beforeLeave,
      handleClose,
      onModalClick,
      onOpenAutoFocus,
      onCloseAutoFocus,
      onCloseRequested,
      onFocusoutPrevented,
      close,
      rendered,
      animName,
      visible,
      zIndex,
    } = useDialog(props, dialogRef)

    const {
      panelStyle,
      panelClass,
      headerClass: panelHeaderClass,
      bodyClass: panelBodyClass,
      footerClass: panelFooterClass,
    } = usePanelProps(props)

    provide(dialogInjectionKey, {
      dialogRef,
      headerRef,
      bodyId,
      handleClose,
      onModalClick,
      visible,
      zIndex,
      panelStyle,
      panelClass,
      panelHeaderClass,
      panelBodyClass,
      panelFooterClass,
    })

    const overlayEvent = useSameTarget(onModalClick)

    return {
      namespace,
      titleId,
      bodyId,
      dialogContentRef,
      onOpenAutoFocus,
      onCloseAutoFocus,
      onCloseRequested,
      onFocusoutPrevented,
      afterEnter,
      afterLeave,
      beforeLeave,
      onModalClick,
      overlayEvent,
      handleClose,
      close,
      rendered,
      animName,
      visible,
      zIndex,
    }
  },
})
</script>
