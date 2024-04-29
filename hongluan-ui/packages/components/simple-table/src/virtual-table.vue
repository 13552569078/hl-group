<template>
  <div :class="namespace">
    <table class="table-header" :class="tableClass" :style="tableStyle">
      <thead v-if="showHeader" :class="{ 'fixed-top': true }">
        <tr
          v-for="(row, rowIndex) in realColsInfo.headerRows"
          :key="rowIndex"
          :class="getHeaderRowClass({ row, rowIndex })"
          :style="getHeaderRowStyle({ row, rowIndex })"
        >
          <th
            v-for="(column, columnIndex) of row"
            v-show="isShowCol(column)"
            :ref="el => (thRefs[columnIndex] = el)"
            :key="columnIndex"
            :rowspan="column.rowSpan"
            :colspan="column.colSpan"
            :style="[
              {
                'width': column.width ? column.width: false,
                'min-width': column.width ? column.width: false,
                'max-width': column.width ? column.width: false,
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
            <div v-if="column.headerSlotName" class="cell" :style="column.align ? `justify-content:${column.align}` : ''">
              <slot :name="column.headerSlotName" :col="{ ...column, columnIndex }"></slot>
            </div>
            <div v-else class="cell" :style="column.align ? `justify-content:${column.align}` : ''">
              {{ column.title }}
              <sortable-icon :sortable="column.sortable" @sort-change="val => $emit('sort-change', column.prop, val)" />
              <filter-icon
                v-if="column.filter?.slotName"
                :placement="column.filter.placement"
                :effect="column.filter.effect"
                :popper-class="column.filter.popperClass"
                :trigger="column.filter.trigger"
              >
                <template #default="{ close }">
                  <slot :name="column.filter.slotName" :close="close">
                  </slot>
                </template>
              </filter-icon>
            </div>
          </th>
        </tr>
      </thead>
    </table>
    <table
      v-if="data === null || data === undefined || data.length === 0"
      class="table-body no-data"
      :class="tableClass"
      :style="tableStyle"
    >
      <tbody>
        <tr v-if="data?.length === 0" class="empty-content">
          <td :colspan="realColsInfo.realCols.length">
            <slot name="empty">
              {{ t('hl.simpletable.emptyText') }}
            </slot>
          </td>
        </tr>
        <tr v-if="data === null || data === undefined" class="unknown-content">
          <td :colspan="realColsInfo.realCols.length">
            <slot name="unknown">
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <fixed-size-list
      v-else
      :class-name="['table-body', ...tableClass]"
      :style="tableStyle"
      :data="realData"
      :total="virtualTotal"
      :height="height"
      :item-size="itemSize"
      :perf-mode="true"
      :scrollbar-always-on="scrollbarAlwaysOn"
      :cache="cache"
      container-element="table"
      inner-element="tbody"
      @item-rendered="(...args) => $emit('item-rendered', ...args)"
    >
      <template #default="{ data, index: rowIndex, style }">
        <tr v-if="!data[rowIndex]" class="loading-row" :style="style">
          <td :colspan="realColsInfo.realCols.length">
            <slot name="loading" :rowIndex="rowIndex"></slot>
          </td>
        </tr>
        <tr
          v-else-if="data[rowIndex]['$type$'] === 'EXPANDED_ROW'"
          :key="getRowKey(data[rowIndex]['refRow']) + data[rowIndex]['slotName']"
          :class="['expand-row', data[rowIndex]['slotName']]"
          :style="style"
          @click="$event => $emit('row-click', data[rowIndex], rowIndex, $event)"
        >
          <td :colspan="realColsInfo.realCols.length">
            <slot :name="data[rowIndex]['slotName']" :row="data[rowIndex]['refRow']"></slot>
          </td>
        </tr>
        <tr
          v-else
          :key="getRowKey(data[rowIndex])"
          :class="[
            typeof rowClassName === 'string' ? rowClassName : rowClassName({ row: data[rowIndex], rowIndex }),
            currentSelectedRow === data[rowIndex] ? 'current-row' : ''
          ]"
          :style="[
            typeof rowStyle === 'function' ? rowStyle({ row: data[rowIndex], rowIndex }) : rowStyle,
            data[rowIndex]['$level$'] && `--tree-level:${data[rowIndex]['$level$']}`,
            style
          ]"
          @click="$event => $emit('row-click', data[rowIndex], rowIndex, $event)"
        >
          <template v-for="(column, columnIndex) of realColsInfo.realCols" :key="columnIndex">
            <cell
              :column="column"
              :column-index="columnIndex"
              :row="data[rowIndex]"
              :row-index="rowIndex"
              :cell-class-name="cellClassName"
              :cell-style="cellStyle"
              :span="getSpan({ row: data[rowIndex], column, rowIndex, columnIndex })"
              :expanded="expandedKeyExisted(data[rowIndex], column.expand?.slotName)"
              :tree-expanded="tableTreeMap[getRowKey(data[rowIndex])]?.expanded"
              :show-tooltip="column.showTooltip && isShowTooltipMap[rowIndex + '/' + columnIndex]"
              :has-children="hasChildren(data[rowIndex])"
              :is-loading="tableTreeMap[getRowKey(data[rowIndex])]?.isLoading"
              :first-column-index="firstColumnIndex"
              :width="tdWidths[columnIndex]"
              @cell-click="$event => $emit('cell-click', data[rowIndex], column, rowIndex, columnIndex, $event)"
              @expand="toggleExpandVirtualRow(data[rowIndex], rowIndex, columnIndex, column.expand?.slotName)"
              @tree-expand="toggleExpandVirtualTree(data[rowIndex], rowIndex)"
              @mouseover="$event => tdMouseover($event, rowIndex, columnIndex)"
              @mouseleave="tdMouseleave"
            >
              <slot :name="column.slotName" :row="{ ...data[rowIndex], rowIndex, columnIndex }"></slot>
            </cell>
          </template>
        </tr>
      </template>
    </fixed-size-list>
    <table class="table-footer" :class="tableClass" :style="tableStyle">
      <colgroup>
        <col v-for="(w, idx) in tdWidths" :key="idx" :width="w">
      </colgroup>
      <tfoot>
        <slot name="foot"></slot>
      </tfoot>
    </table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, provide, watch, onMounted, toRefs } from 'vue'
