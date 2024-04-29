<template>
  <label
    :class="[{
      [namespace]: true,
      'is-radio': true,
      'is-disabled': isDisabled,
      'is-focus': focus,
      'is-checked': modelValue === label,
      'fill': radioFill,
      'custom': radioCustom,
      [radioType]: !!radioType,
      [radioSize]: !!radioSize,
      'show-label': showLabel,
    }]"
  >
    <input
      ref="radioRef"
      v-model="modelValue"
      class="radio-input"
      :value="label"
      type="radio"
      :name="name || radioGroup?.name"
      :disabled="isDisabled"
      @focus="focus = true"
      @blur="focus = false"
      @change="handleChange"
    >
    <em v-if="!radioCustom" class="radio-inner"></em>
    <slot v-if="radioCustom"></slot>
    <span v-else-if="showLabel && ($slots.default || label)" class="radio-label" @keydown.stop>
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'
import { radioEmits, radioProps } from './radio'
import { useRadio } from './use-radio'

export default defineComponent({
  name: 'Radio',
  props: radioProps,
  emits: radioEmits,

  setup(props, { emit }) {
    const { namespace } = useNamespace('radio')

    const {
      radioRef,
      radioGroup,
      isGroup,
      focus,
      radioSize,
      radioFill,
      isDisabled,
      radioType,
      radioCustom,
      tabIndex,
      modelValue,
    } = useRadio(props, emit)

    function handleChange() {
      // eslint-disable-next-line vue/require-explicit-emits
      nextTick(() => emit('change', modelValue.value))
    }

    return {
      namespace,
      focus,
      isGroup,
      radioGroup,
      modelValue,
      tabIndex,
      radioSize,
      radioFill,
      isDisabled,
      radioType,
      radioCustom,
      radioRef,
      handleChange,
    }
  },
})
</script>
