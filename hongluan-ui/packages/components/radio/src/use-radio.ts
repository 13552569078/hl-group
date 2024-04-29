import { computed, inject, ref } from 'vue'
import { radioGroupKey } from '@hongluan-ui/tokens'
import { UPDATE_MODEL_EVENT } from '@hongluan-ui/constants'
import { useConsistentProp } from '@hongluan-ui/hooks'

import type { SetupContext } from 'vue'
import type { RadioEmits, RadioProps } from './radio'

export const useRadio = (
  props: {
    label: RadioProps['label']
    modelValue?: RadioProps['modelValue']
    type: RadioProps['type']
    custom: RadioProps['custom']
  },
  emit?: SetupContext<RadioEmits>['emit'],
) => {
  const radioRef = ref<HTMLInputElement>()
  const radioGroup = inject(radioGroupKey, undefined)
  const isGroup = computed(() => !!radioGroup)
  const modelValue = computed<RadioProps['modelValue']>({
    get() {
      return isGroup.value ? radioGroup!.modelValue : props.modelValue!
    },
    set(val) {
      if (isGroup.value) {
        radioGroup?.changeEvent(val)
      } else {
        emit && emit(UPDATE_MODEL_EVENT, val)
      }
      radioRef.value!.checked = props.modelValue === props.label
    },
  })

  const { size: tempRadioSize, disabled: tempRadioDisabled, fill: tempFill } = useConsistentProp()
  const radioSize = computed(() => {
    return isGroup.value ? radioGroup?.size || tempRadioSize.value : tempRadioSize.value
  })
  const radioFill = computed(() => {
    return isGroup.value ? radioGroup?.fill || tempFill.value : tempFill.value
  })
  const isDisabled = computed(() => {
    return isGroup.value ? radioGroup?.disabled || tempRadioDisabled.value : tempRadioDisabled.value
  })
  const radioType = computed(() => {
    return isGroup.value ? radioGroup?.type || props.type : props.type
  })
  const radioCustom = computed(() => {
    return isGroup.value ? radioGroup?.custom || props.custom : props.custom
  })
  const focus = ref(false)
  const tabIndex = computed(() => {
    return isDisabled.value || (isGroup.value && modelValue.value !== props.label)
      ? -1
      : 0
  })

  return {
    radioRef,
    isGroup,
    radioGroup,
    focus,
    radioSize,
    radioFill,
    isDisabled,
    radioType,
    radioCustom,
    tabIndex,
    modelValue,
  }
}
