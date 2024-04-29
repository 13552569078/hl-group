<template>
  <div
    ref="selectWrapper"
    v-click-outside:[popperPaneRef]="handleClose"
    :class="[
      namespace + '-input-select',
      selectSize,
      block ? 'block' : ''
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click.stop="toggleMenu"
  >
    <hl-tooltip
      ref="tooltipRef"
      :visible="dropMenuVisible"
      :placement="placement"
      :teleported="compatTeleported"
      :offset="popperOffset"
      :popper-class="`${namespace}-select-popper ${popperClass}`"
      :fallback-placements="['bottom-start', 'top-start', 'right', 'left']"
      :effect="effect"
      trigger="click"
      transition="dropdown"
      :persistent="persistent"
      :show-arrow="false"
      :stop-popper-mouse-event="false"
      :gpu-acceleration="false"
      @show="handleMenuEnter"
    >
      <template #default>
        <div
          class="select-trigger"
          @mouseenter="inputHovering = true"
          @mouseleave="inputHovering = false"
        >
          <hl-input
            :id="id"
            ref="reference"
            v-model="selectedLabel"
            native-type="text"
            :placeholder="currentPlaceholder"
            :name="name"
            :autocomplete="autocomplete"
            :size="selectSize"
            :fill="selectFill"
            :thin="thin"
            :round="round"
            :disabled="selectDisabled"
            :readonly="readonly"
            :validate-event="false"
            :class="{
              'is-focus': visible,
              'is-tags': selected.length,
              'is-remote': !showIcon,
            }"
            :tabindex="(multiple && filterable) ? '-1' : null"
            @focus="handleFocus"
            @blur="handleBlur"
            @input="debouncedOnInputChange"
            @paste="debouncedOnInputChange"
            @compositionstart="handleComposition"
            @compositionupdate="handleComposition"
            @compositionend="handleComposition"
            @keydown.down.stop.prevent="navigateOptions('next')"
            @keydown.up.stop.prevent="navigateOptions('prev')"
            @keydown.enter.stop.prevent="selectOption"
            @keydown.esc="handleKeydownEscape"
            @keydown.tab="visible = false"
          >
            <template v-if="multiple" #tags>
              <div
                v-show="selected.length"
                ref="tags"
                class="input-tags"
              >
                <template v-if="collapseTags && selected.length">
                  <hl-tag
                    :closable="!selectDisabled && !selected[0].isDisabled"
                    :active="selected[0].hitState"
                    disable-transitions
                    :size="selectSize"
                    :type="tagType"
                    @close="deleteTag($event, selected[0])"
                  >
                    {{ selected[0].currentLabel }}
                  </hl-tag>
                  <hl-tag
                    v-if="selected.length > 1"
                    :closable="false"
                    disable-transitions
                    :size="selectSize"
                    :type="tagType"
                  >
                    <hl-tooltip
                      v-if="collapseTagsTooltip"
                      :disabled="dropMenuVisible"
                      :fallback-placements="['bottom', 'top', 'right', 'left']"
                      :effect="effect"
                      placement="bottom"
                      :teleported="false"
                      :popper-class="`collapse-tags-popper`"
                    >
                      <template #default>
                        + {{ selected.length - 1 }}
                      </template>
                      <template #content>
                        <div class="collapse-tags">
                          <div
                            v-for="(item, idx) in selected.slice(1)"
                            :key="idx"
                            class="collapse-tag"
                          >
                            <hl-tag
                              :key="getValueKey(item)"
                              class="in-tooltip"
                              :closable="!selectDisabled && !item.isDisabled"
                              :size="selectSize"
                              :hit="item.hitState"
                              :type="tagType"
                              disable-transitions
                              @close="deleteTag($event, item)"
                            >
                              {{ item.currentLabel }}
                            </hl-tag>
                          </div>
                        </div>
                      </template>
                    </hl-tooltip>
                    <template v-else>
                      + {{ selected.length - 1 }}
                    </template>
                  </hl-tag>
                </template>

                <template v-if="!collapseTags">
                  <hl-tag
                    v-for="item in selected"
                    :key="getValueKey(item)"
                    :closable="!selectDisabled"
                    :active="item.hitState"
                    disable-transitions
                    :size="selectSize"
                    :type="tagType"
                    @close="deleteTag($event, item)"
                  >
                    {{ item.currentLabel }}
                  </hl-tag>
                </template>

                <input
                  v-if="filterable"
                  ref="input"
                  v-model="query"
                  type="text"
                  :class="['select-input', selectSize ? `is-${ selectSize }` : '']"
                  :disabled="selectDisabled"
                  :autocomplete="autocomplete"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @keyup="managePlaceholder"
                  @keydown="resetInputState"
                  @keydown.down.prevent="navigateOptions('next')"
                  @keydown.up.prevent="navigateOptions('prev')"
                  @keydown.esc="handleKeydownEscape"
                  @keydown.enter.stop.prevent="selectOption"
                  @keydown.delete="deletePrevTag"
                  @keydown.tab="visible = false"
                  @compositionstart="handleComposition"
                  @compositionupdate="handleComposition"
                  @compositionend="handleComposition"
                  @input="debouncedQueryChange"
                >
              </div>
            </template>
            <template v-if="$slots.prefix" #prefix>
              <div>
                <slot name="prefix"></slot>
              </div>
            </template>
            <template #suffix>
              <slot name="suffix" :className="`${iconClass} ${!showClose && showIcon ? 'visible' : ''}`">
                <hl-icon :class="[iconClass, !showClose && showIcon ? 'visible' : '']">
                  <system-select-arrow />
                </hl-icon>
              </slot>
              <slot name="clear">
                <hl-icon :class="['select-close', showClose && 'visible']" @click="handleClearClick">
                  <system-close />
                </hl-icon>
              </slot>
            </template>
          </hl-input>
        </div>
      </template>
      <template #content>
        <hl-select-menu>
          <hl-scrollbar
            v-show="options.size > 0 && !loading"
            ref="scrollbar"
            tag="ul"
            wrap-class="select-dropdown-wrap"
            view-class="select-dropdown-list"
            :class="{ 'is-empty': !allowCreate && Boolean(query) && filteredOptionsCount === 0 }"
          >
            <hl-option
              v-if="showNewOption"
              :value="query"
              :created="true"
            />
            <slot></slot>
          </hl-scrollbar>
          <template v-if="emptyText && (!allowCreate || loading || (allowCreate && options.size === 0 ))">
            <slot v-if="$slots.empty" name="empty"></slot>
            <p v-else class="select-dropdown-empty">
              {{ emptyText }}
            </p>
          </template>
        </hl-select-menu>
      </template>
    </hl-tooltip>
  </div>
