<template>
  <div
    ref="iconRef"
    :class="[
      namespace,
      animation,
      status ? `is-finish ${status}` : '',
      definedSize && size ? size : '',
    ]"
    :style="style"
  >
    <div class="spinner-wrap">
      <slot>
        <system-loading />
      </slot>
    </div>
    <div class="show-result">
      <slot v-if="status === 'info'" name="info">
        <hl-icon>
          <system-info />
        </hl-icon>
      </slot>

      <slot v-else-if="status === 'success'" name="success">
        <hl-icon>
          <system-success />
        </hl-icon>
      </slot>

      <slot v-else-if="status === 'warning'" name="warning">
        <hl-icon>
          <system-warning />
        </hl-icon>
      </slot>

      <slot v-else-if="status === 'error' || !status" name="error">
        <hl-icon>
          <system-error />
        </hl-icon>
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'
import { isValidComponentSize } from '@hongluan-ui/utils'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemSuccess, SystemInfo, SystemWarning, SystemError, SystemLoading } from '@hongluan-ui/components/system-icon'

export default defineComponent({
  name: 'Spinner',
  components: {
    HlIcon,
    SystemSuccess,
    SystemInfo,
    SystemWarning,
    SystemError,
    SystemLoading,
  },
  props: {
    status: {
      type: String,
      default: '',
    },
    animation: {
      type: String,
      default: 'around-right',
    },
    duration: {
      type: String,
      default: '',
    },
    color: {
      type: String,
    },
    size: String,
  },
  setup(props) {
    const { namespace } = useNamespace('spinner')
    const definedSize = ref(false)
    const style = ref<any>({
      '--spinner-color': props.color,
      '--spinner-duration': props.duration,
    })

    if (isValidComponentSize(props.size)) {
      definedSize.value = true
    } else {
      Object.assign(style.value, { '--spinner-width': props.size, '--spinner-height': props.size })
    }
    return {
      namespace,
      style,
      definedSize,
    }
  },
})
</script>
