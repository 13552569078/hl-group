import type { CSSProperties } from 'vue'

export const mutable = <T extends readonly any[] | Record<string, unknown>>(
  val: T,
) => val as Mutable<typeof val>
export type Mutable<T> = { -readonly [P in keyof T]: T[P] }

export type HTMLElementCustomized<T> = HTMLElement & T

/**
 * @deprecated stop to use null
 * @see {@link https://github.com/sindresorhus/meta/discussions/7}
 */
export type Nullable<T> = T | null

export type ExtractType<O, T> = { [K in keyof O]: O[K] extends T ? O[K] : unknown }

// 组合两个 object 的类型
export type Diff<T extends string, U> = ({ [P in T]: P } &
{ [P in keyof U]: U[P] extends string ? string : never } & {
  [x: string]: never
})[T]

// 这里我们只以 string 类型的key作为示例
export type ExtractStringKey<A> = Diff<Extract<keyof A, string>, ExtractType<A, string>>

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

export type RefElement = Nullable<HTMLElement>

export type Indexable<T> = {
  [key: string]: T
}

export type Hash<T> = Indexable<T>

export type TimeoutHandle = number

export type StyleValue = string | CSSProperties | Array<StyleValue>

export type Arrayable<T> = T | T[]

export type Awaitable<T> = Promise<T> | T
