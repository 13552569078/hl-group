<template>
  <hb-simple-table-list
    ref="simpleTableListRef"
    padding="var(--xl)"
    :class="['fx-page-table']"
    :cols="newCols"
    :table-data="tableData"
    :searchbar="searchbar"
    :toolbar="toolbar"
    :table-props="tableProps"
    :scrollbar-props="scrollbarProps"
    :pagination="pagination"
    @searchbar-change="searchBarChanged"
    @size-change="pageSizeChange"
    @current-change="currentPageChange"
    @sort-change="(...args) => $emit('sort-change', ...args)"
  >
    <!-- searchbar右边的高级搜索， 搜索条件超过4个会显示在右边 -->
    <template v-if="searchPlacement ? searchPlacement === 'right' : searchItems.length > 4" #searchbar-suffix>
      <hb-data-filter
        :items="searchItems"
        icon-position="left"
        gap="var(--xs)"
        max-height="500px"
        class="static"
        @search="searchChanged"
        @remove-selected-item="removeSelectedItem"
      >
        <template #icon>
          <hl-icon><two-filter /></hl-icon>
        </template>
        <template #default>
          高级搜索
        </template>
      </hb-data-filter>
    </template>

    <!-- 行多选 -->
    <template #selectionCol>
      <hl-checkbox
        v-model="isSelectedAll"
        :indeterminate="isIndeterminate"
        :show-label="false"
        @change="selectAll"
      />
    </template>
    <template #tableSelection="{ row }">
      <hl-checkbox
        v-model="selectedRowKeys"
        :label="row.id"
        :show-label="false"
        @change="selectRow"
        @click.stop
      />
    </template>
    <!-- 展开行插槽 -->
    <template #customExpand="{ row }">
      <slot name="customExpand" :row="row"></slot>
    </template>
    <!-- 序号插槽 -->
    <template #tableIndex="{ rowIndex }">
      <span>{{ rowIndex + 1 }}</span>
    </template>

    <!-- 行操作 -->
    <template #action="{ row }">
      <hl-group gap="var(--xxs)">
        <slot name="action" :row="row"></slot>
      </hl-group>
    </template>
    <!-- 无数据 -->
    <template #empty>
      <hb-empty description="暂无数据" image-size="10vw" :image="noDataImage" />
    </template>
    <!-- 搜索框前面 -->
    <template #searchbar-prefix>
      <slot name="searchbar-prefix"></slot>
    </template>
    <!-- 操作左 -->
    <template #toolbar-extra-before>
      <slot name="toolbar-extra-before"></slot>
    </template>
    <!-- 操作右  -->
    <template #toolbar-extra-after>
      <slot name="toolbar-extra-after"></slot>
    </template>

    <!-- 自定义搜索条件插槽 -->
    <template v-for="search in searchSlotList" #[search.slotName]="searchData" :key="search.slotName">
      <slot :name="search.slotName" v-bind="searchData"></slot>
    </template>

    <!-- 完全自定义插槽，需要把保留用的去掉 -->
    <template v-for="col in slotCols" #[col.slotName]="colData" :key="col.slotName">
      <slot :name="col.slotName" v-bind="colData"> </slot>
    </template>
  </hb-simple-table-list>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, onMounted, PropType, toRef, computed } from 'vue'
import { HlGroup, HlCheckbox, HlIcon } from 'hongluan-ui'
import { HbSimpleTableList, HbDataFilter, HbEmpty } from 'hongluan-business-ui'
import { useTableSelection, usePagination } from 'hongluan-hooks'
import { TwoFilter } from '@hongluan-ui/icons'