import { cloneDeep, findLast } from 'lodash-unified'
import { useLocale, useNamespace } from '@hongluan-ui/hooks'
import { FixedSizeList } from '@hongluan-ui/components/virtual-list'
import SortableIcon from './sortable.vue'
import FilterIcon from './filter.vue'
import Cell from './body/cell'
import { virtualTableProps, simpleTableContextKey } from './simple-table'
import { useExpand } from './use-expand'
import { useTooltip } from './use-tooltip'
import { useTree } from './use-tree'
import { convertCols } from './utils'

import type { Nullable } from '@hongluan-ui/utils'
import type { ColumnType, VirtualTableContext } from './simple-table'

export default defineComponent({
  name: 'VirtualTable',
  components: { Cell, SortableIcon, FilterIcon, FixedSizeList },
  props: virtualTableProps,
  emits: ['row-click', 'cell-click', 'sort-change', 'expand', 'tree-expand', 'current-change', 'item-rendered'],
  setup(props, { emit }) {
    const { t } = useLocale()
    const { namespace: simpleTableNS } = useNamespace('simple-table')
    const { namespace } = useNamespace('virtual-table')
    const tableRef = ref<HTMLTableElement>()
    const thRefs = ref([])
    const tdWidths = ref<string[]>([])
    const currentSelectedRow = ref<Nullable<unknown>>(null)
    const {
      expandRowKeys,
      defaultExpandAll,
      cols,
      data: realData,
    } = toRefs(props)

    const realColsInfo = computed(() => convertCols(cloneDeep(cols.value)))
    const slotNames = computed(() => realColsInfo.value.realCols.filter(c => c.slotName).map(c => c.slotName))
    const expandSlotNames = computed(() => realColsInfo.value.realCols.filter(c => c.expand?.slotName).map(c => c.expand?.slotName))
    const virtualTotal = computed(() => props.total ?? (realData.value ? realData.value.length : 0))

    const tableClass = computed(() => [
      simpleTableNS.value,
      props.size,
      props.border,
      {
        'hover': props.hover,
        'list': props.list,
        'auto-height': props.autoHeight,
      },
      props.stripe == 'even' ? 'striped-even' : '',
      props.stripe == 'odd' ? 'striped-odd' : '',
      typeof props.stripe === 'boolean' && props.stripe ? 'striped-odd' : '',
    ])
    const tableStyle = computed(() => [
      props.padding ? `--table-padding: ${props.padding}` : '',
      props.cellPadding ? `--table-cell-padding: ${props.cellPadding}` : '',
      props.gap ? `--table-gap: ${props.gap}` : '',
      props.gapX ? `--table-gap-x: ${props.gapX}` : '',
      props.gapY ? `--table-gap-y: ${props.gapY}` : '',
    ])

    const {
      toggleExpandRow,
      expandedKeyExisted,
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

    const toggleExpandVirtualRow = (row: unknown, rowIndex: number, columnIndex: number, slotName: string) => {
      toggleExpandRow(row, slotName)
      if (expandedKeyExisted(row, slotName)) {
        for(let start = rowIndex + 1; start < realData.value.length; start++) {
          if (realData.value[start]['$type$'] !== 'EXPANDED_ROW' ||
            realData.value[start]['$type$'] === 'TREE_ROW' ||
            realData.value[start]['columnIndex'] > columnIndex) {
            realData.value.splice(start, 0, { '$type$': 'EXPANDED_ROW', refRow: row, rowIndex, columnIndex, slotName })
            break
          }
        }
      } else {
        for(let start = rowIndex + 1; start < realData.value.length; start++) {
          if (realData.value[start]['$type$'] === 'EXPANDED_ROW') {
            if (realData.value[start]['columnIndex'] === columnIndex) {
              realData.value.splice(start, 1)
              break
            }
          } else break
        }
      }
    }

    const toggleExpandVirtualTree = async (row: unknown, rowIndex: number) => {
      await toggleExpandTree(row)

      let start = rowIndex + 1
      while(realData.value[start]['$type$'] === 'EXPANDED_ROW') {
        start++
      }

      const rowKey = getRowKey(row)
      const level = tableTreeMap.value[rowKey].level
      if (tableTreeMap.value[rowKey]?.expanded) {
        const children: unknown[] = row[props.treeProps.children] ?? []
        for(let i = children.length - 1; i >= 0; i--){
          const child = children[i]
          child['$type$'] = 'TREE_ROW'
          child['$level$'] = level + 1
          realData.value.splice(start, 0, children[i])
        }
      } else {
        let count = 0
        for(let i = start; ; i++) {
          if (realData.value[i]['$type$'] !== 'TREE_ROW') break
          if (realData.value[i]['$level$'] <= level) break
          count++

          const treeRowKey = getRowKey(realData.value[i])
          if (tableTreeMap.value[treeRowKey]) {
            tableTreeMap.value[treeRowKey].expanded = false
          }
        }
        realData.value.splice(start, count)
      }
    }

    watch(realData, () => {
      walkTreeNode(realData.value)
    })

    onMounted(() => {
      walkTreeNode(realData.value)

      tdWidths.value = thRefs.value.map(thRef => thRef.offsetWidth + 'px')
    })

    provide<VirtualTableContext>(simpleTableContextKey, {
      isShowCol,
      getColFixed,
    })

    return {
      t,
      namespace,
      virtualTotal,
      tableStyle,
      tableClass,
      tableRef,
      thRefs,
      tdWidths,
      isShowCol,
      getColFixed,
      realColsInfo,
      slotNames,
      expandSlotNames,
      realData,
      getHeaderRowClass,
      getHeaderRowStyle,
      getHeaderCellClass,
      getHeaderCellStyle,
      setCurrentRow,
      toggleExpandVirtualRow,
      toggleExpandVirtualTree,
      rowClicked,
      toggleColumn,
      getRowKey,
      getSpan,
      expandedKeyExisted,
      isShowTooltipMap,
      tdMouseleave,
      tdMouseover,
      clearTooltip,
      currentSelectedRow,
      tableTreeMap,
      hasChildren,
    }
  },
})
</script>
