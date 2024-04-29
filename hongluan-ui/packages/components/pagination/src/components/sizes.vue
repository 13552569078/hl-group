<template>
  <span class="pagination-control">
    <hl-select
      :model-value="innerPageSize"
      :disabled="disabled"
      :popper-class="popperClass"
      :size="size"
      :validate-event="false"
      @change="handleChange"
    >
      <hl-option
        v-for="item in innerPageSizes"
        :key="item"
        :value="item"
        :label="item + t('hl.pagination.pagesize')"
      />
    </hl-select>
  </span>
</template>

<script lang="ts">
import { defineComponent, watch, computed, ref } from 'vue'
import { isEqual } from 'lodash-unified'
import HlSelect from '@hongluan-ui/components/select'
import HlOption from '@hongluan-ui/components/option'
import { useLocale } from '@hongluan-ui/hooks'
import { usePagination } from '../usePagination'
import { paginationSizesProps } from './sizes'

export default defineComponent({
  name: 'PaginationSizes',

  components: {
    HlSelect,
    HlOption,
  },

  props: paginationSizesProps,
  emits: ['page-size-change'],

  setup(props, { emit }) {
    const { t } = useLocale()
    const pagination = usePagination()
    const innerPageSize = ref<number>(props.pageSize)

    watch(
      () => props.pageSizes,
      (newVal, oldVal) => {
        if (isEqual(newVal, oldVal)) return
        if (Array.isArray(newVal)) {
          const pageSize =
            newVal.indexOf(props.pageSize) > -1
              ? props.pageSize
              : props.pageSizes[0]
          emit('page-size-change', pageSize)
        }
      },
    )

    watch(
      () => props.pageSize,
      newVal => {
        innerPageSize.value = newVal
      },
    )

    const innerPageSizes = computed(() => props.pageSizes)

    function handleChange(val: number) {
      if (val !== innerPageSize.value) {
        innerPageSize.value = val
        pagination.handleSizeChange?.(Number(val))
      }
    }

    return {
      innerPageSizes,
      innerPageSize,

      t,
      handleChange,
    }
  },
})
</script>
