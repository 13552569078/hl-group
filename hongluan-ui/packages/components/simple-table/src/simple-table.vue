<template>
  <table
    ref="tableRef"
    :class="[
      namespace,
      size,
      border,
      {
        'hover': hover,
        'list': list,
        'auto-height': autoHeight,
        'table-fixed': tableFixed,
      },
      stripe == 'even' ? 'striped-even' : '',
      stripe == 'odd' ? 'striped-odd' : '',
      typeof stripe === 'boolean' && stripe ? 'striped-odd' : '',
      scrollClass,
    ]"
    :style="[
      padding ? `--table-padding: ${padding}` : '',
      cellPadding ? `--table-cell-padding: ${cellPadding}` : '',
      gap ? `--table-gap: ${gap}` : '',
      gapX ? `--table-gap-x: ${gapX}` : '',
      gapY ? `--table-gap-y: ${gapY}` : '',
    ]"
  >
    <thead v-if="showHeader" :class="{ 'fixed-top': fixedHeader }">
      <tr
        v-for="(row, rowIndex) in realColsInfo.headerRows"
        :key="rowIndex"
        :class="getHeaderRowClass({ row, rowIndex })"
        :style="getHeaderRowStyle({ row, rowIndex })"
      >
        <th
          v-for="(column, columnIndex) of row"
          v-show="isShowCol(column)"
          :key="`${rowIndex}-${column.id}-thead`"
          :rowspan="column.rowSpan"
          :colspan="column.colSpan"
          :style="[
            {
              'width': column.width ? column.width : false,
              'min-width': column.minWidth ? column.minWidth : false,
              'max-width': column.maxWidth ? column.maxWidth : false,
              ...getHeaderCellStyle({ row, column, rowIndex, columnIndex })
            },
            !!column.fixed && getColFixed(column).distance ? '--table-fixed-distance:' + getColFixed(column).distance : ''
          ]"
          :class="[
            {
              ['fixed-' + getColFixed(column).position]: !!column.fixed,
              'show-shadow': getColFixed(column).hasShadow,
            },
            getHeaderCellClass({ row, column, rowIndex, columnIndex })
          ]"
        >
          <div
            v-if="column.headerSlotName"
            class="cell"
            :style="column.align ? `justify-content:${column.align}` : ''"
          >
            <slot :name="column.headerSlotName" :col="{ ...column, columnIndex }"></slot>
          </div>
          <div v-else class="cell" :style="column.align ? `justify-content:${column.align}` : ''">
            {{ column.title }}
            <sortable-icon
              :sortable="column.sortable"
              @sort-change="val => $emit('sort-change', column.prop, val)"
            />
            <filter-icon
              v-if="column.filter?.slotName"
              :placement="column.filter.placement"
              :effect="column.filter.effect"
              :popper-class="column.filter.popperClass"
              :trigger="column.filter.trigger"
            >
              <template #default="{ close }">
                <slot :name="column.filter.slotName" :close="close"></slot>
              </template>
            </filter-icon>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <body-row
        :data="realData"
        @row-click="(...args) => rowClicked(...args)"
        @cell-click="(...args) => $emit('cell-click', ...args)"
      >
        <template v-for="name in slotNames" #[name]="colData">
          <slot :name="name" v-bind="colData"></slot>
        </template>
        <template v-for="name in expandSlotNames" #[name]="colData">
          <slot :name="name" v-bind="colData"></slot>
        </template>
      </body-row>
      <tr v-if="$slots.more" class="more-content">
        <td :colspan="realColsInfo.realCols.length">
          <slot name="more">{{ t('hl.select.loading') }}</slot>
        </td>
      </tr>
      <tr v-if="data?.length === 0" class="empty-content">
        <td :colspan="realColsInfo.realCols.length">
          <slot name="empty">{{ t('hl.simpletable.emptyText') }}</slot>
        </td>
      </tr>
      <tr v-if="data === null || data === undefined" class="unknown-content">
        <td :colspan="realColsInfo.realCols.length">
          <slot name="unknown"></slot>
        </td>
      </tr>
    </tbody>
    <tfoot :class="{ 'fixed-bottom': fixedFooter }">
      <slot name="foot"></slot>
    </tfoot>
  </table>
