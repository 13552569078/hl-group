<template>
  <button
    ref="_ref"
    :class="[
      namespace,
      type ? type : '',
      buttonSize ? buttonSize : '',
      iconPosition ? 'icon-' + iconPosition : '',
      effect ? effect : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'equal': equal,
        'round': round,
        'block': block,
        'no-fill': noFill,
        'rational': rational,
      }
    ]"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    @click="handleClick"
  >
    <template v-if="loading">
      <slot v-if="$slots.loading" name="loading"></slot>
      <spinner v-else />
    </template>
    <slot v-if="$slots.icon && !loading" name="icon"></slot>
    <span v-if="$slots.default && (loading || $slots.icon)">
      <slot></slot>
    </span>
    <slot v-else></slot>
  </button>
</template>

<script lang='ts' setup>
import { useNamespace } from '@hongluan-ui/hooks'
import Spinner from '@hongluan-ui/components/spinner'
import { useButton } from './use-button'
import { buttonEmits, buttonProps } from './button'

defineOptions({
  name: 'Button',
})

const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)

const { namespace } = useNamespace('button')
const { _ref, buttonDisabled, buttonSize, handleClick } = useButton(props, emit)

defineExpose({
  /** @description button html element */
  ref: _ref,
  /** @description button size */
  size: buttonSize,
  /** @description button disabled */
  disabled: buttonDisabled,
})
</script>
