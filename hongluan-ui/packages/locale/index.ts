export { default as en } from './lang/en'
export { default as zhCn } from './lang/zh-cn'
export { default as zhTw } from './lang/zh-tw'

export type TranslatePair = {
  [key: string]: string | string[] | TranslatePair
}

export type Language = {
  name: string
  hl: TranslatePair
}
