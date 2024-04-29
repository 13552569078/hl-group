import type { Indexable } from 'fx-front-utils'

export interface IPageDetaiCol {
  label?: string
  key?: string
  slot?: string
}
export interface IPageimageOpt {
  show?: boolean
  title?: string
  list?: string[]
}

export interface PageDetailOption {
  title?: string
  cols: IPageDetaiCol[]
  imageOpt?: IPageimageOpt
  data: Indexable<any>
}
