import { COMPONENT_SIZES, datePickTypes } from '@hongluan-ui/constants'
import type { DatePickType } from '@hongluan-ui/constants'

export const isValidComponentSize = (val: string) => {
  return [...COMPONENT_SIZES, null, undefined, ''].includes(val)
}

// 由于类型可扩展，防止控制台报警告信息，去掉类型校验
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const isValidComponentType = (val: string) => {
  return true
  // return [...COMPONENT_TYPES, null, undefined, ''].includes(val)
}

export const isValidComponentState = (val: string) =>
  ['success', 'loading', 'fail'].includes(val)

export const isValidDatePickType = (val: string): val is DatePickType =>
  ([...datePickTypes] as string[]).includes(val)
