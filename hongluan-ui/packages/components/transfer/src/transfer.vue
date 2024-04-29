<template>
  <div
    :class="[
      namespace,
      !showButtons ? 'no-buttons' : '',
      block ? 'block' : '',
    ]"
    :style="[
      gap ? `--transfer-gap: ${gap}` : '',
      listGap ? `--transfer-list-gap: ${listGap}` : '',
      itemGap ? `--transfer-item-gap: ${itemGap}` : '',
    ]"
  >
    <transfer-panel
      ref="leftPanel"
      mark="left"
      :data="sourceData"
      :option-render="optionRender"
      :placeholder="panelFilterPlaceholder"
      :title="leftPanelTitle"
      :filterable="filterable"
      :format="format"
      :filter-method="filterMethod"
      :filter-props="filterProps"
      :confirm-method="confirmMethod"
      :default-checked="leftDefaultChecked"
      :show-buttons="showButtons"
      :props="props.props"
      @checked-change="onSourceCheckedChange"
    >
      <slot name="left-footer"></slot>
    </transfer-panel>
    <slot name="buttons">
      <hl-group
        v-if="showButtons"
        align="items-center"
        dir="vertical"
        gap="var(--md)"
        class="transfer-buttons"
      >
        <hl-button
          :class="['transfer-button', hasButtonTexts ? 'is-with-texts' : '']"
          :disabled="isEmpty(checkedState.rightChecked)"
          :equal="!hasButtonTexts"
          icon-position="left"
          @click="addToLeft"
        >
          <hl-icon>
            <system-arrow-left />
          </hl-icon>
          <span v-if="!isUndefined(buttonTexts[0])">{{ buttonTexts[0] }}</span>
        </hl-button>
        <hl-button
          :class="['transfer-button', hasButtonTexts ? 'is-with-texts' : '']"
          :disabled="isEmpty(checkedState.leftChecked)"
          :equal="!hasButtonTexts"
          icon-position="right"
          @click="addToRight"
        >
          <span v-if="!isUndefined(buttonTexts[1])">{{ buttonTexts[1] }}</span>
          <hl-icon>
            <system-arrow-right />
          </hl-icon>
        </hl-button>
      </hl-group>
    </slot>
    <transfer-panel
      ref="rightPanel"
      mark="right"
      :data="targetData"
      :option-render="optionRender"
      :placeholder="panelFilterPlaceholder"
      :filterable="filterable"
      :format="format"
      :filter-method="filterMethod"
      :filter-props="filterProps"
      :confirm-method="confirmMethod"
      :title="rightPanelTitle"
      :default-checked="rightDefaultChecked"
      :show-buttons="showButtons"
      :props="props.props"
      @checked-change="onTargetCheckedChange"
    >
      <slot name="right-footer"></slot>
    </transfer-panel>
  </div>
</template>

<script lang="ts" setup>
import { computed, h, reactive, ref, useSlots, watch } from 'vue'
import { debugWarn, isEmpty, isUndefined } from '@hongluan-ui/utils'
import { useFormItem, useLocale, useNamespace } from '@hongluan-ui/hooks'
import { FormItemEvents } from '@hongluan-ui/tokens'
import HlGroup from '@hongluan-ui/components/group'
import HlButton from '@hongluan-ui/components/button'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemArrowLeft, SystemArrowRight } from '@hongluan-ui/components/system-icon'
import { transferEmits, transferProps } from './transfer'
import {
  useCheckedChange,
  useComputedData,
  useMove,
  usePropsAlias,
} from './composables'
import TransferPanel from './transfer-panel.vue'

import type {
  TransferCheckedState,
  TransferDataItem,
  TransferDirection,
} from './transfer'
import type { TransferPanelInstance } from './transfer-panel'


defineOptions({
  name: 'Transfer',
})

const props = defineProps(transferProps)
const emit = defineEmits(transferEmits)
const slots = useSlots()

const { t } = useLocale()
const { namespace } = useNamespace('transfer')
const { formItem } = useFormItem()

const checkedState = reactive<TransferCheckedState>({
  leftChecked: [],
  rightChecked: [],
})

const propsAlias = usePropsAlias(props)

const { sourceData, targetData } = useComputedData(props)

const { addToLeft, addToRight } = useMove(props, checkedState, emit)

const { onSourceCheckedChange, onTargetCheckedChange } = useCheckedChange(
  checkedState,
  emit,
  props,
  addToLeft,
  addToRight,
)

const leftPanel = ref<TransferPanelInstance>()
const rightPanel = ref<TransferPanelInstance>()

const clearQuery = (which: TransferDirection) => {
  switch (which) {
    case 'left':
      leftPanel.value!.query = ''
      break
    case 'right':
      rightPanel.value!.query = ''
      break
  }
}

const hasButtonTexts = computed(() => props.buttonTexts.length === 2)

const leftPanelTitle = computed(
  () => props.titles[0] || t('hl.transfer.titles.0'),
)

const rightPanelTitle = computed(
  () => props.titles[1] || t('hl.transfer.titles.1'),
)

const panelFilterPlaceholder = computed(
  () => props.filterPlaceholder || t('hl.transfer.filterPlaceholder'),
)

watch(
  () => props.modelValue,
  () => {
    if (props.validateEvent) {
      formItem?.validate?.(FormItemEvents.change).catch(err => debugWarn(err))
    }
  },
)

const optionRender = computed(() => (option: TransferDataItem) => {
  if (props.renderContent) return props.renderContent(h, option)

  if (slots.default) return slots.default({ option })

  return h(
    'span',
    option[propsAlias.value.label] || option[propsAlias.value.key],
  )
})

defineExpose({
  /** @description clear the filter keyword of a certain panel */
  clearQuery,
  /** @description left panel ref */
  leftPanel,
  /** @description left panel ref */
  rightPanel,
  /** @description add items to left */
  addToLeft,
  /** @description add items to right */
  addToRight,
})
</script>