</template>

<script lang="ts">
import { computed, defineComponent, ref, provide, watch, onMounted, toRefs } from 'vue'
import { useLocale, useNamespace } from '@hongluan-ui/hooks'
import { cloneDeep, findLast } from 'lodash-unified'
import SortableIcon from './sortable.vue'
import FilterIcon from './filter.vue'
import BodyRow from './body/row.vue'
import { simpleTableProps, simpleTableContextKey } from './simple-table'
import { useResizer } from './use-resizer'
import { useExpand } from './use-expand'
import { useTooltip } from './use-tooltip'
import { useTree } from './use-tree'
import { useScroll } from './use-scroll'
import { convertCols } from './utils'

import type { ColumnType } from './simple-table'
import type { Nullable } from '@hongluan-ui/utils'

export default defineComponent({
  name: 'SimpleTable',
  components: { BodyRow, SortableIcon, FilterIcon },
  props: simpleTableProps,
  emits: ['row-click', 'cell-click', 'sort-change', 'expand', 'tree-expand', 'current-change'],
  setup(props, { emit }) {
    const { t } = useLocale()
    const { namespace } = useNamespace('simple-table')
    const tableRef = ref<HTMLTableElement>()
    const currentSelectedRow = ref<Nullable<unknown>>(null)
    const {
      rowClassName,
      rowStyle,
      cellClassName,
      cellStyle,
      firstColumnIndex,
      expandRowKeys,
      defaultExpandAll,
      cols,
    } = toRefs(props)

    const realColsInfo = computed(() => convertCols(cloneDeep(cols.value)))
    const slotNames = computed(() => realColsInfo.value.realCols.filter(c => c.slotName).map(c => c.slotName))
    const expandSlotNames = computed(() => realColsInfo.value.realCols.filter(c => c.expand?.slotName).map(c => c.expand?.slotName))
    const realData = computed(() => props.data ?? [])
    const hasTreeData = computed(() =>
      realData.value.some(rd =>
        rd[props.treeProps.hasChildren] ||
        (Array.isArray(rd[props.treeProps.children]) && rd[props.treeProps.children].length),
      ),
    )

    const {
      toggleExpandRow,
      expandedKeyExisted,
      toggleExpand,
    } = useExpand({
      expandRowKeys,
      getRowKey,
      defaultExpandAll,
    })

    const {
      isShowTooltipMap,
      clearTooltip,
      tdMouseover,
      tdMouseleave,
    } = useTooltip(realColsInfo)

    const {
      tableTreeMap,
      hasChildren,
      toggleExpandTree,
      walkTreeNode,
    } = useTree({
      load: props.load,
      treeProps: props.treeProps,
      getRowKey,
      expandRowKeys,
      defaultExpandAll,
    })

    useResizer(props.resize, tableRef)

    const { scrollClass } = useScroll(props.scrollContainer, realColsInfo, tableRef)

    function getRowKey(row: unknown): string {
      const rowKey = props.rowKey
      if (!row) throw new Error('Row is required when get row identity')
      if (typeof rowKey === 'string') {
        if (rowKey.indexOf('.') < 0) {
          return row[rowKey] + ''
        }
        const key = rowKey.split('.')
        let current = row
        for (let i = 0; i < key.length; i++) {
          current = current[key[i]]
        }
        return current + ''
      } else if (typeof rowKey === 'function') {
        return rowKey.call(null, row)
      }
    }

    const isShowCol = (col: ColumnType) => {
      return !('$show$' in col) || col.$show$
    }
    const toggleColumn = (index: number, show?: boolean) => {
      cols.value[index].$show$ = show ?? !('$show$' in cols.value[index] ? cols.value[index].$show$ : true)
    }
    const getColFixed = (col: ColumnType) => {
      const pos = (col: ColumnType) => typeof col.fixed === 'string' ? col.fixed : col.fixed?.position
      const result = {
        hasShadow: false,
        position: pos(col),
        distance: typeof col.fixed === 'string' ? 0 : col.fixed?.distance,
      }
      if (result.position === 'left') {
        result.hasShadow = findLast(realColsInfo.value.realCols, c => pos(c) === 'left') === col
      } else if (result.position === 'right') {
        result.hasShadow = realColsInfo.value.realCols.find(c => pos(c) === 'right') === col
      }
      return result
    }

    const getHeaderRowClass = ({ row, rowIndex }) => {
      return typeof props.headerRowClassName === 'string' ? props.headerRowClassName : props.headerRowClassName({ row, rowIndex })
    }
    const getHeaderRowStyle = ({ row, rowIndex }) => {
      return typeof props.headerRowStyle === 'function' ? props.headerRowStyle({ row, rowIndex }) : props.headerRowStyle
    }
    const getHeaderCellClass = ({ row, column, rowIndex, columnIndex }) => {
      return typeof props.headerCellClassName === 'string' ? props.headerCellClassName : props.headerCellClassName({ row, column, rowIndex, columnIndex })
    }
    const getHeaderCellStyle = ({ row, column, rowIndex, columnIndex }) => {
      return typeof props.headerCellStyle === 'function' ? props.headerCellStyle({ row, column, rowIndex, columnIndex }) : props.headerCellStyle
    }

    const rowClicked = (row, rowIndex, $event) => {
      if (props.highlightCurrentRow) {
        emit('current-change', row, cloneDeep(currentSelectedRow.value))
        currentSelectedRow.value = currentSelectedRow.value === row ? null : row
      }
      emit('row-click', row, rowIndex, $event)
    }
    const setCurrentRow = row => {
      if (props.highlightCurrentRow) {
        emit('current-change', row, cloneDeep(currentSelectedRow.value))
        currentSelectedRow.value = row ?? null
      }
    }

    const getSpan = ({ row, column, rowIndex, columnIndex }) => {
      const span = { rowspan: 1, colspan: 1 }
      if (props.spanMethod) {
        const result = props.spanMethod({ row, column, rowIndex, columnIndex })
        if (Array.isArray(result)) {
          span.rowspan = result[0]
          span.colspan = result[1]
        } else if (typeof result === 'object') {
          Object.assign(span, result)
        }
      }
      return span
    }

    watch(realData, () => {
      walkTreeNode(realData.value)
    })

    onMounted(() => {
      walkTreeNode(realData.value)
    })

    provide(simpleTableContextKey, {
      rowClassName,
      rowStyle,
      cellClassName,
      cellStyle,
      firstColumnIndex,
      load: props.load,
      getSpan,
      currentSelectedRow,
      slotNames,
      expandSlotNames,
      realColsInfo,
      getRowKey,
      toggleExpandRow,
      expandedKeyExisted,
      isShowTooltipMap,
      tdMouseover,
      tdMouseleave,
      tableTreeMap,
      hasChildren,
      hasTreeData,
      toggleExpandTree,
      isShowCol,
      getColFixed,
    })

    return {
      t,
      namespace,
      tableRef,
      isShowCol,
      getColFixed,
      realColsInfo,
      slotNames,
      expandSlotNames,
      scrollClass,
      realData,
      getHeaderRowClass,
      getHeaderRowStyle,
      getHeaderCellClass,
      getHeaderCellStyle,
      setCurrentRow,
      toggleExpand,
      toggleExpandTree,
      rowClicked,
      toggleColumn,
      clearTooltip,
    }
  },
})
</script>
