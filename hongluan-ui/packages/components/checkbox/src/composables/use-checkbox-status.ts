import { computed, inject, ref, toRaw } from 'vue'
import { isArray, isBoolean, isObject, isUndefined } from '@hongluan-ui/utils'
import { checkboxGroupContextKey } from '@hongluan-ui/tokens'
import { isEqual } from 'lodash-unified'

import type { ComponentInternalInstance } from 'vue'
import type { CheckboxProps } from '../checkbox'
import type { CheckboxModel } from '../composables'
import { useConsistentProp } from '@hongluan-ui/hooks'

export const useCheckboxStatus = (
  props: CheckboxProps,
  slots: ComponentInternalInstance['slots'],
  { model }: Pick<CheckboxModel, 'model'>,
) => {
  const checkboxGroup = inject(checkboxGroupContextKey, undefined)
  const isFocused = ref(false)
  const isGroup = computed(() => isUndefined(checkboxGroup) === false)
  const isChecked = computed<boolean>(() => {
    const value = model.value
    if (isBoolean(value)) {
      return value
    } else if (isArray(value)) {
      if (isObject(props.label)) {
        return value.map(toRaw).some(o => isEqual(o, props.label))
      } else {
        return value.map(toRaw).includes(props.label)
      }
    } else if (value !== null && value !== undefined) {
      return value === props.trueLabel
    } else {
      return !!value
    }
  })

  const isCustom = computed(() => isGroup.value ? checkboxGroup?.custom?.value || props.custom : props.custom)
  const isRound = computed(() => isGroup.value ? checkboxGroup?.round?.value || props.round : props.round)
  const isFill = computed(() => isGroup.value ? checkboxGroup?.fill?.value || props.fill : props.fill)
  const checkboxType = computed(() => isGroup.value ? checkboxGroup?.type?.value || props.type : props.type)
  const checkboxSize = computed(() => {
    const { size: temCheckboxSize } = useConsistentProp()
    return isGroup.value ? checkboxGroup?.size?.value || temCheckboxSize.value : temCheckboxSize.value
  })
  const hasOwnLabel = computed<boolean>(() => {
    return !!(slots.default || props.label)
  })

  return {
    isChecked,
    isFocused,
    isCustom,
    isRound,
    isFill,
    checkboxType,
    checkboxSize,
    hasOwnLabel,
  }
}

export type CheckboxStatus = ReturnType<typeof useCheckboxStatus>
