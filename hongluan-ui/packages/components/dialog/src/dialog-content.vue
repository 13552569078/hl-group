<template>
  <div
    :ref="composedDialogRef"
    v-dragger="{canDrag, showAs, placement}"
    :class="[namespace + '-panel', customClass, panelClass, canDrag ? 'is-draggable' : '']"
    :style="[
      {
        width: width,
        height: height,
      },
      top ? `top: ${top}` : '',
      panelStyle,
    ]"
    :show-as="showAs"
    tabindex="-1"
  >
    <div :class="['panel-header', panelHeaderClass]">
      <slot v-if="$slots.header" name="header"></slot>
      <template v-else-if="title || showClose || $slots.title">
        <slot name="title">
          <h4 class="panel-title">{{ title }}</h4>
        </slot>
        <div class="panel-header-right">
          <hl-button v-if="showClose" class="panel-close" :aria-label="t('hl.dialog.close')" @click="handleClose">
            <hl-icon>
              <system-close />
            </hl-icon>
          </hl-button>
        </div>
      </template>
    </div>
    <div :id="bodyId" :class="[ 'panel-body', panelBodyClass]">
      <slot></slot>
    </div>
    <div
      v-if="$slots.footer"
      :class="['panel-footer', panelFooterClass]"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { useLocale, useNamespace } from '@hongluan-ui/hooks'
import { dialogInjectionKey } from '@hongluan-ui/tokens'
import HlIcon from '@hongluan-ui/components/icon'
import HlButton from '@hongluan-ui/components/button'
import { FOCUS_TRAP_INJECTION_KEY } from '@hongluan-ui/components/focus-trap'
import { SystemClose } from '@hongluan-ui/components/system-icon'
import { dialogContentProps } from './dialog-content'
import { DialogDragger } from './dragger'
import { composeRefs } from '@hongluan-ui/utils'

export default defineComponent({
  name: 'DialogContent',
  components: {
    HlIcon,
    HlButton,
    SystemClose,
  },
  directives: {
    'dragger': DialogDragger,
  },
  props: dialogContentProps,
  setup(props) {
    const { namespace } = useNamespace()
    const { t } = useLocale()

    const canDrag = computed(() => {
      return props.showAs === 'drawer' || props.placement === 'fullscreen' ? false : props.draggable
    })

    const dialogContext = inject(dialogInjectionKey)
    const { focusTrapRef } = inject(FOCUS_TRAP_INJECTION_KEY)!

    const composedDialogRef = composeRefs(focusTrapRef, dialogContext.dialogRef)
    // const composedDialogRef = composeRefs(dialogContext.dialogRef)

    return {
      t,
      namespace,
      canDrag,
      focusTrapRef,
      composedDialogRef,
      ...dialogContext,
    }
  },
})
</script>
