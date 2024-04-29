<template>
  <transition name="fade">
    <div
      v-if="visible"
      :style="backTopStyle"
      :class="namespace"
      @click.stop="handleClick"
    >
      <slot>
        <hl-icon name="chevronsTop" :opacity="0">
          <system-arrow-up />
        </hl-icon>
      </slot>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemArrowUp } from '@hongluan-ui/components/system-icon'
import { useNamespace } from '@hongluan-ui/hooks'
import { backtopEmits, backtopProps } from './backtop'
import { useBackTop } from './use-backtop'

const COMPONENT_NAME = 'Backtop'

defineOptions({
  name: COMPONENT_NAME,
})

const props = defineProps(backtopProps)
const emit = defineEmits(backtopEmits)

const { namespace } = useNamespace('backtop')

const { handleClick, visible } = useBackTop(props, emit, COMPONENT_NAME)

const backTopStyle = computed(() => ({
  right: `${props.right}px`,
  bottom: `${props.bottom}px`,
}))
</script>
