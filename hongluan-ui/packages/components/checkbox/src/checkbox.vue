<template>
  <component
    :is="!hasOwnLabel && isLabeledByFormItem ? 'span' : 'label'"
    :class="[
      namespace,
      checkboxType || '',
      checkboxSize || '',
      { 'round': isRound },
      { 'fill': isFill },
      { 'is-disabled': isDisabled },
      { 'is-checked': isChecked },
      { 'is-indeterminate': indeterminate },
      { 'is-focus': isFocused },
      { 'custom': isCustom },
      { 'show-label': showLabel },
    ]"
    :aria-controls="indeterminate ? controls : null"
    :tabindex="indeterminate ? 0 : undefined"
    :role="indeterminate ? 'checkbox' : undefined"
    :aria-checked="indeterminate ? 'mixed' : undefined"
    @click="onClickRoot"
  >
    <input
      v-if="trueLabel || falseLabel"
      :id="inputId"
      v-model="model"
      class="checkbox-input"
      type="checkbox"
      :aria-hidden="indeterminate ? 'true' : 'false'"
      :name="name"
      :tabindex="tabindex"
      :disabled="isDisabled"
      :true-value="trueLabel"
      :false-value="falseLabel"
      @change="handleChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
    >
    <input
      v-else
      :id="inputId"
      v-model="model"
      class="checkbox-input"
      type="checkbox"
      :aria-hidden="indeterminate ? 'true' : 'false'"
      :disabled="isDisabled"
      :value="label"
      :name="name"
      :tabindex="tabindex"
      @change="handleChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
    >
    <em v-if="!isCustom" class="checkbox-inner">
      <hl-icon v-if="indeterminate" class="icon-indeterminate">
        <system-indeterminate v-if="indeterminate" />
      </hl-icon>
      <hl-icon v-else class="icon-checked">
        <system-checked />
      </hl-icon>
    </em>
    <slot v-if="isCustom"></slot>
    <span v-else-if="hasOwnLabel && showLabel" class="checkbox-label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </component>
</template>

<script lang='ts' setup>
import { useSlots } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemChecked, SystemIndeterminate } from '@hongluan-ui/components/system-icon'
import { checkboxEmits, checkboxProps } from './checkbox'
import { useCheckbox } from './composables'

defineOptions({
  name: 'Checkbox',
})

const props = defineProps(checkboxProps)
defineEmits(checkboxEmits)

const slots = useSlots()
const { namespace } = useNamespace('checkbox')
const {
  inputId,
  isLabeledByFormItem,
  isChecked,
  isDisabled,
  isFocused,
  isCustom,
  isRound,
  isFill,
  checkboxType,
  checkboxSize,
  hasOwnLabel,
  model,
  handleChange,
  onClickRoot,
} = useCheckbox(props, slots)
</script>
