import { computed, getCurrentInstance } from 'vue'
import { memoize as memo } from 'lodash-unified'
import memoOne from 'memoize-one'

import type { ComputedRef } from 'vue'
import type { VirtualizedProps } from '../props'

export const useCache: () => ComputedRef<any> = () => {
  const vm = getCurrentInstance()!

  const props = vm.proxy!.$props as VirtualizedProps

  return computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _getItemStyleCache = (_: any, __: any, ___: any) => ({})
    return props.perfMode
      ? memo(_getItemStyleCache)
      : memoOne(_getItemStyleCache)
  })
}
