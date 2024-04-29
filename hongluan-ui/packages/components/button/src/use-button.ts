import { inject, ref } from 'vue'
import { useConsistentProp } from '@hongluan-ui/hooks'
import { formContextKey } from '@hongluan-ui/tokens'

import type { SetupContext } from 'vue'
import type { ButtonEmits, ButtonProps } from './button'

export const useButton = (
  props: ButtonProps,
  emit: SetupContext<ButtonEmits>['emit'],
) => {

  const _ref = ref<HTMLButtonElement>()
  const { size: buttonSize, disabled: buttonDisabled } = useConsistentProp()
  const form = inject(formContextKey, undefined)

  const handleClick = (evt: MouseEvent) => {
    if (props.nativeType === 'reset') {
      form?.resetFields()
    }
    emit('click', evt)
  }

  return {
    _ref,
    buttonDisabled,
    buttonSize,
    handleClick,
  }
}
