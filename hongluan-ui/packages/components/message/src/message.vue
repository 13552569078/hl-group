<template>
  <transition name="message-fade" @before-leave="onClose" @after-leave="$emit('destroy')">
    <div
      v-show="visible"
      :id="id"
      ref="messageRef"
      :class="[
        namespace + '-message',
        hasDefinedIcon ? `${type === 'error' ? 'danger' : type}` : '',
        showClose ? 'is-closable' : '',
        customClass,
      ]"
      :style="customStyle"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <hl-badge
        v-if="repeatNum > 1"
        position="lt"
        round
        :value="repeatNum"
        :type="badgeType"
        class="message-badge"
      />
      <slot v-if="type && !dangerouslyUseHTMLString" name="icon">
        <hl-icon class="message-icon">
          <system-success v-if="type === 'success'" />
          <system-info v-if="type === 'info'" />
          <system-warning v-if="type === 'warning'" />
          <system-error v-if="type === 'danger' || type === 'error'" />
        </hl-icon>
      </slot>

      <slot>
        <span
          v-if="!dangerouslyUseHTMLString"
          :class="['message-content', 'text-' + textAlign]"
        >{{ message }}</span>
        <div v-else v-html="message"></div>
      </slot>
      <hl-icon v-if="showClose" class="message-close" @click.stop="close">
        <system-close />
      </hl-icon>
    </div>
  </transition>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useEventListener, useResizeObserver, useTimeoutFn } from '@vueuse/core'
import { EVENT_CODE, MessageTypeIconMap } from '@hongluan-ui/constants'
import HlIcon from '@hongluan-ui/components/icon'
import HlBadge from '@hongluan-ui/components/badge'
import { SystemSuccess, SystemInfo, SystemWarning, SystemClose, SystemError } from '@hongluan-ui/components/system-icon'
import { useNamespace } from '@hongluan-ui/hooks'
import { messageEmits, messageProps } from './message'
import { getLastOffset } from './instance'
import type { BadgeProps } from '@hongluan-ui/components/badge'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'Message',
})

const props = defineProps(messageProps)
defineEmits(messageEmits)

const { namespace } = useNamespace()

const messageRef = ref<HTMLDivElement>()
const visible = ref(false)
const height = ref(0)

let stopTimer: (() => void) | undefined = undefined

const badgeType = computed<BadgeProps['type']>(() =>
  props.type ? (props.type === 'error' ? 'danger' : props.type) : 'info',
)

const lastOffset = computed(() => getLastOffset(props.id))
const offset = computed(() => props.offset + lastOffset.value)
const bottom = computed((): number => height.value + offset.value)
const customStyle = computed<CSSProperties>(() => ({
  top: `${offset.value}px`,
  zIndex: props.zIndex,
}))
const hasDefinedIcon = computed(() => !!MessageTypeIconMap[props.type])


function startTimer() {
  if (props.duration === 0) return
  ;({ stop: stopTimer } = useTimeoutFn(() => {
    close()
  }, props.duration))
}

function clearTimer() {
  stopTimer?.()
}

function close() {
  visible.value = false
}

function keydown({ code }: KeyboardEvent) {
  if (code === EVENT_CODE.esc) {
    // press esc to close the message
    close()
  }
}

onMounted(() => {
  startTimer()
  visible.value = true
})

watch(
  () => props.repeatNum,
  () => {
    clearTimer()
    startTimer()
  },
)

useEventListener(document, 'keydown', keydown)

useResizeObserver(messageRef, () => {
  height.value = messageRef.value!.getBoundingClientRect().height
})

defineExpose({
  visible,
  bottom,
  close,
})
</script>
