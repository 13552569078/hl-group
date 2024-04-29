import type { ComponentSize } from '@hongluan-ui/constants'
import type { InjectionKey, ComputedRef, WritableComputedRef } from 'vue'

export interface PaginationContext {
  currentPage?: WritableComputedRef<number>
  pageCount?: ComputedRef<number>
  disabled?: ComputedRef<boolean>
  size?: ComputedRef<ComponentSize>
  changeEvent?: (val: number) => void
  handleSizeChange?: (val: number) => void
}

export const paginationKey: InjectionKey<PaginationContext> =
  Symbol('PaginationKey')
