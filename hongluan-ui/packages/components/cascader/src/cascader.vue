<template>
  <hl-selector
    ref="hlSelector"
    :size="cascaderSize"
    :fill="cascaderFill"
    :placeholder="placeholder"
    :disabled="isDisabled"
    :clearable="!filtering && clearable"
    :filterable="filterable"
    :collapse-tags="collapseTags"
    :collapse-tags-tooltip="collapseTagsTooltip"
    :tag-type="tagType"
    :popper-class="popperClass + ' ' + namespace + '-popper'"
    :block="block"
    :multiple="props.multiple"
    :fallback-placements="[
      'bottom-start',
      'bottom',
      'top-start',
      'top',
      'right',
      'left',
    ]"
    :popper-append-to-body="popperAppendToBody"
    :teleported="teleported"
    :popper-offset="popperOffset"
    @focus="e => $emit('focus', e)"
    @blur="e => $emit('blur', e)"
    @resize="resizePanel"
    @keyboard-down="focusFirstNode"
    @input="handleInput"
    @clear="handleClear"
    @remove-tag="deleteTag"
    @visible-change="e => $emit('visible-change', e)"
    @after-leave="hideSuggestionPanel"
  >
    <template #default>
      <hl-cascader-panel
        v-show="!filtering"
        ref="panel"
        v-model="checkedValue"
        :options="options"
        :props="props"
        :border="false"
        :render-label="$slots.default"
        @expand-change="handleExpandChange"
        @close="togglePopperVisible(false)"
      />
      <hl-scrollbar
        v-if="filterable"
        v-show="filtering"
        ref="suggestionPanel"
        tag="ul"
        :class="[namespace + '-suggestion-panel']"
        view-class="cascader-suggestion-list"
        @keydown="handleSuggestionKeyDown"
      >
        <template v-if="suggestions.length">
          <li
            v-for="item in suggestions"
            :key="item.uid"
            :class="[
              'cascader-suggestion-item',
              item.checked && 'is-active'
            ]"
            :tabindex="-1"
            @click="handleSuggestionClick(item)"
          >
            <span>{{ item.text }}</span>
            <i v-if="item.checked" :class="['system-icon checked cascader-item-prefix']"></i>
          </li>
        </template>
        <slot v-else name="empty">
          <li class="cascader-empty-text">{{ t('hl.cascader.noMatch') }}</li>
        </slot>
      </hl-scrollbar>
    </template>
    <template #tag="{ tag }">
      <template v-if="tag.key==='-1'">{{ tag.text }}</template>
      <template v-else>{{ tag.text.calcText(showAllLevels, separator) }}</template>
    </template>
    <template #collapse-tag="{ tag }">
      {{ tag.text.calcText(showAllLevels, separator) }}
    </template>
  </hl-selector>
</template>

<script lang='ts'>
import { computed, defineComponent, ref, watch } from 'vue'
import { cloneDeep, debounce } from 'lodash-unified'
import { isPromise } from '@vue/shared'
import HlCascaderPanel from '@hongluan-ui/components/cascader-panel'
import HlScrollbar from '@hongluan-ui/components/scrollbar'
import HlSelector from '@hongluan-ui/components/selector'
import { debugWarn, focusNode, getSibling } from '@hongluan-ui/utils'
import { EVENT_CODE, UPDATE_MODEL_EVENT, CHANGE_EVENT } from '@hongluan-ui/constants'
import { useLocale, useConsistentProp, useNamespace, useFormItem } from '@hongluan-ui/hooks'
import { FormItemEvents } from '@hongluan-ui/tokens'
import { cascaderProps } from './cascader'

import type { ComputedRef, Ref } from 'vue'
import type { CascaderValue, CascaderNode, Tag } from '@hongluan-ui/components/cascader-panel'

