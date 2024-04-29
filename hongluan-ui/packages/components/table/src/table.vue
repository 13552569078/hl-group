<template>
  <div
    :class="[
      namespace,
      className,
      {
        'fit': fit, //列的宽度是否自撑开
        'bordered': border || isGroup, //是否带有纵向边框
        'table-hidden': isHidden,
        'table-group': isGroup,
        'table-fluid-height': maxHeight,
        'table-scrollable-x': layout.scrollX.value,
        'table-scrollable-y': layout.scrollY.value,
        'hover': !store.states.isComplex.value,
        'striped-odd': stripe === 'odd' || typeof stripe === 'boolean' && stripe,
        'striped-even': stripe === 'even',
      },
    ]"
    @mouseleave="handleMouseLeave()"
  >
    <div ref="hiddenColumns" class="hidden-columns">
      <slot></slot>
    </div>
    <div
      v-if="showHeader"
      ref="headerWrapper"
      v-mousewheel="handleHeaderFooterMousewheel"
      class="table-header-wrapper"
    >
      <table-header
        ref="tableHeader"
        :border="border"
        :default-sort="defaultSort"
        :store="store"
        :style="{
          width: layout.bodyWidth.value ? layout.bodyWidth.value + 'px' : '',
        }"
        @set-drag-visible="setDragVisible"
      />
    </div>
    <div ref="bodyWrapper" :style="[bodyHeight]" class="table-body-wrapper">
      <table-body
        :context="context"
        :highlight="highlightCurrentRow"
        :row-class-name="rowClassName"
        :tooltip-effect="tooltipEffect"
        :row-style="rowStyle"
        :store="store"
        :stripe="stripe"
        :style="{
          width: bodyWidth,
        }"
      />
      <div
        v-if="isEmpty"
        ref="emptyBlock"
        :style="emptyBlockStyle"
        class="table-empty-block"
      >
        <span class="table-empty-text">
          <slot name="empty">{{ emptyText || t('el.table.emptyText') }}</slot>
        </span>
      </div>
      <div
        v-if="$slots.append"
        ref="appendWrapper"
        class="table-append-wrapper"
      >
        <slot name="append"></slot>
      </div>
    </div>
    <div
      v-if="showSummary"
      v-show="!isEmpty"
      ref="footerWrapper"
      v-mousewheel="handleHeaderFooterMousewheel"
      class="table-footer-wrapper"
    >
      <table-footer
        :border="border"
        :default-sort="defaultSort"
        :store="store"
        :style="{
          width: layout.bodyWidth.value ? layout.bodyWidth.value + 'px' : '',
        }"
        :sum-text="sumText || t('el.table.sumText')"
        :summary-method="summaryMethod"
      />
    </div>
    <div
      v-if="store.states.fixedColumns.value.length > 0"
      ref="fixedWrapper"
      v-mousewheel="handleFixedMousewheel"
      :style="[
        {
          width: layout.fixedWidth.value ? layout.fixedWidth.value + 'px' : '',
        },
        fixedHeight,
      ]"
      class="table-fixed"
    >
      <div
        v-if="showHeader"
        ref="fixedHeaderWrapper"
        class="table-fixed-header-wrapper"
      >
        <table-header
          ref="fixedTableHeader"
          :border="border"
          :store="store"
          :style="{
            width: bodyWidth,
          }"
          fixed="left"
          @set-drag-visible="setDragVisible"
        />
      </div>
      <div
        ref="fixedBodyWrapper"
        :style="[
          {
            top: layout.headerHeight.value + 'px',
          },
          fixedBodyHeight,
        ]"
        class="table-fixed-body-wrapper"
      >
        <table-body
          :highlight="highlightCurrentRow"
          :row-class-name="rowClassName"
          :tooltip-effect="tooltipEffect"
          :row-style="rowStyle"
          :store="store"
          :stripe="stripe"
          :style="{
            width: bodyWidth,
          }"
          fixed="left"
        />
        <div
          v-if="$slots.append"
          :style="{ height: layout.appendHeight.value + 'px' }"
          class="table-append-gutter"
        ></div>
      </div>
      <div
        v-if="showSummary"
        v-show="!isEmpty"
        ref="fixedFooterWrapper"
        class="table-fixed-footer-wrapper"
      >
        <table-footer
          :border="border"
          :store="store"
          :style="{
            width: bodyWidth,
          }"
          :sum-text="sumText || t('el.table.sumText')"
          :summary-method="summaryMethod"
          fixed="left"
        />
      </div>
    </div>
    <div
      v-if="store.states.rightFixedColumns.value.length > 0"
      ref="rightFixedWrapper"
      v-mousewheel="handleFixedMousewheel"
      :style="[
        {
          width: layout.rightFixedWidth.value
            ? layout.rightFixedWidth.value + 'px'
            : '',
          right: layout.scrollY.value
            ? (border ? layout.gutterWidth : layout.gutterWidth || 0) + 'px'
            : '',
        },
        fixedHeight,
      ]"
      class="table-fixed-right"
    >
      <div
        v-if="showHeader"
        ref="rightFixedHeaderWrapper"
        class="table-fixed-header-wrapper"
      >
        <table-header
          ref="rightFixedTableHeader"
          :border="border"
          :store="store"
          :style="{
            width: bodyWidth,
          }"
          fixed="right"
          @set-drag-visible="setDragVisible"
        />
      </div>
      <div
        ref="rightFixedBodyWrapper"
        :style="[{ top: layout.headerHeight.value + 'px' }, fixedBodyHeight]"
        class="table-fixed-body-wrapper"
      >
        <table-body
          :highlight="highlightCurrentRow"
          :row-class-name="rowClassName"
          :tooltip-effect="tooltipEffect"
          :row-style="rowStyle"
          :store="store"
          :stripe="stripe"
          :style="{
            width: bodyWidth,
          }"
          fixed="right"
        />
        <div
          v-if="$slots.append"
          :style="{ height: layout.appendHeight.value + 'px' }"
          class="table-append-gutter"
        ></div>
      </div>
      <div
        v-if="showSummary"
        v-show="!isEmpty"
        ref="rightFixedFooterWrapper"
        class="table-fixed-footer-wrapper"
      >
        <table-footer
          :border="border"
          :store="store"
          :style="{
            width: bodyWidth,
          }"
          :sum-text="sumText || t('el.table.sumText')"
          :summary-method="summaryMethod"
          fixed="right"
        />
      </div>
    </div>
    <div
      v-if="store.states.rightFixedColumns.value.length > 0"
      ref="rightFixedPatch"
      :style="{
        width: layout.scrollY.value ? layout.gutterWidth + 'px' : '0',
        height: layout.headerHeight.value + 'px',
      }"
      class="table-fixed-right-patch"
    ></div>
    <div
      v-show="resizeProxyVisible"
      ref="resizeProxy"
      class="table-column-resize-proxy"
    ></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance } from 'vue'
