import type { InjectionKey, Ref } from 'vue'

export interface LayoutContext {
  autoMenuCollapse: Ref<boolean>
  setMenuCollapse: (result: boolean) => void
}

export const layoutKey: InjectionKey<LayoutContext> = Symbol('layoutKey')
