<template>
  <hl-group full class="full-page fx-page-table-v2" gap="var(--lg)">
    <hl-panel v-if="$slots.tree" v-show="showTree" class="table-panel h-full static left-section-tree" full-body borderless>
      <slot name="tree"></slot>
    </hl-panel>

    <hl-panel class="w-xxl bg-transparent" full-body borderless padding="0" header-class="flex-wrap">
      <template v-if="tabs.length || searchItems.length" #header>
        <hl-tabs
          v-if="tabs.length"
          v-model="activeTab"
          type="line"
          :show-pane="false"
          class="w-full table-tabs"
          style="background:var(--bg-element)"
          nav-height="calc(var(--xxs) * 16)"
          v-bind="tabsProps"
          @tab-change="$emit('tab-change', activeTab)"
        >
          <hl-tab-pane v-for="t in tabs" :key="t.name" :label="t.label" :name="t.name" />
        </hl-tabs>
        <table-search-wrapper
          :show-search-bar="searchItems.length > 0"
          :search-items="searchItems"
          :show-adv-search="showAdvSearch"
          :hide-header-line="!!tabs?.length"
          @search="searchBarChanged"
          @change-height="setContentHeight"
        >
          <template v-for="s in searchItemsSlots" #[s]="itemData">
            <slot :name="s" v-bind="itemData"></slot>
          </template>
        </table-search-wrapper>
      </template>
      <slot name="header-top"></slot>
      <hl-panel
        ref="tableContentRef"
        class="h-full table-page"
        header-class="border-transparent"
        footer-class="border-transparent"
        full-body
      >
        <template #header>
          <search-items if="showToolBar" :tags="currentSearchTags" @tag-box-height="setTagBoxHeight" @clear-tags="clearTags">
            <template #content-header-left>
              <total-info v-bind="totalInfoData" />
            </template>
            <template #content-header-right>
              <slot name="toolbar-extra-before"></slot>
              <dropdown-button v-if="selectionActions.length > 0" :options="selectionActions" :disabled="selectedRowKeys.length <= 0" />
              <slot name="toolbar-extra-after"></slot>
            </template>
          </search-items>
        </template>
        <hl-scrollbar style="margin: 0 var(--panel-padding)">
          <slot name="custom-table" :data="tableData">
            <hl-simple-table
              :cols="newCols"
              :data="tableData"
              border="border-x"
              padding="var(--sm)"
              fixed-header
              v-bind="tableProps"
              @sort-change="(...args) => $emit('sort-change', ...args)"
              @row-click="(...args) => $emit('row-click', ...args)"
              @cell-click="(...args) => $emit('cell-click', ...args)"
            >
              <template #tableIndex="{ rowIndex }">
                <span>{{ rowIndex + 1 }}</span>
              </template>
              <!-- 行多选 -->
              <template #selectionCol>
                <hl-checkbox
                  v-if="isMultipleSelect"
                  v-model="isSelectedAll"
                  :indeterminate="isIndeterminate"
                  :show-label="false"
                  @change="selectAll"
                />
              </template>
              <template #tableSelection="{ row }">
                <hl-checkbox
                  v-if="isMultipleSelect"
                  v-model="selectedRowKeys"
                  :label="row.id"
                  :show-label="false"
                  @change="selectRow"
                  @click.stop
                />
                <hl-radio
                  v-else
                  v-model="selectedRadioKey"
                  :label="row.id"
                  :show-label="false"
                  @change="handleRadioChange"
                  @click.stop
                />
              </template>
              <!-- 行操作 -->
              <template #action="{ row }">
                <hl-group gap="var(--xxs)">
                  <slot name="action" :row="row"></slot>
                </hl-group>
              </template>
              <!-- 展开行插槽 -->
              <template #customExpand="{ row }">
                <slot name="customExpand" :row="row"></slot>
              </template>
              <!-- 无数据 -->
              <template #empty>
                <hb-empty description="暂无数据" image-size="10vw" :image="noDataImage" />
              </template>
              <template v-for="col in slotCols" #[col.slotName]="colData" :key="col.slotName">
                <slot :name="col.slotName" v-bind="colData"> </slot>
              </template>
              <template v-for="filter in filterSlots" #[filter.slotName]="close" :key="filter.slotName">
                <slot :name="filter.slotName" v-bind="close"> </slot>
              </template>
            </hl-simple-table>
          </slot>
        </hl-scrollbar>
        <template v-if="pagination.show" #footer>
          <hl-pagination
            v-if="tableData?.length > 0"
            ref="paginationRef"
            :page-size="pagination.pageSize"
            :current-page="pagination.currentPage"
            :total="pagination.total"
            align="items-between"
            class="full"
            layout="sizes, total, slot, prev, pager, next, jumper"
            @current-change="currentPageChange"
            @size-change="pageSizeChange"
          >
            <div class="w-full"></div>
          </hl-pagination>
        </template>
      </hl-panel>
    </hl-panel>
  </hl-group>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, onMounted, PropType, toRef, computed, onBeforeUnmount } from 'vue'
