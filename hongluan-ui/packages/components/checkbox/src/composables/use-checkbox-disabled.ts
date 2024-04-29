import { computed, inject } from 'vue'
import { useConsistentProp } from '@hongluan-ui/hooks'
import { isUndefined } from '@hongluan-ui/utils'
import { checkboxGroupContextKey } from '@hongluan-ui/tokens'

import type { CheckboxModel, CheckboxStatus } from '../composables'

export const useCheckboxDisabled = ({
  model,
  isChecked,
}: Pick<CheckboxModel, 'model'> & Pick<CheckboxStatus, 'isChecked'>) => {
  const checkboxGroup = inject(checkboxGroupContextKey, undefined)
  const isGroup = computed(() => isUndefined(checkboxGroup) === false)

  const isLimitDisabled = computed(() => {
    const max = checkboxGroup?.max?.value!
    const min = checkboxGroup?.min?.value!
    return (
      (!isUndefined(max) && model.value.length >= max && !isChecked.value) ||
      (!isUndefined(min) && model.value.length <= min && isChecked.value)
    )
  })

  const isDisabled = computed(() => {
    const { disabled } = useConsistentProp()
    return (isGroup.value ? checkboxGroup?.disabled.value || disabled.value || isLimitDisabled.value : disabled.value) ?? false
  })

  return {
    isDisabled,
    isLimitDisabled,
  }
}

export type CheckboxDisabled = ReturnType<typeof useCheckboxDisabled>
