import { isFunction } from '../types'

import type { ComponentPublicInstance, Ref } from 'vue'

export type RefSetter = (
  el: Element | ComponentPublicInstance | undefined
) => void

export const composeRefs = (
  ...refs: (Ref<HTMLElement | undefined | null> | RefSetter)[]
) => {
  return (el: Element | ComponentPublicInstance | null) => {
    refs.forEach(ref => {
      if (isFunction(ref)) {
        ref(el as Element | ComponentPublicInstance)
      } else {
        ref.value = el as HTMLElement | undefined | null
      }
    })
  }
}

/**
 * Generate function for attach ref for the h renderer
 * @param ref Ref<HTMLElement | ComponentPublicInstance>
 * @returns (val: T) => void
 */
export const refAttacher =
 <T extends (HTMLElement | ComponentPublicInstance)>(ref: Ref<T>) => {
   return (val: T) => {
     ref.value = val
   }
 }
