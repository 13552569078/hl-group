import { buildProp } from '@hongluan-ui/utils'
import { LTR, RTL, VERTICAL } from './defaults'

import type { ExtractPropTypes, PropType } from 'vue'
import type { Indexable, StyleValue } from '@hongluan-ui/utils'
import type { Direction, LayoutDirection, ItemSize, GridItemKeyGetter } from './types'

const itemSize = {
  type: [Number, Function] as PropType<number | ItemSize>,
  required: true,
}

const estimatedItemSize = {
  type: [Number] as PropType<number>,
}

const cache = {
  type: Number as PropType<number>,
  default: 2,
}

const direction = {
  type: String as PropType<Direction>,
  default: 'ltr',
  validator: (val: Direction) => {
    return val === LTR || val === RTL
  },
}

const initScrollOffset = {
  type: Number,
  default: 0,
}

const total = buildProp({
  type: Number,
  required: true,
})

const layout = {
  type: String as PropType<LayoutDirection>,
  default: VERTICAL,
}

export const virtualizedProps = {
  className: {
    type: [String, Object, Array],
    default: '',
  },

  containerElement: {
    type: [String, Object],
    default: 'div',
  },
  containerProps: {
    type: Object as PropType<Indexable<any>>,
    default: () => ({}),
  },

  data: {
    type: [Array] as PropType<any[]>,
    default: () => [],
  },

  /**
   * @description controls the horizontal direction.
   */
  direction,

  height: buildProp({
    type: [String, Number],
    required: true,
  }),

  innerElement: {
    type: [String, Object],
    default: 'div',
  },
  innerElementProps: {
    type: Object as PropType<Indexable<any>>,
    default: () => ({}),
  },

  style: {
    type: [Object, String, Array] as PropType<StyleValue>,
  },

  useIsScrolling: {
    type: Boolean,
    default: false,
  },

  width: buildProp({
    type: [Number, String],
    required: false,
  }),
  perfMode: {
    type: Boolean,
    default: true,
  },
  scrollbarAlwaysOn: {
    type: Boolean,
    default: false,
  },
}

export const virtualizedListProps = {
  /**
   * @description describes how many items should be pre rendered to the head
   * and the tail of the window
   */
  cache,

  estimatedItemSize,

  /**
   * @description controls the list's orientation
   */
  layout,

  initScrollOffset,

  /**
   * @description describes the total number of the list.
   */
  total,

  itemSize,
  ...virtualizedProps,
}

const scrollbarSize = {
  type: Number,
  default: 6,
} as const

const startGap = { type: Number, default: 0 } as const
const endGap = { type: Number, default: 2 } as const

export const virtualizedGridProps = {
  columnCache: cache,
  columnWidth: itemSize,
  estimatedColumnWidth: estimatedItemSize,
  estimatedRowHeight: estimatedItemSize,
  initScrollLeft: initScrollOffset,
  initScrollTop: initScrollOffset,
  itemKey: {
    type: Function as PropType<GridItemKeyGetter>,
    default: ({
      columnIndex,
      rowIndex,
    }: {
      columnIndex: number
      rowIndex: number
    }) => `${rowIndex}:${columnIndex}`,
  },
  rowCache: cache,
  rowHeight: itemSize,
  totalColumn: total,
  totalRow: total,
  hScrollbarSize: scrollbarSize,
  vScrollbarSize: scrollbarSize,
  scrollbarStartGap: startGap,
  scrollbarEndGap: endGap,
  ...virtualizedProps,
}

export const virtualizedScrollbarProps = {
  alwaysOn: Boolean,
  class: String,
  layout,
  total,
  ratio: {
    type: Number,
    required: true,
  },
  clientSize: {
    type: Number,
    required: true,
  },
  scrollFrom: {
    type: Number,
    required: true,
  },
  scrollbarSize,
  startGap,
  endGap,
  visible: Boolean,
}

export type VirtualizedProps = ExtractPropTypes<typeof virtualizedProps>
export type VirtualizedListProps = ExtractPropTypes<typeof virtualizedListProps>
export type VirtualizedGridProps = ExtractPropTypes<typeof virtualizedGridProps>

export type VirtualizedScrollbarProps = ExtractPropTypes<
  typeof virtualizedScrollbarProps
>