export default defineComponent({
  name: 'PageTable',
  components: { HlGroup, HlCheckbox, HlIcon, HbSimpleTableList, HbDataFilter, TwoFilter, HbEmpty },
  props: {
    // 自定义表格属性穿透给hl-simple-table
    tableProps: {
      type: Object,
      default: () => ({}),
    },
    scrollbarProps: {
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
    // 搜索条件
    searchItems: {
      type: Array,
      default: () => [],
    },
    //searchbar中的输入框属性
    searcher: {
      type: Object,
      default: () => {
        return {
          show: true,
          name: 'searchName',
          placeholder: '请输入搜索条件',
        }
      },
    },
    // 搜索条件位置， top/right, 不传的话根据搜索条件searchItems个数，不超过4个在顶部，超过4个在右侧。
    searchPlacement: {
      type: String,
      default: '',
    },

    // 多选操作
    selectionActions: {
      type: Array,
      default: () => [],
    },

    // 默认分页数据
    defaultPagination: {
      type: Object,
      default: () => {
        return { pageSize: 10, currentPage: 1, total: 0 }
      },
    },

    // 没有数据的默认图片
    noDataImage: {
      type: String,
      default: '',
    },

    // toolbar->showColConfig
    showColConfig: {
      type: Boolean,
      default: true,
    },

    // 配合searchPlacement: top 使用
    selectorColCount: {
      type: String,
      default: 'count-xl-2 count-lg-2 count-md-1',
    },

    // 是否显示搜索
    showSearchBar: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['selectedRowKeys', 'sort-change'],
  setup (props, { emit }) {
    const newCols = computed(() => {
      return props.cols.map((col: any) => {
        if (['tableIndex', 'tableSelection'].includes(col.slotName) && !col.width) {
          col.width = '6em'
        }
        return col
      })
    })
    const searchbar = reactive({
      show: props.showSearchBar,
      searcher: props.searcher,
      selector: {
        colCount: props.selectorColCount,
        items: props.searchPlacement ? (props.searchPlacement === 'top' ? [...props.searchItems] : [])
          : (props.searchItems.length > 4 ? [] : [...props.searchItems]),
      },
    })

    // SearchBar自定义插槽搜索条件
    const searchSlotList = ref([])
    // 额外加入条件时
    watch(() => props.searchItems.length, () => {
      searchbar.selector.items = []
      searchbar.selector.items.push(...props.searchItems)
    })

    // 处理搜索自定义插槽
    props.searchItems.forEach((item: { type: string; [key: string]: any; }) => {
      if(item.type === 'slot')searchSlotList.value.push(item)
    })

    const simpleTableListRef = ref()

    // 列表操作工具-多选操作
    const toolbar = reactive({
      showSelectionText: true,
      showColConfig: props.showColConfig,
      selectionCount: 0,
      action: {
        show: false,
        showCount: 2,
        actions: props.selectionActions,
      },
    })

    // 搜索总条件
    const params = ref({})
    // searchBar条件
    const searchParams = ref({})
    // 右侧高级搜索条件
    const searchAdvanceParams = ref({})
    // searchBar自定义插槽条件
    const searchSlotParams = ref({})

    const searchBarChanged = (urlParams: string, mapParams: any, originalParams: any) => {
      searchParams.value = mapParams
      params.value = { ...searchParams.value, ...searchAdvanceParams.value, ...searchSlotParams.value }
      setCurrentPage(1)
    }

    const searchChanged = (urlParams: string, mapParams: any, originalParams: any) => {
      searchAdvanceParams.value = mapParams
      params.value = { ...searchParams.value, ...searchAdvanceParams.value, ...searchSlotParams.value }
      setCurrentPage(1)
    }

    // 搜索条件自定义回调
    const searchSlotChanged = (mapParams: any) => {
      searchSlotParams.value = mapParams
      params.value = { ...searchParams.value, ...searchAdvanceParams.value, ...searchSlotParams.value }
      setCurrentPage(1)
    }

    // 清空条件
    const resetFields = () => {
      console.log('我要清空条件')
      searchParams.value = {}
      searchAdvanceParams.value = {}
      searchSlotParams.value = {}
      simpleTableListRef.value?.searchbarRef.resetFields()
    }

    // TODO
    const removeSelectedItem = (item: any) => { console.log(item) }

    const {
      isSelectedAll,
      isIndeterminate,
      selectedRowKeys,
      selectAll,
      selectRow,
    } = useTableSelection(toRef(props, 'tableData'))

    // 表格多选
    watch(() => selectedRowKeys.value.length, (len: number) => {
      toolbar.action.show = len > 0
      toolbar.selectionCount = len
      emit('selectedRowKeys', selectedRowKeys.value)
    })

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
        params: params.value,
        setTotal: setAllTotal,
      })
    }

    // 设置总数
    const setAllTotal = (newTotal: number) => {
      setTotal(newTotal)
      pagination.total = newTotal
    }

    // 初始化查询表格数据
    onMounted( () => {
      fetchData()
    })

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
    // 过滤几个已使用的保留插槽['sear,chbar-suffix', 'selectionCol', 'tableSelection', 'customExpand', 'tableIndex', 'action']
    const reservedSlotName = ['searchbar-suffix','searchbar-prefix', 'toolbar-extra-before','toolbar-extra-after','selectionCol', 'tableSelection', 'customExpand', 'tableIndex', 'action']
    const slotCols = computed(() => {
      const result: any[] = []
      getSlotNames(props.cols, result)
      return result
    })

    /**
     * 重新刷新接口数据,一般用于多选或其他操作
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

    // 重置当前数据
    const reset = () => {
      pagination.currentPage = 1
      fetchData()
    }

    return {
      newCols,
      slotCols,

      searchbar,
      searchBarChanged,
      searchSlotList,

      toolbar,
      searchChanged,
      removeSelectedItem,

      searchSlotChanged,

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
      resetFields,
      simpleTableListRef,
    }
  },
})
</script>