</template>

<script lang="ts">
import {
  toRefs,
  defineComponent,
  onMounted,
  nextTick,
  reactive,
  provide,
  computed,
} from 'vue'
import HlInput from '@hongluan-ui/components/input'
import { placements } from '@popperjs/core'
import HlTag from '@hongluan-ui/components/tag'
import HlTooltip, { useTooltipContentProps } from '@hongluan-ui/components/tooltip'
import HlScrollbar from '@hongluan-ui/components/scrollbar'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemSelectArrow, SystemClose } from '@hongluan-ui/components/system-icon'
import { useDeprecateAppendToBody } from '@hongluan-ui/components/popper'
import { ClickOutside } from '@hongluan-ui/directives'
import { isValidComponentSize } from '@hongluan-ui/utils'
import { useLocale, useNamespace, useFocus } from '@hongluan-ui/hooks'
import { UPDATE_MODEL_EVENT, CHANGE_EVENT } from '@hongluan-ui/constants'
import { useSelect, useSelectStates } from './useSelect'
import { selectKey } from './token'
import HlOption from './option.vue'
import HlSelectMenu from './select-dropdown.vue'

import type { PropType } from 'vue'
import type { ComponentSize } from '@hongluan-ui/constants'
import type { SelectContext } from './token'
import { useResizeObserver } from '@vueuse/core'