import { HlSimpleTable, HlGroup, HlCheckbox, HlRadio, HlPanel, HlTabs, HlTabPane, HlScrollbar, HlPagination } from 'hongluan-ui'
import { HbEmpty } from 'hongluan-business-ui'
import { useTableSelection, usePagination } from 'hongluan-hooks'
import TableSearchWrapper from './table-search-wrapper.vue'
import SearchItems from './search-items.vue'
import TotalInfo from './total-info.vue'
import DropdownButton from './dropdown-button.vue'
import { TagItem } from './types'
import { Utils } from './utils'

export default defineComponent({
  name: 'PageTableV2',
  components: { HlSimpleTable, HlGroup, HlCheckbox, HlRadio, HlPanel, HbEmpty, HlScrollbar, HlTabs, HlTabPane, HlPagination, TableSearchWrapper, SearchItems, TotalInfo, DropdownButton },
  props: {
    // 自定义表格属性穿透给hl-simple-table
    tableProps: {
      type: Object,
      default: () => ({}),
    },
    // 表头
    cols: {
      type: Array,
      default: () => [],
    },
    // 表数据
    tableData: {
      type: Array as PropType<Record<string, unknown>[]>,
      default: () => [],
    },
    // 列表查询回调
    dataFetcher: {
      type: Function as PropType<(...args: any) => Promise<any>>,
      default: () => ({}),
    },
    showTree: Boolean,
    showAdvSearch: {
      type: Boolean,
      default: true,
    },
    // 搜索条件
    searchItems: {
      type: Array as PropType<any[]>,
      default: () => [],
    },

    // 多选操作
    selectionActions: {
      type: Array,
      default: () => [],
    },
    defaultPagination: {
      type: Object,
      default: () => {
        return { pageSize: 10, currentPage: 1, total: 0 }
      },
    },
    noDataImage: {
      type: String,
      default: '',
    },
    showToolBar: {
      type: Boolean,
      default: true,
    },
    tabs: {
      type: Array as PropType<{ label: string; name: string; default?: boolean; }[]>,
      default: () => [],
    },
    tabsProps: {
      type: Object,
      default: () => ({}),
    },
    isMultipleSelect: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['selectedRowKeys', 'sort-change', 'row-click', 'cell-click', 'tab-change', 'clear-tags'],
  setup (props, { emit }) {
    const activeTab = ref('')
    const simpleTableListRef = ref()
    const tableContentRef = ref()
    const tableContentHeight = ref('')
    let tagsHeight = 0
    // 搜索总条件
    const searchParams = ref({})
    const currentSearchTags = ref<TagItem[]>([])
    const totalInfoData = reactive({ search: true, checked: false, total: 0 })
    const tableStyle = ref<Record<string, any>>({})

    const newCols = computed(() => {
      return props.cols.map((col: any) => {
        if (['tableIndex', 'tableSelection'].includes(col.slotName) && !col.width) {
          col.width = '6em'
        }
        return col
      })
    })

    const searchBarChanged = (searchArr: TagItem[], searchType: number) => {
      if (searchType === 1) { // 简单搜索，只有一个搜索项
        const idx = currentSearchTags.value.findIndex(st => st.key === searchArr[0].key)
        if (idx > -1) {
          currentSearchTags.value[idx] = searchArr[0]
        } else {
          currentSearchTags.value.push(searchArr[0])
        }
      } else { // 高级搜索
        currentSearchTags.value = searchArr
      }
      searchParams.value = { ...Utils.getSearchParams(currentSearchTags.value).mapParams }
      setCurrentPage(1)
    }
    const setTableHeight = (val: number) => {
      tableStyle.value = {
        height: (val - tagsHeight) + 'px',
        overflow: 'auto',
      }
    }
    const setContentHeight = (val: number) => {
      tableContentHeight.value = `calc(100% - ${val + 16}px)`
    }

    const setTagBoxHeight = (val: number) => {
      if (tableContentRef.value) {
        let num: number = tableContentRef.value.offsetHeight - val - 76
        tagsHeight = val
        setTableHeight(num)
      }
    }
    const clearTags = (val: Array<TagItem>) => {
      emit('clear-tags', val)
      currentSearchTags.value = currentSearchTags.value.filter(c => !val.find(v => v.key === c.key))
      searchParams.value = { ...Utils.getSearchParams(currentSearchTags.value).mapParams }
      setCurrentPage(1)
    }

    const {
      isSelectedAll,
      isIndeterminate,
      selectedRowKeys,
      selectAll,
      selectRow,
    } = useTableSelection(toRef(props, 'tableData'))

    const selectedRadioKey = ref()

    const selectChange = (len = 1) => {
      Object.assign(totalInfoData, { search: len <= 0, checked: len > 0, total: len > 0 ? len : total.value })
      emit('selectedRowKeys', selectedRowKeys.value)
    }

    if (props.isMultipleSelect) {
      // 表格多选
      watch(() => selectedRowKeys.value.length, (len: number) => {
        selectChange(len)
      })
    } else {
      // 表格单选
      watch(() => selectedRowKeys.value, () => {
        selectChange()
      })
    }

    const {
      pageSize,
      currentPage,
      total,
      setTotal,
      setCurrentPage,
      currentPageChange,
      pageSizeChange,
    } = usePagination(fetchData, { pageSize:props.defaultPagination.pageSize, currentPage:props.defaultPagination.currentPage, total: props.defaultPagination.total })
    const pagination = reactive({
      show: true,
      currentPage: currentPage,
      pageSize: pageSize,
      total: total,
    })

    // 查询表格数据
    async function fetchData () {
      await props.dataFetcher({
        pageSize: pagination.pageSize,
        currentPage: pagination.currentPage,
        params: searchParams.value,
        setTotal: setAllTotal,
      })
      Object.assign(totalInfoData, { search: true, checked: false, total: total.value })
    }

    // 设置总数
    const setAllTotal = (newTotal: number) => {
      setTotal(newTotal)
      pagination.total = newTotal
    }

    const getSlotNames = (cols: any, result: any[]) => {
      cols.forEach(col => {
        if (col.slotName && !reservedSlotName.includes(col.slotName)) {
          result.push(col)
        }
        if (col.children && Array.isArray(col.children)) {
          getSlotNames(col.children, result)
        }
      })
    }
    // 过滤几个已使用的保留插槽
    const reservedSlotName = ['toolbar-extra-before','toolbar-extra-after','selectionCol', 'tableSelection', 'customExpand', 'tableIndex', 'action']
    const slotCols = computed(() => {
      const result: any[] = []
      getSlotNames(props.cols, result)
      return result
    })
    const searchItemsSlots = computed(() => {
      const result: string[] = []
      props.searchItems.forEach(si => {
        if (si.type === 'slot' && si.slotName) {
          result.push(si.slotName)
        }
      })
      return result
    })

    const filterSlots = computed(() => {
      const result: string[] = []
      props.cols.forEach((item: any) => {
        if (item.filter && item.filter.slotName && !reservedSlotName.includes(item.filter.slotName)) {
          result.push(item.filter)
        }
      })
      return result
    })

    /**
     * 重新刷新接口数据，重置多选，一般用于多选或其他操作
     * @param auto 在当前页没有数据时，是否自动向前翻页。默认false
     */
    const refresh = async (auto = false) => {
      await fetchData()
      if (auto && props.tableData.length === 0 && pagination.total > 0 && pagination.currentPage > 1) {
        pagination.currentPage -= 1
        await fetchData()
      }
      selectedRowKeys.value = []
      isSelectedAll.value = false
    }

    /**
     * 设置数据回到第一页，保留搜索以及多选等条件
     */
    const reset = () => {
      setCurrentPage(1)
    }

    /**
     * 重置搜索，重置多选等，并且设置数据回到第一页，
     */
    const resetAll = () => {
      selectedRowKeys.value = []
      isSelectedAll.value = false
      clearTags([])
    }

    /**
     * 重置搜索，重置多选
     */
    const clearAll = () => {
      selectedRowKeys.value = []
      isSelectedAll.value = false
      currentSearchTags.value = []
      searchParams.value = {}
    }

    // 手动设置行选中状态，用于把表格作为选择工具时，回显已选的数据
    const setSeletedRowKeys = (keys: string[]) => {
      selectedRowKeys.value = keys
      // 单选时还需要设置 selectedRadioKey 才能让 radio 回显选中状态
      if (!props.isMultipleSelect) {
        selectedRadioKey.value = keys[0]
      }
    }

    const tableContentObserver = new ResizeObserver(entries => {
      // 注意，entres是个数组，数组项为每个需要监听的DOM节点
      entries.forEach(entry => {
        // console.log('大小位置 contentRect', entry.contentRect)
        // console.log('监听的DOM target', entry.target)
        if (entry.target.className.indexOf('tree-page-content') !== -1) {
          // 执行内容区的高度变动
          setTableHeight(entry.contentRect.height)
        }
      })
    })

    const handleRadioChange = (id: string | number) => {
      selectedRowKeys.value = [id]
      selectRow()
    }

    watch(() => props.tabs, () => {
      if (props.tabs?.length) {
        const defaultTab = props.tabs.find(t => t.default)
        activeTab.value = defaultTab?.name ?? props.tabs[0].name
      }
    }, {
      immediate: true,
      deep: true,
    })

    // 初始化查询表格数据
    onMounted(async () => {
      // tableContentObserver.observe(tableContentRef.value as Element)
      if (props.searchItems.length <= 0) {
        setCurrentPage(1)
      }
    })
    onBeforeUnmount(() => {
      tableContentObserver && tableContentObserver.disconnect()
    })

    return {
      activeTab,
      tableContentHeight,
      currentSearchTags,
      totalInfoData,
      newCols,
      slotCols,
      filterSlots,
      tableStyle,

      searchItemsSlots,
      searchBarChanged,
      setContentHeight,

      setTagBoxHeight,
      clearTags,

      isSelectedAll,
      selectedRowKeys,
      selectAll,
      selectRow,
      isIndeterminate,

      pagination,
      pageSize,
      currentPage,
      total,
      setTotal,
      currentPageChange,
      pageSizeChange,

      refresh,
      reset,
      resetAll,
      clearAll,
      setSeletedRowKeys,
      simpleTableListRef,
      tableContentRef,
      handleRadioChange,
      selectedRadioKey,
    }
  },
})
</script>
