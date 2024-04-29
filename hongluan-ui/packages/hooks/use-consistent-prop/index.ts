import { computed, getCurrentInstance, inject } from 'vue'
import { formItemContextKey, formContextKey } from '@hongluan-ui/tokens'
import { useGlobalConfig } from '../use-global-config'

import type { FormContext, FormItemContext } from '@hongluan-ui/tokens'
import type { ComponentSize, ComponentType } from '@hongluan-ui/constants'

export interface IConsistentProp {
  size?: ComponentSize
  disabled?: boolean
  type?: ComponentType
  fill?: boolean
}
/**
 * Searching order:
 * 1) component self prop value;
 * 2) Group component prop value;
 * 3) FormItem/Form component prop value;
 * 4) ConfigProvider props
 * @returns \{ size, disabled, type, fill \}
 */
function useConsistentProp() {
  const { proxy } = getCurrentInstance()!

  const $props = proxy!.$props as IConsistentProp
  const $parentProps = proxy!.$parent!.$props as IConsistentProp
  const $parentOpts = proxy!.$parent!.$options

  const formItem = inject(formItemContextKey, {} as FormItemContext)
  const form = inject(formContextKey, {} as FormContext)

  const size = computed<ComponentSize>(() => {
    const configProviderSize = useGlobalConfig('size')
    return $props.size
      || $parentOpts.name === 'Group' && $parentProps.size
      || formItem?.size
      || configProviderSize.value
  })

  const disabled = computed(() => {
    return $props.disabled
      || $parentOpts.name === 'Group' && $parentProps.disabled
      || form?.disabled
      || false
  })

  const type = computed(() => {
    return $props.type
      || $parentOpts.name === 'Group' && $parentProps.type
  })

  const fill = computed(() => {
    return $props.fill
      || form?.fill
      || $parentOpts.name === 'Group' && $parentProps.fill
      || false
  })

  return {
    size,
    disabled,
    type,
    fill,
  }
}

export { useConsistentProp }
