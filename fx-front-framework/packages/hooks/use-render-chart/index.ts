import { isReactive, nextTick, onBeforeUnmount, toRef, watch } from 'vue'

import type { Ref } from 'vue'
import type { Indexable } from 'fx-front-utils'

function useRenderChart(cb: () => void, data: Ref<unknown> | Indexable<any>, field = 'chartData') {
  const watcherData = isReactive(data) ? toRef(data, field as keyof typeof data) : data
  const unwatcher = watch(watcherData, () => {
    nextTick(() => {
      cb()
    })
  }, {
    immediate: true,
    deep: true,
  })

  onBeforeUnmount(() => {
    unwatcher && unwatcher()
  })
}

export { useRenderChart }
