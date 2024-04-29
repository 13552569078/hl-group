<template>
  <table-search
    v-if="reloaded"
    :show-search-bar="searchItems.length > 0"
    :show-adv-search="showAdvSearch"
    :hide-header-line="hideHeaderLine"
    @search="searchBarChanged"
    @change-height="setContentHeight"
  >
    <template #default="searchForm">
      <hl-form-item
        v-for="item in searchItems"
        :key="item.name"
        :label="item.label"
        :prop="item.name"
      >
        <hl-time-picker
          v-if="item.type === 'timepicker'"
          v-model="searchForm[item.name]"
          v-bind="getDateTimeProps(item)"
        />
        <hl-date-picker
          v-else-if="isDatePicker(item.type)"
          v-model="searchForm[item.name]"
          :type="item.type"
          v-bind="getDateTimeProps(item)"
        />
        <hl-input
          v-else-if="item.type === 'input'"
          v-model="searchForm[item.name]"
          v-bind="getInputProps(item)"
        />
        <template v-else-if="item.type === 'slot'">
          <slot
            :name="item.slotName"
            :value="searchForm[item.name]"
            :item="item"
            :search-form="searchForm"
          >
          </slot>
        </template>
        <hl-select
          v-else-if="item.type === 'select' || !item.type"
          v-model="searchForm[item.name]"
          v-bind="getSelectProps(item)"
        >
          <hl-option
            v-for="opt in item.options"
            :key="getKey(item, opt)"
            :label="getLabel(item, opt)"
            :value="getKey(item, opt)"
          />
        </hl-select>
      </hl-form-item>
    </template>
  </table-search>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, watch, ref, nextTick } from 'vue'
import { HlFormItem, HlDatePicker, HlTimePicker, HlInput, HlSelect, HlOption } from 'hongluan-ui'
import { SelectorItem } from 'hongluan-business-ui'
import TableSearch from './table-search'
import { Utils } from './utils'
import { TagItem } from './types'

export default defineComponent({
  components: { HlFormItem, HlDatePicker, HlTimePicker, HlInput, HlSelect, HlOption, TableSearch },
  props: {
    showAdvSearch: {
      type: Boolean,
      default: true,
    },
    // 搜索条件
    searchItems: {
      type: Array as PropType<SelectorItem[]>,
      default: () => [],
    },
    hideHeaderLine: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['search', 'change-height'],
  setup(props, { emit }) {
    const reloaded = ref(true)
    const { getKey, getLabel } = Utils

    const isDatePicker = (type: string) => {
      return 'year/month/date/dates/week/datetime/datetimerange/daterange/monthrange'.indexOf(type) !== -1
    }
    const getDateTimeProps = (item: SelectorItem) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { span: _, value: __, ...others } = item
      return others
    }
    const getInputProps = (item: SelectorItem) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { span: _, value: __, ...others } = item
      return others
    }
    const getSelectProps = (item: SelectorItem) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { options: _, value: __, prop: ___, ...others } = item
      return others
    }

    const searchBarChanged = (searchArr: TagItem[], searchType: number) => {
      const result = Utils.getSearchTags(searchArr, props.searchItems)
      emit('search', result, searchType)
    }
    const setContentHeight = (val: number) => {
      emit('change-height', val)
    }

    const initChange = () => {
      const searchArr = props.searchItems.filter(si => Array.isArray(si.value) ? si.value.length : (si.value || si.value === 0)).map(si => ({
        key: si.name,
        label: si.label,
        value: si.value,
        valueName: '',
      }))
      searchBarChanged(searchArr as TagItem[], 2)
    }

    watch(() => props.searchItems, async () => {
      reloaded.value = false
      await nextTick()
      reloaded.value = true
      initChange()
    }, {
      deep: true,
    })

    onMounted(() => {
      initChange()
    })

    return {
      reloaded,
      getKey,
      getLabel,
      isDatePicker,
      getDateTimeProps,
      getInputProps,
      getSelectProps,
      setContentHeight,
      searchBarChanged,
    }
  },
})
</script>
