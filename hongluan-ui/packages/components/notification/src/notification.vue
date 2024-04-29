<template>
  <transition
    name="notification-fade"
    @before-leave="onClose"
    @after-leave="$emit('destroy')"
  >
    <div
      v-show="visible"
      :id="id"
      :class="[
        namespace + '-panel',
        namespace + '-notification',
        'at-' + position,
        customClass,
        horizontalClass,
        hasDefinedIcon ? `${type === 'error' ? 'danger' : type}` : '',
      ]"
      :style="positionStyle"
      role="notification"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      @click="onClick"
    >
      <div class="panel-header">
        <div v-show="type || $slots.icon" class="panel-header-left">
          <slot name="icon">
            <hl-icon>
              <system-success v-if="type === 'success'" />
              <system-info v-if="type === 'info'" />
              <system-warning v-if="type === 'warning'" />
              <system-error v-if="type === 'danger' || type === 'error'" />
            </hl-icon>
          </slot>
        </div>
        <span class="panel-title" v-text="title"></span>
        <div v-if="showClose" class="panel-header-right">
          <button
            class="panel-close"
            @click.stop="close"
          >
            <hl-icon>
              <system-close />
            </hl-icon>
          </button>
        </div>
      </div>
      <div
        v-show="message"
        class="panel-body"
        :style="!!title ? undefined : { margin: 0 }"
      >
        <slot>
          <span v-if="!dangerouslyUseHTMLString">{{ message }}</span>
          <span v-else v-html="message"></span>
        </slot>
      </div>
    </div>
  </transition>
</template>
<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import { useEventListener, useTimeoutFn } from '@vueuse/core'
import { EVENT_CODE, MessageTypeIconMap } from '@hongluan-ui/constants'
import { useNamespace } from '@hongluan-ui/hooks'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemSuccess, SystemInfo, SystemWarning, SystemClose, SystemError } from '@hongluan-ui/components/system-icon'
import { notificationProps, notificationEmits } from './notification'

import type { CSSProperties } from 'vue'

defineOptions({
  name: 'Notification',
})

const props = defineProps(notificationProps)
defineEmits(notificationEmits)

const { namespace } = useNamespace()

const visible = ref(false)
let timer: (() => void) | undefined = undefined

const hasDefinedIcon = computed(() => !!MessageTypeIconMap[props.type])
const horizontalClass = computed(() =>
  props.position.endsWith('right') ? 'right' : 'left',
)

const verticalProperty = computed(() =>
  props.position.startsWith('top') ? 'top' : 'bottom',
)

const positionStyle = computed<CSSProperties>(() => {
  return {
    [verticalProperty.value]: `${props.offset}px`,
    zIndex: props.zIndex,
  }
})

function startTimer() {
  if (props.duration > 0) {
    ({ stop: timer } = useTimeoutFn(() => {
      if (visible.value) close()
    }, props.duration))
  }
}

function clearTimer() {
  timer?.()
}

function close() {
  visible.value = false
}

function onKeydown({ code }: KeyboardEvent) {
  if (code === EVENT_CODE.delete || code === EVENT_CODE.backspace) {
    clearTimer() // press delete/backspace clear timer
  } else if (code === EVENT_CODE.esc) {
    // press esc to close the notification
    if (visible.value) {
      close()
    }
  } else {
    startTimer() // resume timer
  }
}

// lifecycle
onMounted(() => {
  startTimer()
  visible.value = true
})

useEventListener(document, 'keydown', onKeydown)

defineExpose({
  visible,
  /** @description close notification */
  close,
})
</script>