import { createStore } from './store/helper'
import { useLocale, useNamespace } from '@hongluan-ui/hooks'
import { Mousewheel } from '@hongluan-ui/directives'
import TableLayout from './table-layout'
import TableHeader from './table-header/index'
import TableBody from './table-body/index'
import TableFooter from './table-footer/index'
import { debounce } from 'lodash-unified'
import useUtils from './table/utils-helper'
import useStyle from './table/style-helper'
import type { Table } from './table/defaults'
import defaultProps from './table/defaults'

let tableIdSeed = 1
export default defineComponent({
  name: 'Table',
  directives: {
    Mousewheel,
  },
  components: {
    TableHeader,
    TableBody,
    TableFooter,
  },
  props: defaultProps,
  emits: [
    'select',
    'select-all',
    'selection-change',
    'cell-mouse-enter',
    'cell-mouse-leave',
    'cell-contextmenu',
    'cell-click',
    'cell-dblclick',
    'row-click',
    'row-contextmenu',
    'row-dblclick',
    'header-click',
    'header-contextmenu',
    'sort-change',
    'filter-change',
    'current-change',
    'header-dragend',
    'expand-change',
  ],
  setup(props) {
    const { t } = useLocale()

    type Row = typeof props.data[number]
    let table = getCurrentInstance() as Table<Row>
    const store = createStore<Row>(table, props)
    table.store = store
    const layout = new TableLayout<Row>({
      store: table.store,
      table,
      fit: props.fit,
      showHeader: props.showHeader,
    })
    table.layout = layout

    const isEmpty = computed(() => (store.states.data.value || []).length === 0)

    /**
    * open functions
    */
    const {
      setCurrentRow,
      toggleRowSelection,
      clearSelection,
      clearFilter,
      toggleAllSelection,
      toggleRowExpansion,
      clearSort,
      sort,
    } = useUtils<Row>(store)
    const {
      isHidden,
      renderExpanded,
      setDragVisible,
      isGroup,
      handleMouseLeave,
      handleHeaderFooterMousewheel,
      tableSize,
      bodyHeight,
      emptyBlockStyle,
      handleFixedMousewheel,
      fixedHeight,
      fixedBodyHeight,
      resizeProxyVisible,
      bodyWidth,
      resizeState,
      doLayout,
    } = useStyle<Row>(props, layout, store, table)

    const debouncedUpdateLayout = debounce(doLayout, 50)

    const tableId = 'table_' + tableIdSeed++
    table.tableId = tableId
    table.state = {
      isGroup,
      resizeState,
      doLayout,
      debouncedUpdateLayout,
    }
    const { namespace } = useNamespace('table')
    return {
      namespace,
      layout,
      store,
      handleHeaderFooterMousewheel,
      handleMouseLeave,
      tableId,
      tableSize,
      isHidden,
      isEmpty,
      renderExpanded,
      resizeProxyVisible,
      resizeState,
      isGroup,
      bodyWidth,
      bodyHeight,
      emptyBlockStyle,
      debouncedUpdateLayout,
      handleFixedMousewheel,
      fixedHeight,
      fixedBodyHeight,
      setCurrentRow,
      toggleRowSelection,
      clearSelection,
      clearFilter,
      toggleAllSelection,
      toggleRowExpansion,
      clearSort,
      doLayout,
      sort,
      t,
      setDragVisible,
      context: table,
    }
  },
})
</script>
