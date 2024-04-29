import type { InjectionKey, Ref } from 'vue'

import type { CarouselItemProps } from '@hongluan-ui/components/carousel'

export type CarouselItemStates = {
  hover: boolean
  translate: number
  scale: number
  active: boolean
  ready: boolean
  inStage: boolean
  animating: boolean
}

export type CarouselItemContext = {
  props: CarouselItemProps
  states: CarouselItemStates
  uid: number
  translateItem: (index: number, activeIndex: number, oldIndex?: number, distance?: number, isAnimating?: boolean,) => void
}

export type CarouselContext = {
  root: Ref<HTMLElement | undefined>
  direction: string
  type: string
  showMultiple: Ref<boolean>
  itemsWidth: string | number
  itemsWidthUnit: string
  items: Ref<CarouselItemContext[]>
  // isCardType: Ref<boolean>
  // isVertical: Ref<boolean>
  loop: boolean
  addItem: (item: CarouselItemContext) => void
  removeItem: (uid: number) => void
  setActiveItem: (index: number) => void
}

export type CarouselIndicatorContext = {
  activeIndex: Ref<number>
  handleIndicatorClick: (index: number) => void
  throttledIndicatorHover: (index: number) => void
}

export const carouselContextKey: InjectionKey<CarouselContext> = Symbol('carouselContextKey')
export const carouselIndicatorContextKey: InjectionKey<CarouselIndicatorContext> = Symbol('carouselIndicatorContextKey')
