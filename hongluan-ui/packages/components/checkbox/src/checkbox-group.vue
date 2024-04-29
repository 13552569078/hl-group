<template>
  <hl-group
    :id="groupId"
    :class="[namespace]"
    :dir="dir"
    :merge="merge"
    :indent="indent"
    :gap="gap"
    :gap-x="gapX"
    :gap-y="gapY"
    :full="full"
    :wrap="wrap"
    :align="align"
    :block="block"
    role="group"
    :aria-label="!isLabeledByFormItem ? label || 'checkbox-group': undefined"
    :aria-labelledby="isLabeledByFormItem ? formItem?.labelId : undefined"
  >
    <slot></slot>
  </hl-group>
</template>

<script lang="ts" setup>
import { computed, watch, provide, nextTick, toRefs } from 'vue'
import { pick } from 'lodash-unified'
import { UPDATE_MODEL_EVENT } from '@hongluan-ui/constants'
import { FormItemEvents } from '@hongluan-ui/tokens'
import { useConsistentProp, useNamespace, useFormItem, useFormItemInputId } from '@hongluan-ui/hooks'
import { HlGroup } from '@hongluan-ui/components/group'
import { debugWarn } from '@hongluan-ui/utils'
import { checkboxGroupContextKey } from '@hongluan-ui/tokens'
import { checkboxGroupEmits, checkboxGroupProps } from './checkbox-group'

import type { CheckboxGroupValueType } from './checkbox-group'

defineOptions({
  name: 'CheckboxGroup',
})
const props = defineProps(checkboxGroupProps)
const emit = defineEmits(checkboxGroupEmits)

const { formItem } = useFormItem()
const { inputId: groupId, isLabeledByFormItem } = useFormItemInputId(props, {
  formItemContext: formItem,
})

const { size: checkboxGroupSize, disabled: checkboxGroupDisabled, fill: checkboxGroupFill } = useConsistentProp()

const changeEvent = async (value: CheckboxGroupValueType) => {
  emit(UPDATE_MODEL_EVENT, value)
  await nextTick()
  emit('change', value)
}

const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(val: CheckboxGroupValueType) {
    changeEvent(val)
  },
})

provide(checkboxGroupContextKey, {
  ...pick(toRefs(props), [
    'min',
    'max',
    'validateEvent',
    'round',
    'type',
    'custom',
  ]),
  size: checkboxGroupSize,
  disabled: checkboxGroupDisabled,
  fill: checkboxGroupFill,
  modelValue,
  changeEvent,
})

watch(() => props.modelValue, () => {
  if (props.validateEvent) {
    formItem?.validate?.(FormItemEvents.change).catch(err => debugWarn(err))
  }
})

const { namespace } = useNamespace('checkbox-group')

</script>
