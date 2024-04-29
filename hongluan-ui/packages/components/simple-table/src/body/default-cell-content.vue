<template>
  <div
    class="cell"
    :style="column.align ? `justify-content:${column.align}` : ''"
    @click="$emit('cell-click', $event)"
  >
    <slot name="expand-icon"></slot>
    <div
      v-if="column.expand?.slotName"
      class="expand-icon cursor-pointer"
      @click.stop="$emit('expand')"
    >
      <hl-icon>
        <system-arrow-right />
      </hl-icon>
    </div>
    <template v-if="!column.expand?.hideLabel">
      {{ column.formatter ? column.formatter(row, column, row?.[column.prop], rowIndex, columnIndex) : row?.[column.prop] }}
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemArrowRight } from '@hongluan-ui/components/system-icon'

import type { PropType } from 'vue'
import type { ColumnType } from '../simple-table'

export default defineComponent({
  components: { HlIcon, SystemArrowRight },
  props: {
    row: Object,
    column: Object as PropType<ColumnType>,
    rowIndex: Number,
    columnIndex: Number,
  },
  emits: ['cell-click', 'expand'],
})
</script>
