
import type { ComputedRef, Ref, ExtractPropTypes, InjectionKey, PropType } from 'vue'
import type { Indexable } from '@hongluan-ui/utils'
import type { PopperEffect, Placement } from '@hongluan-ui/components/popper'
import type SimpleTable from './simple-table.vue'
import type VirtualTable from './virtual-table.vue'

export interface ColumnType {
  id: string
  title: string
  prop: string
  columnKey?: string
  tooltipProps: Indexable<any>
  align: 'left' | 'right' | 'center'
  width: string
  minWidth: string
  maxWidth: string
  fixed: string | { position: 'left' | 'right'; distance: string; }
  slotName: string
  headerSlotName: string
  filter: {
    slotName: string
    placement: Placement
    popperClass: string
    effect: PopperEffect
    trigger: 'hover' | 'click' | 'all'
  }
  showTooltip: boolean
  expand: {
    slotName: string
    hideLabel: boolean
  }
  formatter: (row: unknown, column: ColumnType, cellValue: unknown, rowIndex: number, columnIndex: number) => any
  sortable: boolean | 'descending' | 'ascending'
  $show$?: boolean // 配合列选择工具，参考业务组件
  level?: number
  colSpan?: number
  rowSpan?: number
  children?: Array<ColumnType>
}
export type RealCols = { headerRows: Array<ColumnType[]>; realCols: ColumnType[]; }

export type RowClassFunction = ({ row, rowIndex }: { row: unknown; rowIndex: number; }) => string
export type RowStyleFunction = ({ row, rowIndex }: { row: unknown; rowIndex: number; }) => Indexable<any>
export type CellClassFunction = ({ row, column, rowIndex, columnIndex }: { row: unknown; column: ColumnType; rowIndex: number; columnIndex: number; }) => string
export type CellStyleFunction = ({ row, column, rowIndex, columnIndex }: { row: unknown; column: ColumnType; rowIndex: number; columnIndex: number; }) => Indexable<any>
export type SpanFunction = ({ row, column, rowIndex, columnIndex }: { row: unknown; column: ColumnType; rowIndex: number; columnIndex: number; }) => [number, number] | { rowspan: number; colspan: number; }
export type ResizeOption = { min?: number; max?: number; }
export type TreeProps = { children: string; hasChildren: string; }
export type GetRowKey = (row: unknown) => string
export type LoadFunction = (row: unknown, node: { level: number; }, resolve: (children: unknown[]) => void) => Promise<unknown[]>
export type ScrollContainer = string | HTMLElement

export const simpleTableProps = {
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  border: {
    type: String,
    default: '',
  },
  size: String,
  hover: Boolean,
  list: Boolean,
  autoHeight: Boolean,
  tableFixed: Boolean,
  stripe: [Boolean, String],
  padding: String,
  cellPadding: String,
  gap: String,
  gapX: String,
  gapY: String,
  showHeader: {
    type: Boolean,
    default: true,
  },
  data: {
    type: Array as PropType<any[]>,
  },
  cols: {
    type: Array as PropType<ColumnType[]>,
    default: () => [],
  },
  rowKey: {
    type: [String, Function] as PropType<string | ((row: unknown) => string)>,
    default: 'id',
  },
  expandRowKeys: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  defaultExpandAll: {
    type: Boolean,
    default: false,
  },
  rowClassName: {
    type: [String, Function] as PropType<string | RowClassFunction>,
    default: '',
  },
  rowStyle: {
    type: [Object, Function] as PropType<Indexable<any> | RowStyleFunction>,
    default: () => ({}),
  },
  cellClassName: {
    type: [String, Function] as PropType<string | CellClassFunction>,
    default: '',
  },
  cellStyle: {
    type: [Object, Function] as PropType<Indexable<any> | CellStyleFunction>,
    default: () => ({}),
  },
  headerRowClassName: {
    type: [String, Function] as PropType<string | RowClassFunction>,
    default: '',
  },
  headerRowStyle: {
    type: [Object, Function] as PropType<Indexable<any> | RowStyleFunction>,
    default: () => ({}),
  },
  headerCellClassName: {
    type: [String, Function] as PropType<string | CellClassFunction>,
    default: '',
  },
  headerCellStyle: {
    type: [Object, Function] as PropType<Indexable<any> | CellStyleFunction>,
    default: () => ({}),
  },
  spanMethod: Function as PropType<SpanFunction>,
  highlightCurrentRow: Boolean,
  resize: {
    type: [Boolean, Object] as PropType<boolean | ResizeOption>,
    default: false,
  },
  firstColumnIndex: {
    type: Number,
    default: 0,
  },
  treeProps: {
    type: Object as PropType<TreeProps>,
    default: () => ({ children: 'children', hasChildren: 'hasChildren' }),
  },
  load: Function as PropType<LoadFunction>,
  scrollContainer: {
    type: [String, Object] as PropType<ScrollContainer>,
  },
}

export type SimpleTableProps = ExtractPropTypes<typeof simpleTableProps>
export type SimpleTableInstance = InstanceType<typeof SimpleTable>

export type SimpleTableContext = {
  rowClassName: Ref<string | RowClassFunction>
  rowStyle: Ref<Indexable<any>>
  cellClassName: Ref<string | CellClassFunction>
  cellStyle: Ref<Indexable<any>>
  firstColumnIndex: Ref<number>
  load: LoadFunction
  getSpan: (args: any) => any
  currentSelectedRow: Ref<unknown>
  slotNames: ComputedRef<string[]>
  expandSlotNames: ComputedRef<string[]>
  realColsInfo: ComputedRef<RealCols>
  getRowKey: GetRowKey
  toggleExpandRow: (row: unknown, slotName: string) => void
  expandedKeyExisted: (row: unknown, slotName: string) => boolean
  isShowTooltipMap: Ref<Indexable<boolean>>
  tdMouseover: (e: Event, rowIndex: number, colIndex: number) => void
  tdMouseleave: () => void
  tableTreeMap: Ref<Indexable<Indexable<any>>>
  hasChildren: (row: unknown) => boolean
  hasTreeData: ComputedRef<boolean>
  toggleExpandTree: (row: unknown) => void
  isShowCol: (col: ColumnType) => boolean
  getColFixed: (col: ColumnType) => { position: string; distance: string | number; hasShadow: boolean; }
}
export const simpleTableContextKey: InjectionKey<SimpleTableContext> = Symbol('simpleTableContextKey')

export const virtualTableProps = {
  ...simpleTableProps,
  height: {
    type: [Number, String],
    default: 300,
  },
  itemSize: {
    type: Number,
    default: 48,
  },
  total: Number,
  scrollbarAlwaysOn: {
    type: Boolean,
    default: false,
  },
  cache: {
    type: Number,
    default: 2,
  },
}
export type VirtualTableProps = ExtractPropTypes<typeof virtualTableProps>
export type VirtualTableInstance = InstanceType<typeof VirtualTable>

export type VirtualTableContext = {
  isShowCol: (col: ColumnType) => boolean
  getColFixed: (col: ColumnType) => { position: string; distance: string | number; }
}
