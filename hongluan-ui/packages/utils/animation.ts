import { isClient } from '@vueuse/core'

export const cubic = (value: number): number => {
  return value ** 3
}

export const easeInOutCubic = (value: number): number =>
  value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2

export const transitionEndName: string = (function(){
  if (!isClient) return

  const body = document.body || document.documentElement, style = body.style
  const transEndEventNames = {
    transition       : 'transitionend',
    WebkitTransition : 'webkitTransitionEnd',
    MozTransition    : 'transitionend',
    OTransition      : 'oTransitionEnd otransitionend',
  }
  for(const name in transEndEventNames){
    if(typeof style[name] === 'string'){
      return transEndEventNames[name]
    }
  }
})()

export const animationEndName: string = (function(){
  if (!isClient) return

  const body = document.body || document.documentElement, style = body.style
  const animEndEventNames = {
    animation      : 'animationend',
    WebkitAnimation : 'webkitAnimationEnd',
  }
  for(const name in animEndEventNames){
    if(typeof style[name] === 'string'){
      return animEndEventNames[name]
    }
  }
})()

