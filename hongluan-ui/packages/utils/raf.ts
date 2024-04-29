import { isClient } from '@vueuse/core'

export const rAF = (fn: () => void) =>
  isClient
    ? window.requestAnimationFrame(fn)
    : (setTimeout(fn, 16) as unknown as number)

export const cAF = (handle: number) =>
  isClient ? window.cancelAnimationFrame(handle) : clearTimeout(handle)

export const throttleByRaf = (cb: (...args: any[]) => void) => {
  let timer = 0

  const throttle = (...args: any[]): void => {
    if (timer) {
      cAF(timer)
    }
    timer = rAF(() => {
      cb(...args)
      timer = 0
    })
  }

  throttle.cancel = () => {
    cAF(timer)
    timer = 0
  }

  return throttle
}
