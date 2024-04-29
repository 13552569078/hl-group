import type { PropType } from 'vue'
import type { Store } from '../store'
import type { ColumnCls, ColumnStyle, DefaultRow, Table } from '../table/defaults'

interface TableBodyProps<T> {
  store: Store<T>
  stripe?: string | boolean
  context: Table<T>
  rowClassName: ColumnCls<T>
  rowStyle: ColumnStyle<T>
  fixed: string
  highlight: boolean
  tooltipEffect: string
}

const defaultProps = {
  store: {
    required: true,
    type: Object as PropType<TableBodyProps<DefaultRow>['store']>,
  },
  stripe: [String, Boolean],
  tooltipEffect: String,
  context: {
    default: () => ({}),
    type: Object as PropType<TableBodyProps<DefaultRow>['context']>,
  },
  rowClassName: [String, Function] as PropType<TableBodyProps<DefaultRow>['rowClassName']>,
  rowStyle: [Object, Function] as PropType<TableBodyProps<DefaultRow>['rowStyle']>,
  fixed: {
    type: String,
    default: '',
  },
  highlight: Boolean,
}

export type { TableBodyProps }
export default defaultProps
