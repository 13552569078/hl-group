import type { InjectionKey } from 'vue'

export interface AnchorContext {
  name: 'Anchor'
  currentLink: string
  addLink: (hash: string, node: HTMLElement) => void
  removeLink: () => void
  handleClick: (e: Event, hash?: string) => void
}

export const anchorInjectionKey: InjectionKey<AnchorContext> = Symbol('ArcoAnchor')