export default defineComponent({
  name: 'Cascader',
  components: {
    HlCascaderPanel,
    HlScrollbar,
    HlSelector,
  },
  props: cascaderProps,
  emits: [
    UPDATE_MODEL_EVENT,
    CHANGE_EVENT,
    'focus',
    'blur',
    'visible-change',
    'expand-change',
    'remove-tag',
  ],
  setup(props, { emit }) {
    const { namespace } = useNamespace('cascader')
    const { t } = useLocale()

    const { formItem } = useFormItem()

    const hlSelector = ref(null)
    const panel = ref(null)
    const suggestionPanel = ref(null)
    const filtering = ref(false)
    const searchKeyword = ref('')
    const suggestions: Ref<CascaderNode[]> = ref([])

    const multiple = computed(() => !!props.props.multiple)
    const checkedNodes: ComputedRef<CascaderNode[]> = computed(() => panel.value?.checkedNodes || [])
    const { size: cascaderSize, disabled: isDisabled, fill: cascaderFill } = useConsistentProp()

    const checkedValue = computed<CascaderValue>({
      get () {
        return cloneDeep(props.modelValue) as CascaderValue
      },
      set (val) {
        emit(UPDATE_MODEL_EVENT, val)
        emit(CHANGE_EVENT, val)
        if (props.validateEvent) {
          formItem?.validate?.(FormItemEvents.change).catch(err => debugWarn(err))
        }
      },
    })
    const popperPaneRef = computed(() => {
      return hlSelector.value?.popperPaneRef
    })

    const togglePopperVisible = (visible?: boolean) => {
      hlSelector.value.togglePopperVisible(visible)
    }

    const updatePopperPosition = () => {
      hlSelector.value.updatePopperPosition()
    }

    const hideSuggestionPanel = () => {
      filtering.value = false
    }

    const deleteTag = (tag: { text: CascaderNode; }) => {
      const node = tag.text
      node.doCheck(false)
      panel.value?.calculateCheckedValue()
      emit('remove-tag', node.valueByOption)
    }

    const calculateSuggestions = () => {
      const { filterMethod, showAllLevels, separator } = props
      const res = panel.value.getFlattedNodes(!props.props.checkStrictly)
        .filter(node => {
          if (node.isDisabled) return false
          node.calcText(showAllLevels, separator)
          return filterMethod(node, searchKeyword.value)
        })

      if (multiple.value) {
        hlSelector.value.updateTags((tag: Tag) => {
          tag.hitState = false
        })
      }

      filtering.value = true
      suggestions.value = res
      updatePopperPosition()
    }

    const handleSuggestionKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const { code } = e

      switch (code) {
        case EVENT_CODE.up:
        case EVENT_CODE.down: {
          const distance = code === EVENT_CODE.up ? -1 : 1
          focusNode(
            getSibling(
              target,
              distance,
              '.cascader-suggestion-item[tabindex="-1"]',
            ) as HTMLElement,
          )
          break
        }
        case EVENT_CODE.enter:
          target.click()
          break
      }
    }

    const focusFirstNode = () => {
      let firstNode = null

      if (filtering.value && suggestionPanel.value) {
        firstNode = suggestionPanel.value.$el.querySelector('.cascader-suggestion-item')
      } else {
        firstNode = panel.value?.$el.querySelector('.cascader-node[tabindex="-1"]')
      }

      if (firstNode) {
        firstNode.focus()
        !filtering.value && firstNode.click()
      }
    }

    const resizePanel = (inputInner: HTMLElement) => {
      const suggestionPanelEl = suggestionPanel.value?.$el

      if (suggestionPanelEl) {
        const suggestionList = suggestionPanelEl.querySelector('.cascader-suggestion-list')
        suggestionList.style.minWidth = inputInner.offsetWidth + 'px'
      }
    }

    const getCheckedNodes = (leafOnly: boolean) => {
      return panel.value?.getCheckedNodes(leafOnly)
    }

    const handleExpandChange = (value: CascaderValue) => {
      updatePopperPosition()
      emit('expand-change', value)
    }

    const handleClear = () => {
      panel.value?.clearCheckedNodes()
    }

    const handleSuggestionClick = (node: CascaderNode) => {
      const { checked } = node

      if (multiple.value) {
        panel.value?.handleCheckChange(node, !checked, false)
      } else {
        !checked && panel.value?.handleCheckChange(node, true, false)
        togglePopperVisible(false)
      }
    }

    const handleFilter = debounce(() => {
      const { value } = searchKeyword
      if (!value) return

      const passed = props.beforeFilter(value)

      if (isPromise(passed)) {
        passed.then(calculateSuggestions).catch(() => { /* prevent log error */ })
      } else if (passed !== false) {
        calculateSuggestions()
      } else {
        hideSuggestionPanel()
      }
    }, props.debounce)

    const handleInput = (val: string) => {
      searchKeyword.value = val
      val ? handleFilter() : hideSuggestionPanel()
    }

    watch(filtering, updatePopperPosition)
    watch(checkedNodes, nodes => {
      if (multiple.value) {
        hlSelector.value.setValue(nodes || [])
      } else {
        const { showAllLevels, separator } = props
        hlSelector.value.setValue(nodes.length ? nodes[0].calcText(showAllLevels, separator) : '')
      }
    })

    return {
      namespace,
      hlSelector,
      popperPaneRef,
      panel,
      suggestionPanel,
      filtering,
      checkedValue,
      suggestions,
      isDisabled,
      cascaderSize,
      cascaderFill,
      multiple,
      t,
      togglePopperVisible,
      hideSuggestionPanel,
      resizePanel,
      deleteTag,
      focusFirstNode,
      getCheckedNodes,
      handleExpandChange,
      handleClear,
      handleSuggestionClick,
      handleSuggestionKeyDown,
      handleInput,
    }
  },
})
</script>
