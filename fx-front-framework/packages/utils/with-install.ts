import { PREFIX } from './constants'

import type { SFCWithInstall } from './types'

export const withInstall = <T, E extends Record<string, any>>(
  main: T,
  extra?: E,
) => {
  (main as SFCWithInstall<T>).install = (app): void => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(PREFIX + comp.name, comp)
    }
  }

  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      (main as any)[key] = comp
    }
  }
  return main as SFCWithInstall<T> & E
}


export const withInstallFunction = <T>(fn: T, name: string) => {
  (fn as SFCWithInstall<T>).install = app => {
    app.config.globalProperties[name] = fn
  }

  return fn as SFCWithInstall<T>
}

export const withNoopInstall = <T>(component: T) => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  (component as SFCWithInstall<T>).install = () => {}

  return component as SFCWithInstall<T>
}

