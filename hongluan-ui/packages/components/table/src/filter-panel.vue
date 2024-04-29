<template>
  <hl-tooltip
    ref="tooltip"
    :visible="tooltipVisible"
    :offset="0"
    :placement="placement"
    :show-arrow="false"
    :stop-popper-mouse-event="false"
    popper-class="popover popover-table-filter"
    :effect="Effect.LIGHT"
    append-to-body
  >
    <template #content>
      <div v-if="multiple">
        <div class="table-filter-content">
          <hl-scrollbar wrap-class="table-filter-wrap">
            <hl-checkbox-group
              v-model="filteredValue"
              class="table-filter-checkbox-group"
            >
              <hl-checkbox
                v-for="filter in filters"
                :key="filter.value"
                :label="filter.value"
              >
                {{ filter.text }}
              </hl-checkbox>
            </hl-checkbox-group>
          </hl-scrollbar>
        </div>
        <div class="table-filter-bottom">
          <hl-button
            :class="{ 'is-disabled': filteredValue.length === 0 }"
            :disabled="filteredValue.length === 0"
            @click="handleConfirm"
          >
            {{ t('hl.table.confirmFilter') }}
          </hl-button>
          <hl-button
            @click="handleReset"
          >
            {{ t('hl.table.resetFilter') }}
          </hl-button>
        </div>
      </div>
      <ul v-else class="table-filter-list">
        <li
          :class="{
            'is-active': filterValue === undefined || filterValue === null,
          }"
          class="table-filter-list-item"
          @click="handleSelect(null)"
        >
          {{ t('hl.table.clearFilter') }}
        </li>
        <li
          v-for="filter in filters"
          :key="filter.value"
          :class="{ 'is-active': isActive(filter) }"
          :label="filter.value"
          class="table-filter-list-item"
          @click="handleSelect(filter.value)"
        >
          {{ filter.text }}
        </li>
      </ul>
    </template>
    <template #default>
      <span
        v-click-outside:[popperPaneRef]="hideFilterPanel"
        class="table-filter-trigger"
        :class="column.filterOpened ? 'opened' : ''"
        @click="showFilterPanel"
      >
        <hl-icon>
          <system-filter />
        </hl-icon>
      </span>
    </template>
  </hl-tooltip>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  getCurrentInstance,
  watch,
} from 'vue'
import HlPopper, { Effect } from '@hongluan-ui/components/popper'
import HlButton from '@hongluan-ui/components/button'
import { useLocale } from '@hongluan-ui/hooks'
import HlCheckbox from '@hongluan-ui/components/checkbox'
import HlCheckboxGroup from '@hongluan-ui/components/checkbox-group'
import HlScrollbar from '@hongluan-ui/components/scrollbar'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemFilter } from '@hongluan-ui/components/system-icon'
import { ClickOutside } from '@hongluan-ui/directives'
import type { WritableComputedRef, PropType } from 'vue'
import type { Placement } from '@hongluan-ui/components/popper'
import type { TableColumnCtx } from './table-column/defaults'
import type { TableHeader } from './table-header/index'
import type { Store } from './store/index'

export default defineComponent({
  name: 'TableFilterPanel',
  components: {
    HlButton,
    HlCheckbox,
    HlCheckboxGroup,
    HlScrollbar,
    HlPopper,
    HlIcon,
    SystemFilter,
  },
  directives: { ClickOutside },
  props: {
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom-start',
    },
    store: {
      type: Object as PropType<Store<unknown>>,
    },
    column: {
      type: Object as PropType<TableColumnCtx<unknown>>,
    },
    upDataColumn: {
      type: Function,
    },
  },
  setup(props) {
    const instance = getCurrentInstance()
    const { t } = useLocale()
    const parent = instance.parent as TableHeader
    if (!parent.filterPanels.value[props.column.id]) {
      parent.filterPanels.value[props.column.id] = instance
    }
    const tooltipVisible = ref(false)
    const tooltip = ref(null)
    const filters = computed(() => {
      return props.column && props.column.filters
    })
    const filterValue = computed({
      get: () => (props.column.filteredValue || [])[0],
      set: (value: string) => {
        if (filteredValue.value) {
          if (typeof value !== 'undefined' && value !== null) {
            filteredValue.value.splice(0, 1, value)
          } else {
            filteredValue.value.splice(0, 1)
          }
        }
      },
    })
    const filteredValue: WritableComputedRef<unknown[]> = computed({
      get() {
        if (props.column) {
          return props.column.filteredValue || []
        }
        return []
      },
      set(value: unknown[]) {
        if (props.column) {
          props.upDataColumn('filteredValue', value)
        }
      },
    })
    const multiple = computed(() => {
      if (props.column) {
        return props.column.filterMultiple
      }
      return true
    })
    const isActive = filter => {
      return filter.value === filterValue.value
    }
    const hidden = () => {
      tooltipVisible.value = false
    }
    const showFilterPanel = (e: MouseEvent) => {
      e.stopPropagation()
      tooltipVisible.value = !tooltipVisible.value
    }
    const hideFilterPanel = () => {
      tooltipVisible.value = false
    }
    const handleConfirm = () => {
      confirmFilter(filteredValue.value)
      hidden()
    }
    const handleReset = () => {
      filteredValue.value = []
      confirmFilter(filteredValue.value)
      hidden()
    }
    const handleSelect = (_filterValue?: string) => {
      filterValue.value = _filterValue
      if (typeof _filterValue !== 'undefined' && _filterValue !== null) {
        confirmFilter(filteredValue.value)
      } else {
        confirmFilter([])
      }
      hidden()
    }
    const confirmFilter = (filteredValue: unknown[]) => {
      props.store.commit('filterChange', {
        column: props.column,
        values: filteredValue,
      })
      props.store.updateAllSelected()
    }
    watch(
      tooltipVisible,
      value => {
        // todo
        if (props.column) {
          props.upDataColumn('filterOpened', value)
        }
      },
      {
        immediate: true,
      },
    )

    const popperPaneRef = computed(() => {
      return tooltip.value?.popperRef
    })

    return {
      Effect,
      tooltipVisible,
      multiple,
      filteredValue,
      filterValue,
      filters,
      handleConfirm,
      handleReset,
      handleSelect,
      isActive,
      t,
      showFilterPanel,
      hideFilterPanel,
      popperPaneRef,
      tooltip,
    }
  },
})
</script>
