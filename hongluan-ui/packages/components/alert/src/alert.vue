<template>
  <transition name="alert-fade">
    <div
      v-show="visible"
      :class="[namespace,typeClass ,{
        'has-description': description,
        [effect]: true,
        'dashed': dashed
      }]"
      role="alert"
    >
      <slot v-if="showIcon" name="icon">
        <hl-icon class="alert-icon">
          <system-success v-if="iconName === 'success'" />
          <system-info v-if="iconName === 'info'" />
          <system-warning v-if="iconName === 'warning'" />
          <system-error v-if="iconName === 'danger' || iconName === 'error'" />
        </hl-icon>
      </slot>
      <div class="alert-content">
        <span v-if="title || $slots.title" class="title">
          <slot name="title">{{ title }}</slot>
        </span>
        <div v-if="$slots.default || !!description" class="description">
          <slot>
            {{ description }}
          </slot>
        </div>
      </div>

      <hl-icon v-if="closable && !closeText" class="alert-close" @click="close">
        <system-close />
      </hl-icon>
      <div v-else class="alert-customed" @click="close">
        {{ closeText }}
      </div>
    </div>
  </transition>
</template>
<script lang='ts'>
import { defineComponent, computed, ref } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemSuccess, SystemInfo, SystemWarning, SystemError, SystemClose } from '@hongluan-ui/components/system-icon'
import { alertProps } from './alert'

export default defineComponent({
  name: 'Alert',
  components: {
    HlIcon,
    SystemSuccess,
    SystemInfo,
    SystemWarning,
    SystemError,
    SystemClose,
  },
  props: alertProps,
  emits: ['close'],
  setup(props, { emit }) {
    const visible = ref(true)

    const typeClass = computed(() => `${ props.type }`)
    const iconName = computed(() => props.type || 'info')

    const close = (evt: Event) => {
      visible.value = false
      emit('close', evt)
    }
    const { namespace } = useNamespace('alert')
    return {
      namespace,
      visible,
      typeClass,
      iconName,
      close,
    }
  },
})
</script>
