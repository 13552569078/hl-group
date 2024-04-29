<template>
  <span class="pagination-total" :disabled="disabled">
    {{
      t('hl.pagination.total', {
        total,
      })
    }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useLocale } from '@hongluan-ui/hooks'
import { usePagination } from '../usePagination'
import { paginationTotalProps } from './total'

export default defineComponent({
  name: 'PaginationTotal',

  props: paginationTotalProps,

  setup() {
    const { t } = useLocale()
    const { disabled } = usePagination()

    return {
      t,
      disabled,
    }
  },
})
</script>