export default defineComponent({
  name: 'Select',
  componentName: 'Select',
  components: {
    HlInput,
    HlSelectMenu,
    HlOption,
    HlTag,
    HlScrollbar,
    HlTooltip,
    HlIcon,
    SystemSelectArrow,
    SystemClose,
  },
  directives: { ClickOutside },
  props: {
    name: String,
    id: String,
    modelValue: {
      type: [Array, String, Number, Boolean, Object],
      default: undefined,
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
    automaticDropdown: Boolean,
    size: {
      type: String as PropType<ComponentSize>,
      validator: isValidComponentSize,
    },
    effect: {
      type: String as PropType<'light' | 'dark' | string>,
      default: '',
    },
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    allowCreate: Boolean,
    block: Boolean,
    loading: Boolean,
    popperClass: {
      type: String,
      default: '',
    },
    remote: Boolean,
    loadingText: String,
    noMatchText: String,
    noDataText: String,
    remoteMethod: Function,
    filterMethod: Function,
    multiple: Boolean,
    multipleLimit: {
      type: Number,
      default: 0,
    },
    placeholder: {
      type: String,
    },
    defaultFirstOption: Boolean,
    reserveKeyword: {
      type: Boolean,
      default: true,
    },
    valueKey: {
      type: String,
      default: 'value',
    },
    collapseTags: Boolean,
    collapseTagsTooltip: {
      type: Boolean,
      default: false,
    },
    popperAppendToBody: {
      type: Boolean,
      default: undefined,
    },
    teleported: useTooltipContentProps.teleported,
    persistent: {
      type: Boolean,
      default: true,
    },
    fill: Boolean,
    thin: Boolean,
    round: Boolean,
    tagType: {
      type: String,
      default: '',
    },
    popperOffset: {
      type: Number,
      default: 4,
    },
    validateEvent: {
      type: Boolean,
      default: true,
    },
    remoteShowSuffix: {
      type: Boolean,
      default: false,
    },
    suffixTransition: {
      type: Boolean,
      default: true,
    },

    placement: {
      type: String,
      values: placements,
      default: 'bottom-start',
    },
  },
  emits: [UPDATE_MODEL_EVENT, CHANGE_EVENT, 'remove-tag', 'clear', 'visible-change', 'focus', 'blur'],

  setup(props, ctx) {
    const { t } = useLocale()
    const { namespace } = useNamespace()
    const states = useSelectStates(props)
    const {
      optionsArray,
      selectSize,
      readonly,
      handleResize,
      debouncedOnInputChange,
      debouncedQueryChange,
      deletePrevTag,
      deleteTag,
      deleteSelected,
      handleOptionSelect,
      scrollToOption,
      setSelected,
      // resetInputHeight,
      managePlaceholder,
      showClose,
      selectDisabled,
      selectFill,
      iconClass,
      showIcon,
      showNewOption,
      emptyText,
      toggleLastOptionHitState,
      resetInputState,
      handleComposition,
      onOptionCreate,
      onOptionDestroy,
      handleMenuEnter,
      handleFocus,
      blur,
      handleBlur,
      handleClearClick,
      handleClose,
      handleKeydownEscape,
      toggleMenu,
      selectOption,
      getValueKey,
      navigateOptions,
      dropMenuVisible,
      queryChange,
      groupQueryChange,
      reference,
      input,
      tooltipRef,
      tags,
      selectWrapper,
      scrollbar,
      handleMouseEnter,
      handleMouseLeave,
    } = useSelect(props, states, ctx)

    const { focus } = useFocus(reference)

    const {
      // inputWidth,
      selected,
      // inputLength,
      filteredOptionsCount,
      visible,
      softFocus,
      selectedLabel,
      hoverIndex,
      query,
      inputHovering,
      currentPlaceholder,
      menuVisibleOnFocus,
      isOnComposition,
      isSilentBlur,
      options,
      cachedOptions,
      optionsCount,
      // prefixWidth,
      // tagInMultiLine,
    } = toRefs(states)

    provide(selectKey, reactive({
      props,
      options,
      optionsArray,
      cachedOptions,
      optionsCount,
      filteredOptionsCount,
      hoverIndex,
      handleOptionSelect,
      onOptionCreate,
      onOptionDestroy,
      selectWrapper,
      selected,
      setSelected,
      queryChange,
      groupQueryChange,
    }) as unknown as SelectContext)

    onMounted(() => {
      states.cachedPlaceHolder = currentPlaceholder.value = (props.placeholder || t('hl.select.placeholder'))
      if (props.multiple && Array.isArray(props.modelValue) && props.modelValue.length > 0) {
        currentPlaceholder.value = ''
      }
      useResizeObserver(selectWrapper, handleResize)

      if (reference.value && reference.value.$el) {
        // const sizeMap = {
        //   md: 36,
        //   sm: 32,
        //   xs: 28,
        // }
        // const input = reference.value.input
        // states.initialInputHeight = input.getBoundingClientRect().height || sizeMap[selectSize.value]
      }
      if (props.remote && props.multiple) {
        // resetInputHeight()
      }
      nextTick(() => {
        if (reference.value.$el) {
          // inputWidth.value = reference.value.$el.getBoundingClientRect().width
        }
        if (ctx.slots.prefix) {
          // const inputChildNodes = reference.value.$el.childNodes
          // const input = [].filter.call(inputChildNodes, item => item.tagName === 'INPUT')[0]
          // const prefix = reference.value.$el.querySelector('.input-affixe.prefix div')
          // const maxWidth = props.size === 'lg' ? 40 : 35
          // prefixWidth.value = Math.max(prefix.getBoundingClientRect().width + 5, maxWidth)
          // if (states.prefixWidth) {
          //   input.style.paddingLeft = `${Math.max(states.prefixWidth, maxWidth)}px`
          // }
        }
      })
      setSelected()
    })

    if (props.multiple && !Array.isArray(props.modelValue)) {
      ctx.emit(UPDATE_MODEL_EVENT, [])
    }
    if (!props.multiple && Array.isArray(props.modelValue)) {
      ctx.emit(UPDATE_MODEL_EVENT, '')
    }

    const popperPaneRef = computed(() => {
      return tooltipRef.value?.popperRef?.contentRef
    })

    const { compatTeleported } = useDeprecateAppendToBody(
      'Select',
      'popperAppendToBody',
    )

    return {
      namespace,
      // tagInMultiLine,
      // prefixWidth,
      compatTeleported,
      selectSize,
      readonly,
      handleResize,
      debouncedOnInputChange,
      debouncedQueryChange,
      deletePrevTag,
      deleteTag,
      deleteSelected,
      handleOptionSelect,
      scrollToOption,
      // inputWidth,
      selected,
      // inputLength,
      filteredOptionsCount,
      visible,
      softFocus,
      selectedLabel,
      hoverIndex,
      query,
      inputHovering,
      currentPlaceholder,
      menuVisibleOnFocus,
      isOnComposition,
      isSilentBlur,
      options,
      // resetInputHeight,
      managePlaceholder,
      showClose,
      selectDisabled,
      selectFill,
      iconClass,
      showIcon,
      showNewOption,
      emptyText,
      toggleLastOptionHitState,
      resetInputState,
      handleComposition,
      handleMenuEnter,
      handleFocus,
      handleKeydownEscape,
      blur,
      handleBlur,
      handleClearClick,
      handleClose,
      toggleMenu,
      selectOption,
      getValueKey,
      navigateOptions,
      dropMenuVisible,
      focus,
      reference,
      input,
      tooltipRef,
      popperPaneRef,
      tags,
      selectWrapper,
      scrollbar,
      handleMouseEnter,
      handleMouseLeave,
    }
  },
})
</script>
