import type { InjectionKey, Ref } from 'vue'

export type DialogContext = {
  dialogRef: Ref<HTMLElement | null>
  headerRef: Ref<HTMLElement | null>
  bodyId: Ref<string>
  handleClose: () => void
  onModalClick: () => void
  visible: Ref<boolean>
  zIndex: Ref<number>
  panelStyle: string[]
  panelClass: Record<string, unknown>
  panelHeaderClass: Record<string, unknown> | string
  panelBodyClass: Record<string, unknown> | string
  panelFooterClass: Record<string, unknown> | string
}

export const dialogInjectionKey: InjectionKey<DialogContext> =
  Symbol('dialogInjectionKey')
