<template>
  <div :class="['transfer-panel', mark]">
    <div v-if="!showButtons" class="panel-header">
      <span>{{ title }}</span>
      <span class="count">{{ checkedSummary }}</span>
    </div>
    <div v-else class="panel-header">
      <hl-checkbox
        v-model="allChecked"
        :validate-event="false"
        :indeterminate="isIndeterminate"
        @change="handleAllCheckedChange"
      >
        {{ title }}
      </hl-checkbox>
      <span class="count">{{ checkedSummary }}</span>
    </div>

    <div
      :class="['panel-body', hasFooter ? 'is-with-footer' : '']"
    >
      <div
        v-if="filterable"
        class="panel-filter"
      >
        <hl-input
          v-model="query"
          class="no-verify"
          block
          clearable
          :placeholder="placeholder"
          :validate-event="false"
          v-bind="filterProps"
          @mouseenter="inputHover = true"
          @mouseleave="inputHover = false"
        >
          <template #prefix>
            <hl-icon><system-search /></hl-icon>
          </template>
        </hl-input>
      </div>
      <hl-checkbox-group
        v-show="!hasNoMatch && !isEmpty(data)"
        v-model="checked"
        dir="vertical"
        :validate-event="false"
        :class="{ 'panel-list': true, 'has-filterable': filterable }"
        :custom="!showButtons"
      >
        <hl-checkbox
          v-for="item in filteredData"
          :key="item[propsAlias.key]"
          class="item"
          :label="item[propsAlias.key]"
          :disabled="item[propsAlias.disabled]"
          :validate-event="false"
        >
          <option-content
            :option="optionRender?.(item)"
          />
          <!-- <i v-if="mark === 'right' && !item[disabledProp]" class="system-icon error-fill"></i> -->
        </hl-checkbox>
      </hl-checkbox-group>
      <p v-show="hasNoMatch || isEmpty(data)" class="panel-empty">
        {{ hasNoMatch ? t('hl.transfer.noMatch') : t('hl.transfer.noData') }}
      </p>
    </div>
    <p v-if="hasFooter" class="panel-footer">
      <slot></slot>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, toRefs, useSlots } from 'vue'
import { isEmpty } from '@hongluan-ui/utils'
import { useLocale } from '@hongluan-ui/hooks'
import HlCheckbox from '@hongluan-ui/components/checkbox'
import HlCheckboxGroup from '@hongluan-ui/components/checkbox-group'
import HlInput from '@hongluan-ui/components/input'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemClose, SystemSearch } from '@hongluan-ui/components/system-icon'
import { transferPanelEmits, transferPanelProps } from './transfer-panel'
import { useCheck, usePropsAlias } from './composables'

import type { VNode } from 'vue'
import type { TransferPanelState } from './transfer-panel'

defineOptions({
  name: 'TransferPanel',
})

const props = defineProps(transferPanelProps)
const emit = defineEmits(transferPanelEmits)
const slots = useSlots()

const OptionContent = ({ option }: { option: VNode | VNode[]; }) => option

const { t } = useLocale()

const panelState = reactive<TransferPanelState>({
  checked: [],
  allChecked: false,
  query: '',
  inputHover: false,
  checkChangeByUser: true,
})

const propsAlias = usePropsAlias(props)

const {
  filteredData,
  checkedSummary,
  isIndeterminate,
  handleAllCheckedChange,
} = useCheck(props, panelState, emit)

const hasNoMatch = computed(
  () => !isEmpty(panelState.query) && isEmpty(filteredData.value),
)

const hasFooter = computed(() => !isEmpty(slots.default!()[0].children))
const showClose = computed(() => {
  return panelState.query.length > 0 && panelState.inputHover ? 'show-close' : ''
})

const { checked, allChecked, query, inputHover } = toRefs(panelState)

defineExpose({
  /** @description filter keyword */
  query,
})
</script>

