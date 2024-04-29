import { getProp } from '@hongluan-ui/utils'
import HlCheckbox from '@hongluan-ui/components/checkbox'
import HlSpinner from '@hongluan-ui/components/spinner'
import { h } from 'vue'
import type { TableColumnCtx } from './table-column/defaults'
import type { Store } from './store/index'
import type { TreeNode } from './table/defaults'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemArrowRight } from '@hongluan-ui/components/system-icon'

export const cellStarts = {
  default: {
    order: '',
  },
  selection: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: '',
    className: 'table-column-selection',
  },
  expand: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: '',
  },
  index: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: '',
  },
}

// 这些选项不应该被覆盖
export const cellForced = {
  selection: {
    renderHeader: function<T>({ store }: { store: Store<T>; }) {
      function isDisabled() {
        return store.states.data.value && store.states.data.value.length === 0
      }
      return h(HlCheckbox, {
        disabled: isDisabled(),
        indeterminate:
          store.states.selection.value.length > 0 &&
          !store.states.isAllSelected.value,
        'onUpdate:modelValue': store.toggleAllSelection,
        modelValue: store.states.isAllSelected.value,
      })
    },
    renderCell: function<T>({
      row,
      column,
      store,
      $index,
    }: {
      row: T
      column: TableColumnCtx<T>
      store: Store<T>
      $index: string
    }) {
      return h(HlCheckbox, {
        disabled: column.selectable
          ? !column.selectable.call(null, row, $index)
          : false,
        onChange: () => {
          store.commit('rowSelectedChanged', row)
        },
        onClick: (event: Event) => event.stopPropagation(),
        modelValue: store.isSelected(row),
      })
    },
    sortable: false,
    resizable: false,
  },
  index: {
    renderHeader: function<T>({ column }: { column: TableColumnCtx<T>; }) {
      return column.label || '#'
    },
    renderCell: function<T>({
      column,
      $index,
    }: {
      column: TableColumnCtx<T>
      $index: number
    }) {
      let i = $index + 1
      const index = column.index

      if (typeof index === 'number') {
        i = $index + index
      } else if (typeof index === 'function') {
        i = index($index)
      }
      return h('div', {}, [i])
    },
    sortable: false,
  },
  expand: {
    renderHeader: function<T>({ column }: { column: TableColumnCtx<T>; }) {
      return column.label || ''
    },
    renderCell: function<T>({ row, store }: { row: T; store: Store<T>; }) {
      const classes = ['table-expand-icon']
      if (store.states.expandRows.value.indexOf(row) > -1) {
        classes.push('table-expand-icon-expanded')
      }
      const callback = function(e: Event) {
        e.stopPropagation()
        store.toggleRowExpansion(row)
      }
      return h(
        'div',
        {
          class: classes,
          onClick: callback,
        },
        {
          default: () => [
            h(HlIcon, null,
              {
                default: () => [h(SystemArrowRight)],
              },
            ),
          ],
        },
      )
    },
    sortable: false,
    resizable: false,
    className: 'table-expand-column',
  },
}

export function defaultRenderCell<T>({
  row,
  column,
  $index,
}: {
  row: T
  column: TableColumnCtx<T>
  $index: number
}) {
  const property = column.property
  const value = property && getProp(row, property).value
  if (column && column.formatter) {
    return column.formatter(row, column, value, $index)
  }
  return value?.toString?.() || ''
}

export function treeCellPrefix<T>({
  row,
  treeNode,
  store,
}: {
  row: T
  treeNode: TreeNode
  store: Store<T>
}) {
  if (!treeNode) return null
  const ele = []
  const callback = function(e) {
    e.stopPropagation()
    store.loadOrToggle(row)
  }
  if (treeNode.indent) {
    ele.push(
      h('span', {
        class: 'table-indent',
        style: { 'padding-left': treeNode.indent + 'px' },
      }),
    )
  }
  if (typeof treeNode.expanded === 'boolean' && !treeNode.noLazyChildren) {
    const expandClasses = [
      'table-expand-icon',
      treeNode.expanded ? 'table-expand-icon-expanded' : '',
    ]

    ele.push(
      h(
        'div',
        {
          class: expandClasses,
          onClick: callback,
        },
        [
          treeNode.loading ?
            h(HlSpinner) : h(HlIcon, null, {
              default: () => [h(SystemArrowRight)],
            }),
        ],
      ),
    )
  } else {
    ele.push(
      h('span', {
        class: 'table-placeholder',
      }),
    )
  }
  return ele
}
