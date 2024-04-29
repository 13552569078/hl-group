
export interface AnyObject {
	[key: string]: any
}

export interface ApiResult<T = any> {
	code: number
	data: T
}

type OptionalKeys<T extends Record<string, unknown>> = {
  [K in keyof T]: T extends Record<K, T[K]>
    ? never
    : K
}[keyof T]

type RequiredKeys<T extends Record<string, unknown>> = Exclude<keyof T, OptionalKeys<T>>

type MonoArgEmitter<T, Keys extends keyof T> = <K extends Keys>(evt: K, arg?: T[K]) => void

type BiArgEmitter<T, Keys extends keyof T> = <K extends Keys>(evt: K, arg: T[K]) => void

export type EventEmitter<T extends Record<string, unknown>> =
  MonoArgEmitter<T, OptionalKeys<T>> & BiArgEmitter<T, RequiredKeys<T>>

export type AnyFunction<T> = (...args: any[]) => T

export type PartialReturnType<T extends (...args: unknown[]) => unknown> = Partial<ReturnType<T>>

export type RefElement = HTMLElement | null

export type Nullable<T> = null | T

export type CustomizedHTMLElement<T> = HTMLElement & T

export type Indexable<T> = {
  [key: string]: T
}

export type Hash<T> = Indexable<T>

export type TimeoutHandle = ReturnType<typeof global.setTimeout>

declare global {
  interface tinymce {
    addI18n: (name: string, obj: any) => void
  }
}
