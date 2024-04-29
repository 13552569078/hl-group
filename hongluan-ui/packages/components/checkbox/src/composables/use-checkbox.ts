import { useFormItem, useFormItemInputId } from '@hongluan-ui/hooks'
import { isArray } from '@hongluan-ui/utils'
import { useCheckboxDisabled } from './use-checkbox-disabled'
import { useCheckboxEvent } from './use-checkbox-event'
import { useCheckboxModel } from './use-checkbox-model'
import { useCheckboxStatus } from './use-checkbox-status'

import type { ComponentInternalInstance } from 'vue'
import type { CheckboxProps } from '../checkbox'
import type { CheckboxModel } from './use-checkbox-model'

const setStoreValue = (
  props: CheckboxProps,
  { model }: Pick<CheckboxModel, 'model'>,
) => {
  function addToStore() {
    if (isArray(model.value) && !model.value.includes(props.label)) {
      model.value.push(props.label)
    } else {
      model.value = props.trueLabel || true
    }
  }
  props.checked && addToStore()
}

export const useCheckbox = (
  props: CheckboxProps,
  slots: ComponentInternalInstance['slots'],
) => {
  const { formItem } = useFormItem()
  const { model, isGroup, isLimitExceeded } = useCheckboxModel(props)
  const {
    isFocused,
    isCustom,
    isRound,
    isFill,
    checkboxType,
    isChecked,
    checkboxSize,
    hasOwnLabel,
  } = useCheckboxStatus(props, slots, { model })
  const { isDisabled } = useCheckboxDisabled({ model, isChecked })
  const { inputId, isLabeledByFormItem } = useFormItemInputId(props, {
    formItemContext: formItem,
    disableIdGeneration: hasOwnLabel,
    disableIdManagement: isGroup,
  })
  const { handleChange, onClickRoot } = useCheckboxEvent(props, {
    model,
    isLimitExceeded,
    hasOwnLabel,
    isDisabled,
    isLabeledByFormItem,
  })

  setStoreValue(props, { model })

  return {
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
  }
}
