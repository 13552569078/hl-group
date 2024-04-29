<template>
  <hl-tooltip
    ref="tooltip"
    :visible="tooltipVisible"
    :offset="0"
    :placement="placement"
    :show-arrow="false"
    :stop-popper-mouse-event="false"
    :popper-class="`popover popover-table-filter ${popperClass}`"
    :effect="effect"
    trigger="click"
    manual-mode
    append-to-body
  >
    <template #content>
      <slot :close="hidden"></slot>
    </template>
    <template #default>
      <span
        v-click-outside:[popperPaneRef]="hidden"
        class="table-filter-trigger"
        @click="showByClick"
        @mouseover="showByHover"
      >
        <hl-icon>
          <system-filter />
        </hl-icon>
      </span>
    </template>
  </hl-tooltip>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import HlTooltip from '@hongluan-ui/components/tooltip'
import { Effect } from '@hongluan-ui/components/popper'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemFilter } from '@hongluan-ui/components/system-icon'
import { ClickOutside } from '@hongluan-ui/directives'

import type { PropType } from 'vue'
import type { Placement, PopperEffect } from '@hongluan-ui/components/popper'

export default defineComponent({
  name: 'SimpleTableFilterIcon',
  components: {
    HlTooltip,
    HlIcon,
    SystemFilter,
  },
  directives: { ClickOutside },
  props: {
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom',
    },
    effect: {
      type: String as PropType<PopperEffect>,
      default: Effect.LIGHT,
    },
    popperClass: {
      type: String,
      default: '',
    },
    trigger: {
      type: String as PropType<'hover' | 'click' | 'all'>,
      default: 'click',
    },
  },
  setup(props) {
    const tooltipVisible = ref(false)
    const tooltip = ref(null)

    const hidden = () => {
      tooltipVisible.value = false
    }
    const show = () => {
      tooltipVisible.value = true
    }
    const showByClick = (e: MouseEvent) => {
      if (props.trigger === 'click' || props.trigger === 'all') {
        e.stopPropagation()
        tooltipVisible.value = !tooltipVisible.value
      }
    }
    const showByHover = (e: MouseEvent) => {
      if (props.trigger === 'hover' || props.trigger === 'all') {
        e.stopPropagation()
        show()
      }
    }
    const popperPaneRef = computed(() => {
      return tooltip.value?.popperRef?.contentRef
    })

    return {
      tooltipVisible,
      hidden,
      showByClick,
      showByHover,
      popperPaneRef,
      tooltip,
    }
  },
})
</script>
