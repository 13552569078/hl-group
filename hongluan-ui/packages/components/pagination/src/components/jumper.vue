<template>
  <span class="pagination-goto" :disabled="disabled">
    {{ t('hl.pagination.goto') }}
    <hl-input
      :min="1"
      :max="pageCount"
      :disabled="disabled"
      :model-value="innerValue"
      :validate-event="false"
      :size="size"
      native-type="number"
      @update:model-value="handleInput"
      @change="handleChange"
    />
    {{ t('hl.pagination.pageClassifier') }}
  </span>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useLocale } from '@hongluan-ui/hooks'
import HlInput from '@hongluan-ui/components/input'
import { usePagination } from '../usePagination'

export default defineComponent({
  name: 'PaginationJumper',
  components: {
    HlInput,
  },
  setup() {
    const { t } = useLocale()
    const { pageCount, disabled, size, currentPage, changeEvent } = usePagination()
    const userInput = ref<number>()
    const innerValue = computed(() => userInput.value ?? currentPage?.value)

    function handleInput(val: number | string) {
      userInput.value = +val
    }

    function handleChange(val: number | string) {
      val = Math.trunc(+val)
      changeEvent?.(+val)
      userInput.value = undefined
    }

    return {
      pageCount,
      disabled,
      size,
      innerValue,
      t,
      handleInput,
      handleChange,
    }
  },
})
</script>
